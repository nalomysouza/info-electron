import { StompService, StompConfig } from '@stomp/ng2-stompjs';
import { SocketService } from './providers/socket.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SocketService],
})
export class AppComponent implements OnInit{
  title = 'app';
  message: string;
  mensagens: Array<any> = [];

  constructor(private socketService:SocketService) {
    this.mensagens = socketService.mensages;
  }
  ngOnInit(): void {
    
    // this.socketService
    //   .getMessages()
    //   .subscribe((message: string) => {
    //     console.log(message);
    //     this.messages.push(message);
    //   });
  }

  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';
  }
}
