import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Mortgage } from '../model/mortgage.model'
import { MortgageApiService } from '../services/mortgage-api.service'
import { animate, state, style, transition, trigger } from '@angular/animations';

import { UnderwriterNotificationsService } from "../underwriter-notifications.service";
import { AlertService } from '../_alert';
import { Subscription } from 'rxjs'

import { NewWebsocketService, Message } from "../newwebsocket.service"

@Component({
  selector: 'app-broker-component',
  templateUrl: './broker-component.component.html',
  styleUrls: ['./broker-component.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BrokerComponentComponent implements OnInit, OnDestroy {

  title = 'Tallaght Mortgages Brokers Page';

  private subscription: Subscription;

  columnsToDisplay: string[] = ['mortgageId', 'customerId', 'employerName', 'loanAmount', 'mortgageStatus', 'salary', 'term', 'yearsInEmployment'];
  mortgageList: Mortgage[];// = ELEMENT_DATA;
  expandedElement: Mortgage | null;

  constructor(private router: Router, 
              private mortgageApi: MortgageApiService,
              //private messagesService: UnderwriterNotificationsService, 
              private messagesService: NewWebsocketService,
              private alertService: AlertService) { 
                console.log("construct Broker Component");
  }

  ngOnInit() {


    this.subscription = this.messagesService.subscribe(
      (msg: Message) => {
        if (msg.audience == 'Broker') {
          if (msg.AlertType == "Success")
            this.alertService.success(msg.message);
          else if (msg.AlertType == "Error")
            this.alertService.error(msg.message);
          else 
            this.alertService.warn(msg.message);
        }
        this.loadMortgages();
      },
      err => {
        console.log(err) // Called if at any point WebSocket API signals some kind of error.
      },
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
    console.log("after");
    this.loadMortgages();
  }

  refreshTable(event) {
    event.preventDefault();
    this.loadMortgages();
  }

  loadMortgages() {
    this.mortgageApi.getMortgages().subscribe((data: Mortgage[]) => {
      this.mortgageList = data;
    });
  }

  submitForApproval(event, mortgage) {
    event.preventDefault();
    this.mortgageApi.submitMortgage(mortgage.mortgageId).subscribe((data) => {
      console.log(JSON.stringify(data));
      console.log(data);
      alert(`Mortgage ${mortgage.mortgageId} successfully submitted.\n` + JSON.stringify(data));
      this.loadMortgages();
    });
  }

  goToHomePage(event) {
    this.router.navigate(['/home']);
  }
  
  goToNewMortgage(event) {
    this.router.navigate(['/brokers/newmortgage']);
  }

  updateMortgage(event, mortgage) {
    event.preventDefault();
    console.log(mortgage);
    console.log(mortgage.mortgageId);
    this.mortgageApi.updateMortgage(mortgage.mortgageId, mortgage).subscribe(data => {
      console.log(data);
      window.alert("Update Completed");
    });
  }

  goToClarification(event, mortgage) {
    console.log("brokers/clarification/"+mortgage.mortgageId);
    this.router.navigate(['/brokers/clarification/'+mortgage.mortgageId]);
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    //this.subscription.unsubscribe();
    this.messagesService.unsubscribe(this.subscription);
  }
}
