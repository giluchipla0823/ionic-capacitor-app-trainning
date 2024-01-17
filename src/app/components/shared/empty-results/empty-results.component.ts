import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-results',
  templateUrl: './empty-results.component.html',
  styleUrls: ['./empty-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyResultsComponent {
  @Input() iconName: string = 'search-outline';
  @Input() message: string;
  @Input() additionalMessage: string;
}
