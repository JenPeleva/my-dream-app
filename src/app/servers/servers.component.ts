import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html'
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverName: string = "TestName";
  serverCreationStatus = "No status was created";
  serverCreated = false;
  servers = ["testServer", "testServer2"];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
    
  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreationStatus = "Server is created. Name is " + this.serverName;
    this.servers.push(this.serverName);
  }

  onUpdateServerName(event: Event) {
    console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  ngOnInit() {
  }

}
