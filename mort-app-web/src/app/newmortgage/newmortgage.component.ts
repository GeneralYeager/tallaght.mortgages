import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mortgage } from '../model/mortgage.model'
import { MortgageApiService } from '../services/mortgage-api.service'

@Component({
  selector: 'app-newmortgage',
  templateUrl: './newmortgage.component.html',
  styleUrls: ['./newmortgage.component.css']
})
export class NewmortgageComponent implements OnInit {
  title = 'Create New Mortgage Page';

  constructor(private router: Router, private mortgageApi: MortgageApiService) { }
  private element : Mortgage = new Mortgage;

  ngOnInit() {
  }

  createMortgage(event) {
    event.preventDefault();
    console.log(this.element);
    this.mortgageApi.createMortgage(this.element).subscribe(data => {
      console.log(data);
      this.router.navigate(['/home/brokers'])
    });
  }
}
