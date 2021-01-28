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
    { taskID: 1, title: 'Aprender Angular', status: 'todo' },
    { taskID: 2, title: 'Aprender React', status: 'todo' },
    { taskID: 3, title: 'Aprender Vue', status: 'todo' },
    { taskID: 4, title: 'Aprender Type Script', status: 'inProgress' },
    { taskID: 5, title: 'Aprender SCSS', status: 'inProgress' },
    { taskID: 6, title: 'Aprender WEbPack', status: 'inProgress' },
    { taskID: 7, title: 'Aprender HTML', status: 'completed' },
    { taskID: 8, title: 'Aprender CSS', status: 'completed' },
    { taskID: 9, title: 'Aprender Java Script', status: 'completed' },
  ]);

  taskList$: Observable<Task[]> = this.taskListSource$.asObservable();

  todo$: Observable<Task[]> = this.taskList$.pipe(
    map((tasks: Task[]) => tasks.filter((task: Task) => task.status === 'todo'))
  );
  inProgress$: Observable<Task[]> = this.taskList$.pipe(
    map((tasks: Task[]) =>
      tasks.filter((task: Task) => task.status === 'inProgress')
    )
  );
  completed$: Observable<Task[]> = this.taskList$.pipe(
    map((tasks: Task[]) =>
      tasks.filter((task: Task) => task.status === 'completed')
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

  updateTaskStatus(taskID: number, status: TodoStatus): void {
    const foundedTask = this.taskListSource$.value.find(
      (c) => c.taskID === taskID
    );

    if (foundedTask === undefined)
      throw new Error('Não existe uma task com esse ID');

    foundedTask.status = status;
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
