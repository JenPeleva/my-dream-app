import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { ActionMenuComponent } from './action-menu/action-menu.component';
import { MoveInViewportDirective } from './move-in-viewport.directive';
import { WindowRefService } from './window-ref.service';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    ActionMenuComponent,
    MoveInViewportDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [WindowRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
