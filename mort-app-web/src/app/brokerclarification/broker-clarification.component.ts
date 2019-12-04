import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MortgageApiService } from '../services/mortgage-api.service'
import {MatInputModule} from '@angular/material';
import { of } from 'rxjs';

import { Clarification } from '../model/clarification.model'
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-broker-clarification',
  templateUrl: './broker-clarification.component.html',
  styleUrls: ['./broker-clarification.component.css']
})
export class BrokerClarificationComponent implements OnInit, OnDestroy {

  mortgageId: string;
  clarificationList: Clarification[];
  newClarificationText: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mortgageApi: MortgageApiService
  ) {}

  ngOnInit() {
    this.mortgageId = this.route.snapshot.paramMap.get('id');
    this.mortgageApi.getClarifications(this.mortgageId).subscribe((data) => {
      console.log(data);
      this.clarificationList = data;
    });
  }

  ngOnDestroy() {
  }

  submitClarification(event) {
    this.mortgageApi.submitClarification(this.mortgageId, this.newClarificationText).subscribe((data) => {
      console.log(data);
      this.mortgageApi.brokerClarifyMortgage(this.mortgageId).subscribe((data1) => {
        console.log(data1);
        this.backToBrokerPage();
      });
    });
  }

  
  backButton(event) {
    event.preventDefault();
    this.backToBrokerPage()
  }
  
  backToBrokerPage() {
    this.router.navigate(['/brokers/']);
  }

}
