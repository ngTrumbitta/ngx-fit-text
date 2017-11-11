import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [

    ],
    exports: [

    ],
    imports: [
        CommonModule
    ]
})
export class NgxFitTextModule {
    static forRoot() {
        return {
            ngModule: NgxFitTextModule,
            providers: []
        };
    }
}
