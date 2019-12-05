import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from "../websocket.service";
//import { UnderwriterNotificationsService } from "../underwriter-notifications.service";
import { AlertService } from '../_alert';
import { Subscription } from 'rxjs'

import { Mortgage } from '../model/mortgage.model'
import { MortgageApiService } from '../services/mortgage-api.service'
import { animate, state, style, transition, trigger } from '@angular/animations';

import { NewWebsocketService, Message } from '../newwebsocket.service'

@Component({
  selector: 'app-underwriter-component',
  templateUrl: './underwriter-component.component.html',
  styleUrls: ['./underwriter-component.component.css'],
 // providers: [WebsocketService, UnderwriterNotificationsService],
 //providers: [ NewWebsocketService ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ] 
})
export class UnderwriterComponentComponent implements OnInit, OnDestroy {

  title = 'Tallaght Mortgages Underwriters Page';
  private subscription: Subscription;

  columnsToDisplay: string[] = ['mortgageId', 'customerId', 'employerName', 'loanAmount', 'mortgageStatus', 'salary', 'term', 'yearsInEmployment'];
  mortgageList: Mortgage[];// = ELEMENT_DATA;
  expandedElement: Mortgage | null;

  constructor(private router: Router, 
   //private messagesService: UnderwriterNotificationsService, 
              private messagesService: NewWebsocketService,
              private alertService: AlertService,
              private mortgageApi: MortgageApiService) { 
                console.log("construct Underwriter Component");
  }

  ngOnInit() {
    /*this.subscription = this.messagesService.messages.subscribe(msg => {
      console.log("Underwriter websocket: " + msg.message);
      console.log("Underwriter websocket: " + msg.AlertType);
      if (msg.audience == 'Underwriter') {
        if (msg.AlertType == "Success")
          this.alertService.success(msg.message);
        else if (msg.AlertType == "Error")
          this.alertService.error(msg.message);
        else 
          this.alertService.warn(msg.message);
      }
    );*/
    
      this.subscription = this.messagesService.subscribe(
        (msg: Message) => {
          if (msg.audience == 'Underwriter') {
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
      
    

    this.loadMortgages();
  }

  refreshTable(event) {
    event.preventDefault();
    this.loadMortgages();
  }

  loadMortgages() {
    this.mortgageApi.getMortgagesByStatus("WithUnderwriter").subscribe((data: Mortgage[]) => {
      console.log(data);
      this.mortgageList = data;
    });
  }

  approveMortgage(event, mortgage) {
    event.preventDefault();
    this.mortgageApi.approveMortgage(mortgage.mortgageId).subscribe((data) => {
      console.log(data);
      this.loadMortgages();
      alert(data);
    });
  }

  declineMortgage(event, mortgage) {
    event.preventDefault();
    this.mortgageApi.declineMortgage(mortgage.mortgageId).subscribe((data) => {
      console.log(data);
      this.loadMortgages();
      alert(data);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToHomePage(event) {
    event.preventDefault();
    this.router.navigate(['/home'])
  }  

  goToClarification(event, mortgageId) {
    event.preventDefault();
    console.log("/underwriters/clarification/"+mortgageId);
    this.router.navigate(['/underwriters/clarification/'+mortgageId]);
  }
}