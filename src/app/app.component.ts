import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Task } from './models/task.model';
import { TodoStatus } from './models/todo-status.enum';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kanban-board';
  todos: Task[];
  inProgress: Task[];
  completed: Task[];
  status: TodoStatus;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.todo$.subscribe((tasks: Task[]) => (this.todos = tasks));
    this.taskService.inProgress$.subscribe(
      (tasks: Task[]) => (this.inProgress = tasks)
    );
    this.taskService.completed$.subscribe(
      (tasks: Task[]) => (this.completed = tasks)
    );
  }

  drop(event: CdkDragDrop<Task[]>, title: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log(title);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
