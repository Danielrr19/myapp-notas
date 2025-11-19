import { Component, OnInit } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { Tasks } from 'src/app/models/tasks'; //Importa el MODELO
import { TasksServiceService } from 'src/app/services/tasks-service.service'; //Importamos el SERVICIO

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.page.html',
  styleUrls: ['./completed-task.page.scss'],
})
export class CompletedTaskPage implements ViewDidEnter {

  //Agregamos el nuevo arreglo
  tasksCompleted: Tasks[] = [];

  //Inyectamos el servivio de tareas en el constructor para poder acceder a sus metodos
  constructor(private service: TasksServiceService) { }

  //Aqui se carga la lista actualizda de tareas cada vez que el usuario entra la pagina
  ionViewDidEnter(): void {
    this.loadTasksCompleted()
  }

  //Metodo que obtiene todas las tareas completadas desde el servicio
  async loadTasksCompleted(){
    this.tasksCompleted = await this.service.getCompletedTasks()
  }
}
