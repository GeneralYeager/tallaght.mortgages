import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnderwriterComponentComponent } from './underwriter-component/underwriter-component.component';
import { BrokerComponentComponent } from './broker-component/broker-component.component';
import { HomeComponent } from './home/home.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table'

import { AlertModule } from './_alert';

import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NewmortgageComponent } from './newmortgage/newmortgage.component';
@NgModule({
  declarations: [
    AppComponent,
    UnderwriterComponentComponent,
    BrokerComponentComponent,
    HomeComponent,
    NewmortgageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    AlertModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
