import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Post } from '@config/interfaces/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  @Output() details = new EventEmitter<number>();
  @Input() posts: Array<Post> = [];

  @HostListener('click', ['$event']) handlerClick(event: Event) {
    event.stopPropagation();

    const node = event
      .composedPath()
      .find(
        (n: HTMLElement) => n.dataset && 'referenceId' in n.dataset
      ) as HTMLElement;

    if (node) {
      this.details.emit(Number(node.dataset.referenceId));
    }
  }

  trackByItems(index: number, item: Post): number {
    return item.id;
  }
}
