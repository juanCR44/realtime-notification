
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { Account } from './model/account';
import { WebSocketService } from './servicio/web-socket.service';

$(document).ready(function(){
  $(document).on("mouseover",".menu-wrap",(function(){
    $(".item-nav").addClass('active');
  }));
  $(document).on("mouseover",".item-nav",(function(){
    $(".item-nav").addClass('active');
    $(".menu-wrap .item-section").addClass('active');
  }));
  $(document).on("mouseleave",".menu-wrap",(function(){
    $(".item-nav").removeClass('active');
  }));
  $(document).on("mouseleave",".item-nav",(function(){
    $(".item-nav").removeClass('active');
    $(".menu-wrap .item-section").removeClass('active');
  }));
  $(document).on("click",".popup-trigger",(function(){
    $(".overlay").addClass('active');
    $(".popup-search").addClass('active');
    $("button").click(function(){
      $(".popup-search").removeClass('active');
      $(".overlay").removeClass('active');
    });
    $("button").click(function(){
      $(".popup-search").removeClass('active');
      $(".overlay").removeClass('active');
    });
  }));
  $(document).on("click",".icon-cross",(function(){
    $(".popup-search").removeClass('active');
    $(".overlay").removeClass('active');
  }));
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  codigoAccount:number;
  toggle:Boolean = false;
  webSocketAPI = new WebSocketService();
  webSocketAppNotif = new WebSocketService();
  webSocketNewNotif = new WebSocketService();
  account:Account;
  codigoRemitente:number;
  monto:String;
  checkBoxValue:Boolean = false;
  
  constructor(private router:Router){

  }
  ngOnInit(): void {
    this.connect();
  }
  
  connect(){
    this.webSocketAPI._connectEnableNotification();
  }

  connectNewNotif(){
    this.webSocketNewNotif._connectNewNotification();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  disconnectNewNotif(){
    this.webSocketNewNotif._disconnect();
  }

  toggleNotif(){
    this.toggle = !this.toggle
    if(this.toggle == true) this.webSocketAppNotif._connectAppNotification(this.account.id);
    if(this.toggle == false) this.webSocketAppNotif._disconnect();
    console.log(this.toggle)
    const object = {id:this.codigoAccount, afirmacion:this.toggle}
    this.webSocketAPI._sendEnableNotification(object);
    this.sendNotifPeriodically(5000);
  }

  setCodigoAccount(id:number){
    this.codigoAccount = id
    console.log(this.codigoAccount)
  }

  setAccount(acc){
    this.account = acc  
    if(this.account.habilitado == true) {this.checkBoxValue = true; this.toggle = true; this.webSocketAppNotif._connectAppNotification(this.account.id)}
    else {this.checkBoxValue = false;this.toggle = false}
    console.log(this.account)
  }

  async sendNotifPeriodically(ms: number) {
    while(this.toggle == true){
      await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>this.webSocketAppNotif._sendGenNotification(this.account.id));
    }
  }

  nuevaNotificacion(){
    const object1 = {id:this.account.id, tipo:"Deposito", contenido:"Has hecho un deposito de " + this.monto + " soles"};
    const object2 = {id:this.codigoRemitente, tipo:"Deposito", contenido:"Se te ha hecho un depósito de " + this.monto + " soles"};
    this.webSocketNewNotif._sendNewNotification(object1);
    this.webSocketNewNotif._sendNewNotification(object2);
  }

  isHomeRoute(){
    return this.router.url != '/login';
  }
}
