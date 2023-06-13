import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Data, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';

@Component({
    selector: 'hc-accessibility',
    templateUrl: './accessibility.component.html',
    styleUrls: ['../shared/base-demo.component.scss']
})
export class AccessibilityComponent implements OnDestroy {
    thisPage = '';
    selectOptions: Array<Data> = [];
    categories: Array<string> = [];
    private unsubscribe = new Subject<void>();
    private appInsights;

    @ViewChild('contentContainer') contentContainer: ElementRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        this.appInsights = new ApplicationInsightsService();
        // Listen for vertical tab bar navigation and update the select component
        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (activatedRoute.firstChild) {
                    this.thisPage = activatedRoute.firstChild.snapshot.data['title'];
                    this.appInsights.logPageView(this.thisPage, event.urlAfterRedirects);
                }
            }
            // Reset the scroll position of the vertical tab content container at the beginning of navigation
            if (event instanceof NavigationStart && this.contentContainer) {
                this.contentContainer.nativeElement.scrollTo(0, 0);
            }
        });

        // Populate the responsive select component with the router information
        const root = this.activatedRoute.routeConfig;
        if ( root && root.children ) {
            for (const entry of root.children ) {
                if (entry.data && entry.data.title) {
                    this.selectOptions.push(entry);
                    if ( entry.data.category && !this.categories.includes( entry.data.category )) {
                        this.categories.push( entry.data.category );
                    }
                }
            }
        }
    }

    // Handle changes to the select component and navigate
    selectUpdate(event: string): void {
        if (this.selectOptions.length) {
            for (const entry of this.selectOptions) {
                if (entry.data && event === entry.data.title) {
                    this.router.navigate(['/web/accessibility/' + entry.path]);
                    break;
                }
            }
        }
    }

    // Handle nav changes via the sidebar
    navUpdate(page: string): void {
        this.router.navigate(['/web/accessibility/' + page]);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
