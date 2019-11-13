import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface MortgageApplication {
  mortgageId: string;
  loanAmount: number;
  term: number;
  employerName: string;
  salary: number;
}

const ELEMENT_DATA: MortgageApplication[] = [
  {mortgageId: '1', loanAmount: 250000, employerName: 'Hydrogen', term: 11, salary: 10100},
  {mortgageId: '2', loanAmount: 250000, employerName: 'Hydrogen', term: 11, salary: 10100}
];

@Component({
  selector: 'app-broker-component',
  templateUrl: './broker-component.component.html',
  styleUrls: ['./broker-component.component.css']
})
export class BrokerComponentComponent implements OnInit {

  title = 'Tallaght Mortgages Brokers Page';

  displayedColumns: string[] = ['mortgageId', 'loanAmount', 'employerName', 'term', 'salary'];
  dataSource = ELEMENT_DATA;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goToHomePage(event) {
    this.router.navigate(['/home'])
  }  
}
