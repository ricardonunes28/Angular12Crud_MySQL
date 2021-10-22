import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { WebSocketService } from '../../services/web-socket.service'
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
 
  userChat = {
    user: '',
    text: ''
  }

  myMessages;
  eventName = 'send-message'


  constructor(private activated: ActivatedRoute, private webService: WebSocketService) {
  }

  ngOnInit(): void {
    const id = this.activated.snapshot.params.id;
    this.userChat.user = id;

    this.webService.listen('text-event').subscribe((data) => {
      console.log(data)
      this.myMessages = data;
    })
  };

  myMessage(){
    this.webService.emit(this.eventName, this.userChat);
    this.userChat.text = ''
  }

  //   const channel = pusher.subscribe('chat');
  //   channel.bind('message', data => {
  //     this.messages.push(data);
  //   });
  // }

  // submit(): void {
  //   this.http.post('http://localhost:3000/api/messages' ,{
  //     username: this.username,
  //     message: this.message
  //   }).subscribe(() => this.message = '');
  // }




}
