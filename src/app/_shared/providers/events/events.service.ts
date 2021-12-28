import { Injectable } from '@angular/core';
import { UnsubscribableEvent } from './unsubscribable-event';

@Injectable({
    providedIn: 'root',
})
export class EventsService {
    private _channels: any = [];

    constructor() {}

    /**
     * Subscribe to an event topic. Events that get posted to that topic will trigger the provided handler.
     *
     * @param topic the topic to subscribe to
     * @param handler the event handler
     */
    subscribe(topic: string, handler: Function) {
        if (!this._channels[topic]) {
            this._channels[topic] = [];
        }
        this._channels[topic].push(handler);
        return new UnsubscribableEvent({ topic, handler }, this);
    }

    /**
     * Unsubscribe from the given topic. Your handler will no longer receive events published to this topic.
     *
     * @param topic the topic to unsubscribe from
     * @param handler the event handler (same as in subscribe)
     *
     * @return true if a handler ws removed
     */
    unsubscribe(topic: string, handler: Function = null) {
        const t = this._channels[topic];
        if (!t) {
            // Wasn't found, Wasn't removed
            return false;
        }

        if (!handler) {
            // remove all handlers from this topic
            delete this._channels[topic];
            return true;
        }

        // We need to find and remove a specific handler
        const i = t.indexOf(handler);

        if (i < 0) {
            // Wasn't found, Wasn't removed
            return false;
        }

        t.splice(i, 1);

        // If the channel in empty now, remove it from the channel map
        if (!t.length) {
            delete this._channels[topic];
        }
        return true;
    }

    /**
     * Publish an event to the given topic.
     *
     * @param topic the topic to publish
     * @param eventData the data to send as the event
     */
    publish(topic: string, ...args: any[]) {
        const t = this._channels[topic];
        if (!t) {
            return null;
        }

        const responses: any[] = [];
        t.forEach((handler: any) => {
            responses.push(handler(...args));
        });
        return responses;
    }
}
