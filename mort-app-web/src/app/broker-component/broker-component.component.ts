import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mortgage } from '../model/mortgage.model'
import { MortgageApiService } from '../services/mortgage-api.service'
/*
const ELEMENT_DATA: MortgageApplication[] = [
  {mortgageId: '1', loanAmount: 250000, employerName: 'Hydrogen', term: 11, salary: 10100},
  {mortgageId: '2', loanAmount: 250000, employerName: 'Hydrogen', term: 11, salary: 10100}
];
*/
@Component({
  selector: 'app-broker-component',
  templateUrl: './broker-component.component.html',
  styleUrls: ['./broker-component.component.css']
})
export class BrokerComponentComponent implements OnInit {

  title = 'Tallaght Mortgages Brokers Page';

  displayedColumns: string[] = ['mortgageId', 'loanAmount', 'employerName', 'term', 'salary'];
  mortgageList: Mortgage[];// = ELEMENT_DATA;

  constructor(private router: Router, private mortgageApi: MortgageApiService) { 
    
  }

  ngOnInit() {
    this.mortgageApi.getMortgages().subscribe((data: Mortgage[]) => {
      this.mortgageList = data;
    })
  }

  goToHomePage(event) {
    this.router.navigate(['/home'])
  }  
}
