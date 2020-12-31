import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent implements OnInit {
  @Input() title: string = '';
  @Input() iconName: string = '';
  @Input() taskList: Task[] = [];
  @Input() taskBgColor: string = '';

  constructor() {}

  ngOnInit(): void {}
}
