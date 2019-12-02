import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MortgageApiService } from '../services/mortgage-api.service'
import {MatInputModule} from '@angular/material';
import { of } from 'rxjs';

@Component({
  selector: 'app-underwriting-clarification',
  templateUrl: './underwriting-clarification.component.html',
  styleUrls: ['./underwriting-clarification.component.css']
})
export class UnderwritingClarificationComponent implements OnInit, OnDestroy {

  mortgageId: string;
  clarificationQuestion: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mortgageApi: MortgageApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.mortgageId = params['id'];
      }
    );
  }

  ngOnDestroy() {
  }

  submitClarification(event) {
    this.mortgageApi.submitClarification(this.mortgageId, this.clarificationQuestion).subscribe((data) => {
      console.log(data);
      alert(data);
    });
  }

}
