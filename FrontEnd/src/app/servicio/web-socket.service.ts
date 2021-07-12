import { Injectable } from '@angular/core';
import * as Stomp from "stompjs"
import * as SockJS from "sockjs-client"
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
    stompClient: any;
    appComponent: AppComponent;
    homeComponent: HomeComponent;
    mensaje:any;

    constructor(){}
    
    _connectEnableNotification() {
        let socket = new WebSocket("ws://localhost:8091/ws");
        console.log("Initialize WebSocket Connection");
        //let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(socket);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe("/topic/enable", function (sdkEvent) {
                _this.onMessageReceivedEnableNotification(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBackEnableNotification);
    };

    _connectAccountBcp(){
        let socket = new WebSocket("ws://localhost:8089/ws");
        console.log("Initialize WebSocket Connection");
        //let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(socket);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe("/topic/getaccount", function (sdkEvent) {
                _this.onMessageReceivedAccountBcp(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBackAccountBcp);
    };
    
    _connectAppNotification(id){
        let socket = new WebSocket("ws://localhost:8090/ws");
        //let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(socket);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe("/topic/notifresponse", function (sdkEvent) {
                console.log("Bien")
            });
            //_this.stompClient.reconnect_delay = 2000;
        });
    }

    _connectAccountBcpUpdateNotif(){
        let socket = new WebSocket("ws://localhost:8089/ws");
        console.log("Initialize WebSocket Connection");
        //let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(socket);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe("/topic/updatenotif", function (sdkEvent) {
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBackAccountBcpUpdateNotif);
    }

    _connectNewNotification(){
        let socket = new WebSocket("ws://localhost:8089/ws");
        console.log("Initialize WebSocket Connection");
        //let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(socket);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe("/topic/newnotif", function (sdkEvent) {
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBackNewNotification);
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBackEnableNotification(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connectEnableNotification();
        }, 5000);
    }

    errorCallBackAccountBcp(error) {
      console.log("errorCallBack -> " + error)
      setTimeout(() => {
          this._connectAccountBcp();
      }, 5000);
    }


    errorCallBackAccountBcpUpdateNotif(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connectAccountBcpUpdateNotif();
        }, 5000);
    }

    errorCallBackNewNotification(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connectAccountBcpUpdateNotif();
        }, 5000);
    }

    getMensaje(){
        return this.mensaje;
    }

/**
* Send message to sever via web socket
* @param {*} message 
*/
    _sendEnableNotification(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/enablenotification", {}, JSON.stringify(message));
    }

    onMessageReceivedEnableNotification(message) {
        console.log("Message Recieved from Server :: " + message);
        //this.appComponent.handleMessage(JSON.stringify(message.body));
    }
    _sendAccountBcp(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/codigoaccount", {}, JSON.stringify(message));
    }

    onMessageReceivedAccountBcp(message) {
        console.log("Message Recieved from Server :: " + message);
        this.mensaje = message.body;
        //console.log(JSON.stringify(this.mensaje.body))
        //this.homeComponent.handleMessage(JSON.stringify(message.body));
    }

    _sendGenNotification(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/gennotification", {}, JSON.stringify(message));
    }

    _sendUpdateVistoNotification(message){
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/codigonotif", {}, JSON.stringify(message));
    }

    _sendNewNotification(message){
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/jsonnotification", {}, JSON.stringify(message));
    }
}
