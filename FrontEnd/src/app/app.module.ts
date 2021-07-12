import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationComponentComponent } from './components/notification-component/notification-component.component';
import { HomeComponent } from './home/home.component';
import { ComponentLoginComponent } from './component-login/component-login.component';


@NgModule({
  declarations: [
    AppComponent,
    NotificationComponentComponent,
    HomeComponent,
    ComponentLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
