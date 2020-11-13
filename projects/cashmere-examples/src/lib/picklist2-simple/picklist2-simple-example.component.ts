import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Picklist 2 simple
 */
@Component({
    selector: 'hc-picklist2-simple-example',
    templateUrl: './picklist2-simple-example.component.html'
})
export class Picklist2SimpleExampleComponent {
    selectedCars = new FormControl([]);
    cars = [
        { id: 1, details: { name: 'Volvo' }},
        { id: 2, details: { name: 'Saab' }},
        { id: 3, details: { name: 'Opel' }},
        { id: 4, details: { name: 'Audi' }},
        { id: 5, details: { name: 'Toyota' }},
        { id: 6, details: { name: 'Ford' }},
        { id: 7, details: { name: 'GM' }},
        { id: 8, details: { name: 'Nissan' }},
        { id: 9, details: { name: 'Honda' }},
        { id: 10, details: { name: 'Chevy' }}
    ];
}
