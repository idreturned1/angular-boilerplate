import { SubscribableEvent } from './events';
import { EventsService } from './events.service';

export class UnsubscribableEvent {
    private _channelRef: SubscribableEvent;
    private _serviceRef: EventsService;

    // constructor(_channelRef: SubscribableEvent, _serviceRef: EventsService) {}
    constructor(channelRef: SubscribableEvent, serviceRef: EventsService) {
        this._channelRef = channelRef;
        this._serviceRef = serviceRef;
    }

    unsubscribe(): void {
        this._serviceRef.unsubscribe(
            this._channelRef.topic,
            this._channelRef.handler
        );
    }
}
