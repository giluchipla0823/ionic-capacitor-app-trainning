import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges, AfterViewInit {
  @Input('appHighlight') searchTerm: string;
  @Input() caseSensitive = false;
  @Input() customClasses = '';

  constructor(private el: ElementRef, private domSanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    this.checkHighlight();
  }

  ngAfterViewInit(): void {
    this.checkHighlight();
  }

  private checkHighlight(): void {
    if (this.el?.nativeElement) {
      const el = this.el.nativeElement as HTMLElement;

      const text = el.textContent;

      if (!text) {
        return;
      }

      if (this.searchTerm === '') {
        el.innerHTML = text;
      } else {
        const regex = new RegExp(
          this.searchTerm,
          this.caseSensitive ? 'g' : 'gi'
        );

        const newText = text.replace(regex, (match: string) => {
          return `<mark class="highlight ${this.customClasses}">${match}</mark>`;
        });

        const sanitzed = this.domSanitizer.sanitize(
          SecurityContext.HTML,
          newText
        );

        el.innerHTML = sanitzed;
      }
    }
  }
}
