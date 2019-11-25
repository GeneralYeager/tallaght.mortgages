import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from "../websocket.service";
import { UnderwriterNotificationsService } from "../underwriter-notifications.service";
import { AlertService } from '../_alert';
import { Subscription } from 'rxjs'

import { Mortgage } from '../model/mortgage.model'
import { MortgageApiService } from '../services/mortgage-api.service'
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-underwriter-component',
  templateUrl: './underwriter-component.component.html',
  styleUrls: ['./underwriter-component.component.css'],
  providers: [WebsocketService, UnderwriterNotificationsService],
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
              private messagesService: UnderwriterNotificationsService, 
              private alertService: AlertService,
              private mortgageApi: MortgageApiService) { 
  }

  ngOnInit() {
    this.subscription = this.messagesService.messages.subscribe(msg => {
      console.log("Underwriter websocket: " + msg.message);
      if (msg.audience == 'Underwriter') this.alertService.success(msg.message);

      this.loadMortgages();
    });

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
  }

  declineMortgage(event, mortgage) {
    event.preventDefault();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToHomePage(event) {
    this.router.navigate(['/home'])
  }  
}