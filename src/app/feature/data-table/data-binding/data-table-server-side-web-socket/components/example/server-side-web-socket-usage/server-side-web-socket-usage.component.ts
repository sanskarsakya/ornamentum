import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription } from 'rxjs';

import {
  GlobalRefService,
  DataTableWebsocketDataFetchService,
  DataTableDataBindCallback
} from 'ornamentum';

import { ExampleData } from 'helper-models';

/**
 * Server side web socket data binding example component.
 */
@Component({
  selector: 'app-server-side-web-socket-usage',
  templateUrl: './server-side-web-socket-usage.component.html'
})
export class ServerSideWebSocketUsageComponent implements OnInit, OnDestroy {
  public onDataBind: DataTableDataBindCallback;
  public intervalSubscription: Subscription;

  constructor(private globalRefService: GlobalRefService,
              private dataTableWebSocketDataFetchService: DataTableWebsocketDataFetchService<ExampleData>) {
  }

  /**
   * Component initialize lifecycle event handler.
   */
  public ngOnInit(): void {
    // Create web socket connection on browser environment only to support server side rendering.
    if (this.globalRefService.isBrowser) {
      this.dataTableWebSocketDataFetchService.init({
        url: `wss://${window.location.hostname}` // web socket endpoint
      });

      this.onDataBind = this.dataTableWebSocketDataFetchService.onDataBind();

      // Keep the socket connection alive with a heart beat ping
      this.intervalSubscription = interval(40000).subscribe(() => {
        this.dataTableWebSocketDataFetchService.socketStream.next({
          type: 'keep-alive'
        } as any);
      });
    }
  }

  /**
   * Component destroy lifecycle event handler.
   */
  public ngOnDestroy(): void {
    this.dataTableWebSocketDataFetchService.dispose();

    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
