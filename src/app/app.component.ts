import { Component } from '@angular/core';

import { NodeService } from './shared/services/node.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'logistic_bdt_web';

  public isConnected = false;

    public constructor(private nodeService: NodeService) {
    }

    public ngOnInit() {
        this.connectToNode();
    }

    private connectToNode() {
        this.nodeService
            .connectToNode()
            .subscribe({
                next: () => this.isConnected = true,
                error: () => this.isConnected = false
            });
    }
}
