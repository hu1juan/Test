import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestService } from './_services/test.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FilterLettersPipe } from './_pipes/filter-letters.pipe';
import { RouterModule } from '@angular/router';
import { RedirectComponent } from './redirect/redirect.component';
import { OnlinetestComponent } from './onlinetest/onlinetest.component';
import { AppRoutingModule } from './app-routing.module';
import { NgSpinKitModule } from 'ng-spin-kit';

@NgModule({
  declarations: [
    AppComponent,
    FilterLettersPipe,
    RedirectComponent,
    OnlinetestComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule,
    NgSpinKitModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule {}
