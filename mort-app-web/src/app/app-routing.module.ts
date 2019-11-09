import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderwriterComponentComponent } from './underwriter-component/underwriter-component.component';
import { BrokerComponentComponent } from './broker-component/broker-component.component';

const routes: Routes = [
  { path: 'underwriterView', component: UnderwriterComponentComponent },
  { path: 'brokerView', component: BrokerComponentComponent },
  { path: '', component: BrokerComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
