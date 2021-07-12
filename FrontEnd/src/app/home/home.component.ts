import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { map } from 'rxjs/operators';
import * as $ from "jquery";
import { WebSocketService } from '../servicio/web-socket.service';
import { Account } from '../model/account';
import { threadId } from 'worker_threads';
import { Notification } from '../model/notification';

$(document).ready(function(){
  $(document).on("click",".icon-bell",(function(){
    $(".notif-box").addClass('active');
  }));
  $(document).on("mouseleave",".notif-box",(function(){
    $(".notif-box").removeClass('active');
  }));
  $(document).on("click",".notif-item",(function(){
    $(".color-rojo .dot").addClass('active');
  }));
});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  codigoAccount:number;
  account:Account;
  acc:any;
  socket:WebSocket;
  notifications:Notification[] = []
  webSocketNotif = new WebSocketService();
  webSocketUpdateNotif = new WebSocketService();
  presiono:Boolean = false;


  constructor(private dataRoute: ActivatedRoute, private appComponent: AppComponent){
    this.codigoAccount = parseInt(this.dataRoute.snapshot.paramMap.get('id'))
    this.appComponent.setCodigoAccount(this.codigoAccount);
  }
  ngOnInit(): void {
    this.connectHome();
    this.connectWebSocketUpdate();
    this.delaySend(300);
    this.delayHandle(700);

  }

  connectHome(){
    this.webSocketNotif._connectAccountBcp();
  }
  
  connectWebSocketUpdate(){
    this.webSocketUpdateNotif._connectAccountBcpUpdateNotif();
  }

  disconnect(){
    this.webSocketNotif._disconnect();
  }

  sendMessageAccount(){
    this.webSocketNotif._sendAccountBcp(this.codigoAccount);
  }

  updateVisto(p:Notification){
    if(p.visto != true){
      this.presiono = true;
      const object = {id:p.id, afirmacion:true}
      this.webSocketUpdateNotif._sendUpdateVistoNotification(object);
    }
  }

  handleMessageAccount(){
    this.acc = this.webSocketNotif.getMensaje();
    let jsonObj: any = JSON.parse(this.acc); 
    this.account = <Account>jsonObj;
    this.appComponent.setAccount(this.account);
    this.notifications = this.account.notification;
  }

  filtrarVisto(){
    var notif:Notification[] = []
    for(let p of this.account.notification){
      if (p.visto == true){
        notif.push(p);
      }
    }
    this.notifications = notif;
  }

  filtrarNoVisto(){
    var notif:Notification[] = []
    for(let p of this.account.notification){
      if (p.visto == false){
        notif.push(p);
      }
    }
    this.notifications = notif;
  }

  filtrarTodos(){
    this.notifications = this.account.notification;
  }

  async delaySend(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>{
      this.sendMessageAccount();
    });
  }

  async delayHandle(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>{
      this.handleMessageAccount();
    });
  }
}
