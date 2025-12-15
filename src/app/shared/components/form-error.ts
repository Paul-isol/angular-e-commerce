import { Component, computed, input } from "@angular/core";
import { FieldState } from "@angular/forms/signals";
@Component({
    selector: 'app-form-error',
    imports: [],
    template: `
    @if(shouldShowError()) {
        @for(error of control().errors(); track error.message) {
            <p class="text-red-500 text-sm mt-1">{{error.message}}</p>
        }
    }
    `

})
export class FormError {
    readonly control = input.required<FieldState<unknown>>();

    protected readonly shouldShowError = computed(() => {
        const field = this.control();
        return !field.valid() && field.touched();
    });

}