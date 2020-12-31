import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'kanban-board';
  todos: Task[] = [
    { title: 'Aprender Angular' },
    { title: 'Aprender React' },
    { title: 'Aprender Vue' },
  ];

  inProgress: Task[] = [
    { title: 'Aprender Type Script' },
    { title: 'Aprender SCSS' },
    { title: 'Aprender WEbPack' },
  ];

  completed: Task[] = [
    { title: 'Aprender HTML' },
    { title: 'Aprender CSS' },
    { title: 'Aprender Java Script' },
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
