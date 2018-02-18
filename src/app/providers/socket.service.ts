import { Injectable } from '@angular/core';
import { StompConfig, StompService, StompRService } from '@stomp/ng2-stompjs';
import * as SockJS from 'sockjs-client';
import { StompHeaders, Message } from '@stomp/stompjs';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export function webSocketProvider() {
  return new SockJS('http://127.0.0.1:8080/informative-websocket');
}

@Injectable()
export class SocketService extends StompRService {
  public observableMessage: Observable<Message>;
  public mensages: Array<any> = [];

  constructor() { 
    super();

    this.config = {
      url: webSocketProvider,
      headers: StompHeaders,
      heartbeat_in: 0,
      heartbeat_out: 20000,
      reconnect_delay: 5000,
      debug: true
    };

    this.initAndConnect();
    this.observableMessage = this.subscribe('/informative/new');
    this.observableMessage.subscribe(this.on_next);
  }

  /** Consume a message from the _stompService */
  private on_next = (message: Message) => {
    this.mensages.push(JSON.parse(message.body).content);
  }

  public sendMessage(message) {
    this.publish('/informative', message);
  }

  // public getMessages = () => {
  //   return Observable.create((observer) => {
  //       this.subscribe('/informative/new', (message) => {
  //           observer.next(message);
  //       });
  //   });
  // }

}
