import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mortgage } from '../model/mortgage.model'
import { MortgageApiService } from '../services/mortgage-api.service'
import { animate, state, style, transition, trigger } from '@angular/animations';

/*
const ELEMENT_DATA: MortgageApplication[] = [
  {mortgageId: '1', loanAmount: 250000, employerName: 'Hydrogen', term: 11, salary: 10100},
  {mortgageId: '2', loanAmount: 250000, employerName: 'Hydrogen', term: 11, salary: 10100}
];
*/
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
export class BrokerComponentComponent implements OnInit {

  title = 'Tallaght Mortgages Brokers Page';

  columnsToDisplay: string[] = ['mortgageId', 'customerId', 'employerName', 'loanAmount', 'mortgageStatus', 'salary', 'term', 'yearsInEmployment'];
  mortgageList: Mortgage[];// = ELEMENT_DATA;
  expandedElement: Mortgage | null;

  constructor(private router: Router, private mortgageApi: MortgageApiService) {     
  }

  ngOnInit() {
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
  
}
