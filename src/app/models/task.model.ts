import { TodoStatus } from './todo-status.enum';

export interface Task {
  taskID: number;
  title: string;
  status: TodoStatus;
}
