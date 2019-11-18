import { Injectable } from "@angular/core";
import { Observable, Observer, Subject } from 'rxjs'
import { map } from 'rxjs/operators';

import { WebsocketService } from "./websocket.service";

const CHAT_URL = "wss://h9uk1z65s6.execute-api.eu-west-1.amazonaws.com/Prod";

export interface Message {
  author: string;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class UnderwriterNotificationsService {

  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    console.log("const1");
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).pipe(
      map((response: MessageEvent): Message => {
        console.log(response);
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
      })
    );
    console.log("const2");
  }
}