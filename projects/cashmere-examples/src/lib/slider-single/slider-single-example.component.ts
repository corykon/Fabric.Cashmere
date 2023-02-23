import { Component } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { UntypedFormControl } from '@angular/forms';

/**
 * @title Single Slider
 */
@Component({
    selector: 'hc-slider-single-example',
    templateUrl: 'slider-single-example.component.html',
    styleUrls: ['slider-single-example.component.scss']
})
export class SliderSingleExampleComponent {
    sliderControl: UntypedFormControl = new UntypedFormControl(100);
    options: Options = {
        showSelectionBar: true,
        floor: 0,
        ceil: 250
    };

    updateSlider( value: StringConstructor ): void {
        if ( !isNaN(+value) ) {
            this.sliderControl.setValue( Number(value) );
        }
    }
}
