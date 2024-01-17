import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/common/providers/nav-controller';

import { HardwareBackButtonService } from '@services/ui/hardware-back-button.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent implements OnInit, OnDestroy {
  @Input() defaultHref: string;
  @Input() fallbackHref: string;
  @Input() isCustomHandler = false;
  @Input() disabledHardwareBackButton = false;
  @Input() iconName = 'arrow-back-outline';
  @Input() disabled = false;

  @Input() navigateOptions: NavigationOptions = {};

  @Output() onBack = new EventEmitter();

  private isHardwareBackButtonEnable = true;
  private destroyRef = inject(DestroyRef);
  private hardwareBackButton$: Subscription;
  private previousNavigationUrl: string;

  constructor(
    private router: Router,
    private platform: Platform,
    private navController: NavController,
    private hardwareBackButtonService: HardwareBackButtonService
  ) {
    this.previousNavigationUrl = this.router
      .getCurrentNavigation()
      ?.previousNavigation?.finalUrl?.toString();
  }

  ngOnInit(): void {
    this.initListeners();
  }

  public ngOnDestroy(): void {
    if (this.platform.is('capacitor')) {
      this.hardwareBackButton$.unsubscribe();
    }
  }

  public handleBackClick(): void {
    if (this.isCustomHandler) {
      this.onBack.emit();
    } else {
      this.navigateBack();
    }
  }

  public navigateBack(): void {
    if (this.defaultHref) {
      this.navController.navigateBack(this.defaultHref, {
        ...this.navigateOptions,
      });
      return;
    }

    const canGoBackEl = document.querySelector('.can-go-back');

    if (canGoBackEl && this.previousNavigationUrl) {
      this.navController.navigateBack(this.previousNavigationUrl, {
        ...this.navigateOptions,
      });
      return;
    }

    if (!canGoBackEl && this.fallbackHref) {
      this.navController.navigateBack(this.fallbackHref, {
        ...this.navigateOptions,
      });
      return;
    }

    this.navController.back();
  }

  public pop(): void {
    if (document.querySelector('.can-go-back')) {
      this.navController.pop();
    } else {
      this.navigateBack();
    }
  }

  private initListeners(): void {
    this.hardwareBackButtonService.enable$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((enable) => (this.isHardwareBackButtonEnable = enable));

    if (this.platform.is('capacitor')) {
      this.hardwareBackButton$ = this.platform.backButton.subscribeWithPriority(
        10,
        () => {
          if (
            !this.isHardwareBackButtonEnable ||
            this.disabledHardwareBackButton
          ) {
            return;
          }

          const modal = document.querySelector(
            'ion-modal[dismiss-back-button="true"]'
          ) as HTMLIonModalElement;

          if (modal) {
            modal.dismiss(null, 'canceled');
            return;
          }

          this.handleBackClick();
        }
      );
    }
  }
}
