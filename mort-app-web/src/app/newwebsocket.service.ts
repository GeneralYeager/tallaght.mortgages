import { Injectable } from '@angular/core';

import { Observable, Subscription, Observer, Subject } from 'rxjs'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


const CHAT_URL = "wss://7vyxrs1368.execute-api.eu-west-1.amazonaws.com/Prod";

export interface Message {
  audience: string;
  message: string;
  AlertType: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewWebsocketService {
  private closed = false;
  private webSocketSubject: WebSocketSubject<Message>;
  constructor() {
    this.webSocketSubject = webSocket(CHAT_URL);
    console.log("create ws");
    this.webSocketSubject.subscribe(
      msg => console.log("Dummy websocket subscription msg = " + msg),
      err => console.log("Dummy websocket subscription err = " + err),
      () => console.log('Dummy websocket subscription complete')
    );
 
  }

  subscribe(msg, err, close) {
      /*if (closed) {
        this.webSocketSubject = webSocket(CHAT_URL);
        console.log("subscribed");
        closed = false;
      }*/
      console.log("subsc");
    return this.webSocketSubject.subscribe(msg, err, close);//sasObservable().subscribe(obs);
      
    console.log("after");

  }

  unsubscribe(sub: Subscription) {
    sub.unsubscribe();
  }

  close() {
      this.webSocketSubject.complete();
      closed = true;
  }
}