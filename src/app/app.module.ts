import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import {StoreModule} from '@ngrx/store';
import { peopleReducer } from './people'
import {AppComponent, JazzDialog} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    JazzDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    StoreModule.provideStore({people: peopleReducer}),
    MaterialModule.forRoot()
  ],
  providers: [],
  entryComponents: [JazzDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
