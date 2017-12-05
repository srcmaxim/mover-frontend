import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [],
  exports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SharedLibsModule {
}
