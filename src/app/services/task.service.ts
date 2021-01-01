import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public get getTodoTasks(): Task[] {
    return this.todos;
  }
  public get getInProgressTasks(): Task[] {
    return this.inProgress;
  }
  public get getCompletedTasks(): Task[] {
    return this.completed;
  }

  private todos: Task[] = [
    { taskID: 1, title: 'Aprender Angular' },
    { taskID: 2, title: 'Aprender React' },
    { taskID: 3, title: 'Aprender Vue' },
  ];

  private inProgress: Task[] = [
    { taskID: 4, title: 'Aprender Type Script' },
    { taskID: 5, title: 'Aprender SCSS' },
    { taskID: 6, title: 'Aprender WEbPack' },
  ];

  private completed: Task[] = [
    { taskID: 7, title: 'Aprender HTML' },
    { taskID: 8, title: 'Aprender CSS' },
    { taskID: 9, title: 'Aprender Java Script' },
  ];

  updateTask(taskID: number, value: string): void {
    const allTasks = [...this.todos, ...this.inProgress, ...this.completed];
    const foundedTask = allTasks.find((c) => c.taskID === taskID);
    if (foundedTask === undefined)
      throw new Error('Não existe uma task com esse ID');

    foundedTask.title = value;
  }

  constructor() {}
}
