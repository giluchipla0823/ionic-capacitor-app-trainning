import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
} from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-show-hide-password',
  templateUrl: './show-hide-password.component.html',
  styleUrls: ['./show-hide-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowHidePasswordComponent {
  @ContentChild(IonInput, { static: false }) input!: IonInput;

  show = false;

  toggleShow(): void {
    this.show = !this.show;

    if (this.show) {
      this.input.type = 'text';
    } else {
      this.input.type = 'password';
    }
  }
}
