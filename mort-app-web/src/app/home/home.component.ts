import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Tallaght Mortgages Home Page';

  constructor(public router: Router) { }

  ngOnInit() {
  }
  
  goToBrokerPage(event) {
    this.router.navigate(['/brokers'])
  }

  goToUnderwriterPage(event) {
    this.router.navigate(['/underwriters'])
  }

}
