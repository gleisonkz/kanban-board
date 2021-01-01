import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { TodoStatus } from '../models/todo-status.enum';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskListSource$ = new BehaviorSubject<Task[]>([
    { taskID: 1, title: 'Aprender Angular', status: TodoStatus.Todo },
    { taskID: 2, title: 'Aprender React', status: TodoStatus.Todo },
    { taskID: 3, title: 'Aprender Vue', status: TodoStatus.Todo },
    { taskID: 4, title: 'Aprender Type Script', status: TodoStatus.InProgress },
    { taskID: 5, title: 'Aprender SCSS', status: TodoStatus.InProgress },
    { taskID: 6, title: 'Aprender WEbPack', status: TodoStatus.InProgress },
    { taskID: 7, title: 'Aprender HTML', status: TodoStatus.Completed },
    { taskID: 8, title: 'Aprender CSS', status: TodoStatus.Completed },
    { taskID: 9, title: 'Aprender Java Script', status: TodoStatus.Completed },
  ]);

  taskList$: Observable<Task[]> = this.taskListSource$.asObservable();

  todo$: Observable<Task[]> = this.taskList$.pipe(
    map((tasks: Task[]) =>
      tasks.filter((task: Task) => task.status === TodoStatus.Todo)
    )
  );
  inProgress$: Observable<Task[]> = this.taskList$.pipe(
    map((tasks: Task[]) =>
      tasks.filter((task: Task) => task.status === TodoStatus.InProgress)
    )
  );
  completed$: Observable<Task[]> = this.taskList$.pipe(
    map((tasks: Task[]) =>
      tasks.filter((task: Task) => task.status === TodoStatus.Completed)
    )
  );

  updateTask(taskID: number, value: string): void {
    const foundedTask = this.taskListSource$.value.find(
      (c) => c.taskID === taskID
    );

    if (foundedTask === undefined)
      throw new Error('Não existe uma task com esse ID');

    foundedTask.title = value;
    this.taskListSource$.next(this.taskListSource$.value);
  }

  deleteTask(taskID: number): void {
    const foundedTaskIndex = this.taskListSource$.value
      .map((c) => c.taskID)
      .indexOf(taskID);

    if (foundedTaskIndex === -1)
      throw new Error('Não existe uma task com esse ID');

    this.taskListSource$.value.splice(foundedTaskIndex, 1);
    this.taskListSource$.next(this.taskListSource$.value);
  }

  constructor() {}
}
