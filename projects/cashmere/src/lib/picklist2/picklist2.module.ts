import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HcPicklist2Component } from './picklist2.component';
import { HcPickPaneListComponent } from './pick-pane-list.component';
import { HcPickOptionComponent } from './pick-option.component';
import { HcPickPaneComponent } from './pick-pane.component';
import { SELECTION_MODEL_FACTORY } from './pick.types';
import {
    HcPaneFooterTemplateDirective,
    HcPaneToolbarTemplateDirective,
    HcPickOptgroupTemplateDirective,
    HcPickOptionTemplateDirective,
    HcPaneHeaderLeftTemplateDirective,
    HcPaneHeaderRightTemplateDirective,
    HcPickItemLabelDirective,
    HcPickCustomItemTemplateDirective
} from './pick-templates.directive';
import { DefaultSelectionModelFactory } from './selection-model';
export { HcPicklist2Component } from './picklist2.component';

@NgModule({
    declarations: [
        HcPickPaneListComponent,
        HcPickOptionComponent,
        HcPickPaneComponent,
        HcPicklist2Component,
        HcPickOptgroupTemplateDirective,
        HcPickOptionTemplateDirective,
        HcPaneHeaderLeftTemplateDirective,
        HcPaneHeaderRightTemplateDirective,
        HcPickItemLabelDirective,
        HcPaneToolbarTemplateDirective,
        HcPaneFooterTemplateDirective,
        HcPickCustomItemTemplateDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HcPickPaneComponent,
        HcPicklist2Component,
        HcPickOptionComponent,
        HcPickOptgroupTemplateDirective,
        HcPickOptionTemplateDirective,
        HcPaneHeaderLeftTemplateDirective,
        HcPaneHeaderRightTemplateDirective,
        HcPaneToolbarTemplateDirective,
        HcPaneFooterTemplateDirective,
        HcPickCustomItemTemplateDirective
    ],
    providers: [
        { provide: SELECTION_MODEL_FACTORY, useValue: DefaultSelectionModelFactory }
    ]
})
export class Picklist2Module {}
