import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Mode } from 'src/app/models/mode.enum';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Input() backGroundColor: string;
  currentMode: Mode = Mode.Show;
  taskTitleControl: FormControl;
  @ViewChild('myInput') input: ElementRef<HTMLInputElement>;

  constructor(
    private taskService: TaskService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.taskTitleControl = new FormControl(this.task.title, [
      Validators.required,
    ]);
  }

  changeMode(): void {
    this.currentMode = this.currentMode === Mode.Edit ? Mode.Show : Mode.Edit;
    this.changeDetectorRef.detectChanges();
  }

  edit(): void {
    this.changeMode();
    this.input.nativeElement.focus();
    this.input.nativeElement.select();
  }

  save(): void {
    this.taskService.updateTask(this.task.taskID, this.taskTitleControl.value);
    this.changeMode();
  }

  delete(): void {
    this.taskService.deleteTask(this.task.taskID);
  }
}
