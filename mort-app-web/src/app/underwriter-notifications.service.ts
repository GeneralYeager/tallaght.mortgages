import { Injectable } from "@angular/core";
import { Observable, Observer, Subject } from 'rxjs'
import { map } from 'rxjs/operators';

import { WebsocketService } from "./websocket.service";

const CHAT_URL = "wss://7vyxrs1368.execute-api.eu-west-1.amazonaws.com/Prod";

export interface Message {
  audience: string;
  message: string;
  AlertType: string;
}


@Injectable({
  providedIn: 'root'
})
export class UnderwriterNotificationsService {

  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).pipe(
      map((response: MessageEvent): Message => {
        console.log(response);
        console.log("in map");
        let data = JSON.parse(response.data);
        console.log(data);
        return {
          audience: data.audience,
          message: data.message,
          AlertType: data.AlertType
        };
      })
    );
  }
}