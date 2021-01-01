import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TaskComponent } from './components/task/task.component';
@NgModule({
  declarations: [AppComponent, TaskComponent, TaskBoardComponent],
  imports: [
    DragDropModule,
    BrowserModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
