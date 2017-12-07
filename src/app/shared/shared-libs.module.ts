import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {Iso8601Date} from "./pipes/date.pipe";
import {CustomDate} from "./pipes/date.pipe";

@NgModule({
  declarations: [
    Iso8601Date,
    CustomDate
  ],
  imports: [],
  exports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Iso8601Date,
    CustomDate
  ]
})
export class SharedLibsModule {
}
