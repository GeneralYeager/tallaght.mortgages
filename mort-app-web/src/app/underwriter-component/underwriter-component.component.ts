import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from "../websocket.service";
import { UnderwriterNotificationsService } from "../underwriter-notifications.service";

@Component({
  selector: 'app-underwriter-component',
  templateUrl: './underwriter-component.component.html',
  styleUrls: ['./underwriter-component.component.css'],
  providers: [WebsocketService, UnderwriterNotificationsService]
})
export class UnderwriterComponentComponent implements OnInit {

  title = 'Tallaght Mortgages Underwriters Page';

  constructor(private router: Router, private messagesService: UnderwriterNotificationsService) { 
    messagesService.messages.subscribe(msg => {
      console.log("Response from websocket: " + msg);
    });
  }

  ngOnInit() {
  }

  goToHomePage(event) {
    this.router.navigate(['/home'])
  }  
}