import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MortgageApiService } from '../services/mortgage-api.service'
import {MatInputModule} from '@angular/material';
import { of } from 'rxjs';
import { Clarification } from '../model/clarification.model'
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-underwriting-clarification',
  templateUrl: './underwriting-clarification.component.html',
  styleUrls: ['./underwriting-clarification.component.css']
})
export class UnderwritingClarificationComponent implements OnInit, OnDestroy {

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
    event.preventDefault();
    this.mortgageApi.submitClarification(this.mortgageId, this.newClarificationText).subscribe((data) => {
      console.log(data);
      this.mortgageApi.clarifyMortgage(this.mortgageId).subscribe((data1) => {
        console.log(data1);
        this.backToUnderwriting();
      });
    });
  }

  
  backButton(event) {
    event.preventDefault();
    this.backToUnderwriting()
  }
  
  backToUnderwriting() {
    this.router.navigate(['/underwriters/']);
  }

}
