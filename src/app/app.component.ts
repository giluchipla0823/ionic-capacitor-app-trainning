import { Component, ViewChild } from '@angular/core';
import { IonMenu, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonMenu) ionMenu: IonMenu;

  constructor(private navController: NavController) {}

  async goToPage(url: string): Promise<void> {
    await this.ionMenu.close();

    this.navController.navigateForward(url);
  }
}
