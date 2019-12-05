import { Injectable } from '@angular/core';

import { Observable, Subscription, Observer, Subject } from 'rxjs'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class NewWebsocketService {
  private closed = false;
  private webSocketSubject: WebSocketSubject;
  constructor() {
    this.webSocketSubject = webSocket("URL");
  }

  subscribe(obs: Observable) {
      if (closed) {
        this.webSocketSubject = webSocket("URL");
        closed = false;
      }
    this.webSocketSubject.asObservable().subscribe(obs);
  }

  unsubscribe(sub: Subscription) {
    sub.unsubscribe();
  }

  close() {
      this.webSocketSubject.complete();
      closed = true;
  }
}