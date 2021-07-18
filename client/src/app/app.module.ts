import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [AppComponent],
<<<<<<< HEAD
  imports: [BrowserModule, AppRoutingModule, LayoutModule, AuthModule,HttpClientModule],
=======
  imports: [BrowserModule, AppRoutingModule, LayoutModule, CoreModule],
>>>>>>> master
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
