import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SidenavComponent, SidenavLink } from '@healthcatalyst/cashmere';

/**
 * @title Sidenav Nested Links
 */
@Component({
    selector: 'hc-sidenav-nested-links-example',
    templateUrl: 'sidenav-nested-links-example.component.html',
    styleUrls: ['sidenav-nested-links-example.component.scss']
})
export class SidenavNestedLinksExampleComponent {
    @ViewChild(SidenavComponent, { static: false }) sidenav: SidenavComponent;
    showTreeLines: FormControl = new FormControl(true);
    collapsibleChildren: FormControl = new FormControl(true);
    openChildrenWhenActivated: FormControl = new FormControl(true);
    isDarkMode: FormControl = new FormControl(false);
    width: FormControl = new FormControl('300px');

    tabs: SidenavLink[] = [
        new SidenavLink({ title: 'Home', iconClass: 'fa fa-home', description: "User's home dashboard" }),
        new SidenavLink({
            title: 'Land',
            iconClass: 'fa fa-road',
            description: 'Travel by land',
            children: [
                new SidenavLink({
                    title: 'Autos',
                    iconClass: 'fa fa-car',
                    description: 'Trucks, cars, and more',
                    children: [
                        new SidenavLink({
                            title: 'Toyota Tacoma',
                            iconClass: 'fa fa-car',
                            description: 'Solid mid-size pickup',
                            children: [
                                new SidenavLink({ title: 'SR', iconClass: 'fa fa-car', description: 'Base level trim', subText: '$' }),
                                new SidenavLink({
                                    title: 'SR5',
                                    iconClass: 'fa fa-car',
                                    description: 'Budget-friendly with some extras',
                                    subText: '$$'
                                }),
                                new SidenavLink({
                                    title: 'TRD Pro',
                                    iconClass: 'fa fa-car',
                                    description: 'Great for off-roading',
                                    subText: '$$$'
                                }),
                                new SidenavLink({
                                    title: 'Limited',
                                    iconClass: 'fa fa-car',
                                    description: 'All the bells and whistles',
                                    subText: '$$$$'
                                })
                            ]
                        }),
                        new SidenavLink({ title: 'Ford F-150', iconClass: 'fa fa-car', description: 'The best selling truck in America' }),
                        new SidenavLink({ title: 'Land Rover', iconClass: 'fa fa-car', description: 'Travel in style' })
                    ]
                }),
                new SidenavLink({
                    title: 'Motorcycles',
                    iconClass: 'fa fa-motorcycle',
                    description: 'Two wheels and a motor',
                    children: [
                        new SidenavLink({ title: 'Harley-Davidson', iconClass: 'fa fa-motorcycle', description: 'The classic' }),
                        new SidenavLink({ title: 'Ducati', iconClass: 'fa fa-motorcycle', description: 'Italian style' }),
                        new SidenavLink({
                            title: 'Honda Goldwing',
                            iconClass: 'fa fa-motorcycle',
                            description: 'The ultimate touring bike'
                        }),
                        new SidenavLink({ title: 'Kawasaki Ninja', iconClass: 'fa fa-motorcycle', description: 'Speed demon' })
                    ]
                })
            ]
        }),
        new SidenavLink({
            title: 'Sky',
            iconClass: 'fa fa-plane',
            description: 'Travel by sky',
            children: [
                new SidenavLink({
                    title: 'Commerical',
                    iconClass: 'fa fa-plane',
                    description: 'Transportation for the masses',
                    children: [
                        new SidenavLink({ title: 'Boeing 737', iconClass: 'fa fa-plane', description: 'Fly the friendly skies' }),
                        new SidenavLink({
                            title: 'Airbus A380',
                            iconClass: 'fa fa-plane',
                            description: "The world's largest passenger airliner"
                        })
                    ]
                }),
                new SidenavLink({
                    title: 'Private',
                    iconClass: 'fa fa-plane',
                    description: 'Travel in style',
                    children: [
                        new SidenavLink({
                            title: 'Cessna Citation',
                            iconClass: 'fa fa-plane',
                            description: "The world's fastest private jet"
                        }),
                        new SidenavLink({
                            title: 'Gulfstream G650',
                            iconClass: 'fa fa-plane',
                            description: 'The ultimate in luxury travel'
                        })
                    ]
                }),
                new SidenavLink({
                    title: 'Military',
                    iconClass: 'fa fa-fighter-jet',
                    description: 'For the armed forces',
                    children: [
                        new SidenavLink({
                            title: 'F-16',
                            iconClass: 'fa fa-fighter-jet',
                            description: "The world's most popular fighter jet"
                        }),
                        new SidenavLink({ title: 'B-2 Spirit', iconClass: 'fa fa-fighter-jet', description: 'Stealth bomber' })
                    ]
                })
            ]
        }),
        new SidenavLink({ title: 'Sea', iconClass: 'fa fa-ship', description: 'Travel by sea' }),
        new SidenavLink({ title: 'Space', iconClass: 'fa fa-rocket', description: 'Travel amongst the stars' })
    ];

    closeAll(): void {
        this.sidenav.collapseAllNestedLinks();
    }
}
