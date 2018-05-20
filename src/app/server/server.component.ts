import { Component} from '@angular/core';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
        .online{
            color: #fff;
        }
    `]
})
export class ServerComponent {
    serverId: number = 10;
    serverStatus: string = "offline";

    constructor() {
        this.serverStatus = Math.random() > 0.5 ? "offline" : "online";
    }

    getColor() {
        return this.serverStatus === "offline" ? "green" : "red"
      }

    getServerStatus() {
        return this.serverStatus;
    }
}