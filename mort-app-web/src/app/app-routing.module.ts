import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderwriterComponentComponent } from './underwriter-component/underwriter-component.component';
import { BrokerComponentComponent } from './broker-component/broker-component.component';
import { HomeComponent } from './home/home.component';
import { NewmortgageComponent } from './newmortgage/newmortgage.component';
import { UnderwritingClarificationComponent } from './underwriting-clarification/underwriting-clarification.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'underwriters', component: UnderwriterComponentComponent },
  { path: 'underwriters/clarification/:id', component: UnderwritingClarificationComponent },
  { path: 'brokers', component: BrokerComponentComponent },
  { path: 'brokers/newmortgage', component: NewmortgageComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
