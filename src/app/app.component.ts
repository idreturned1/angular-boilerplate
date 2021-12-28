import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DEFAULT_THEME, GLOBAL_EVENTS, THEMES_MAP } from './_helpers';
import { EventsService } from './_shared/providers/events/events.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    private _someVar = '';

    title = 'angular-boilerplate';

    currentTheme = DEFAULT_THEME;
    isDark = true;

    private _subscriptions = new Subscription();

    constructor(private eventsService: EventsService) {
        // this.doSomethingInConstructor1();
    }

    ngOnInit() {
        this.subscribeEvents();
        // this.doSomethingInInit();
    }

    ngOnDestroy() {
        this.unsubscribeEvents();
        // this.doSomethingInDestroy();
    }

    /**
     * Subscribe all Events Here
     */
    subscribeEvents() {
        /** Subscribe to Some Event */
        this._subscriptions.add(
            this.eventsService.subscribe(GLOBAL_EVENTS.SOME_EVENT, () => {
                // do something
            })
        );
    }

    /**
     * Unsubscribe all Events here
     */
    unsubscribeEvents() {
        this._subscriptions.unsubscribe();
    }

    /**
     * Some Function
     * - which does something
     * - and another thing
     * @param param1 with param1
     * @param param2 and param2
     */
    someFunction(param1, param2) {}

    /**
     * Toggle Theme
     */
    toggleTheme() {
        this.isDark = !this.isDark;
        this.currentTheme =
            this.currentTheme == THEMES_MAP.Dark
                ? THEMES_MAP.White
                : THEMES_MAP.Dark;
    }
}
