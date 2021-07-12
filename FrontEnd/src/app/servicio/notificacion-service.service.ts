import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private urlEnableNotification = "http://localhost:8091";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { 
  }

  sendConfirmation(confirmation: String): Observable<any>{
    return this.http.post(this.urlEnableNotification + '/enablenotification', confirmation, {headers:this.httpHeaders});
  }
}
