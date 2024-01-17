import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const ERROR_MESSAGES: Record<string, Function> = {
  required: () => 'Required field',
  email: () => 'The field is an invalid email',
  minlength: ({
    requiredLength,
    actualLength,
  }: {
    requiredLength: number;
    actualLength: number;
  }) => `The field should contain at least ${requiredLength} characters`,
};

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
})
export class ErrorMessagesComponent {
  @Input() control!: AbstractControl;
  @Input() customErrors: Record<string, string> = {};

  get errorMessage(): string | null {
    for (const error in this.control?.errors) {
      if (
        this.control.errors.hasOwnProperty(error) &&
        (this.control.touched ||
          (this.control.asyncValidator !== null && !this.control.pristine))
      ) {
        if (this.customErrors?.hasOwnProperty(error)) {
          return this.customErrors[error];
        }

        if (ERROR_MESSAGES.hasOwnProperty(error)) {
          return ERROR_MESSAGES[error](this.control?.errors[error]);
        }

        return 'Unexpected error';
      }
    }
    return null;
  }
}
