import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as guards from './guards';
import * as services from './services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as components from './components';
import { AppStoreModule } from './store/store.module';

@NgModule({
  declarations: [
    AppComponent,
    components.LayoutMainComponent,
    components.LayoutPublicComponent,
    components.LoginComponent,
    components.DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppStoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: services.ServerErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: services.FakeBackendInterceptor,
      multi: true,
    },
    guards.AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
