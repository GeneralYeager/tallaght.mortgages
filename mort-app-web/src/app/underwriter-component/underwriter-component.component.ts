import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from "../websocket.service";
import { UnderwriterNotificationsService } from "../underwriter-notifications.service";
import { AlertService } from '../_alert';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-underwriter-component',
  templateUrl: './underwriter-component.component.html',
  styleUrls: ['./underwriter-component.component.css'],
  providers: [WebsocketService, UnderwriterNotificationsService]
})
export class UnderwriterComponentComponent implements OnInit, OnDestroy {

  title = 'Tallaght Mortgages Underwriters Page';
  private subscription: Subscription;

  constructor(private router: Router, private messagesService: UnderwriterNotificationsService, private alertService: AlertService) { 
  }

  ngOnInit() {
    this.subscription = this.messagesService.messages.subscribe(msg => {
      console.log("Response from websocket: " + msg.message);
      this.alertService.success(msg.message);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToHomePage(event) {
    this.router.navigate(['/home'])
  }  
}