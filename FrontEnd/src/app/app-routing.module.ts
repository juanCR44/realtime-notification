import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentLoginComponent } from './component-login/component-login.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: 'home/:id', component:HomeComponent},
  {path: 'login', component:ComponentLoginComponent},
  {path: '', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
