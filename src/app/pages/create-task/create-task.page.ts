import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksServiceService } from 'src/app/services/tasks-service.service';
import { Tasks } from 'src/app/models/tasks';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit, OnDestroy {

  titleTask: string = '';
  private networkStatusSub!: Subscription;
  photoUrl?: string;
  isOnline: boolean = true;

  constructor(private service: TasksServiceService) { }

  ngOnInit(): void {
    this.networkStatusSub = this.service.isOnline$.subscribe(status => {
      this.isOnline = status;
    });
  }

  ngOnDestroy(): void {
    if (this.networkStatusSub) {
      this.networkStatusSub.unsubscribe();
    }
  }

  async addTasksFunction() {
    if (this.titleTask.trim() !== '' && this.isOnline) {
      const newTask = {
        name: this.titleTask,
        completed: false,
        photoUrl: this.photoUrl
      };
      
      await this.service.addTask(newTask); // ✅ Ya no necesitas pasar el ID
      
      // Limpiar el formulario
      this.titleTask = '';
      this.photoUrl = undefined;
      
      console.log('✅ Tarea creada exitosamente');
    }
  }

  async selectPhoto() {
    const photoPath = await this.service.selectPhoto();
    if (photoPath) {
      this.photoUrl = photoPath;
      console.log('✅ Foto seleccionada');
    } else {
      console.log('❌ No hay foto seleccionada');
    }
  }
}