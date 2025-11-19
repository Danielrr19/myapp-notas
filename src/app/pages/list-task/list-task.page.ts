import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Tasks  } from 'src/app/models/tasks'; //Importamos el modelo
import { TasksServiceService } from 'src/app/services/tasks-service.service'; //Importamos el servicio
import { Subscription } from 'rxjs'; //Importamos para manejar las suscripciones
import { Router } from '@angular/router';
import { state } from '@angular/animations';


@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.page.html',
  styleUrls: ['./list-task.page.scss'],
})
export class ListTaskPage implements ViewWillEnter, OnInit, OnDestroy {

  tasks: Tasks[] = []
  isOnline: boolean = true //
  private networkStatusSub!: Subscription

  constructor(private service: TasksServiceService, private router: Router) { }

  ngOnInit(): void {
    this.networkStatusSub = this.service.isOnline$.subscribe(status => {
      this.isOnline = status
    });
  }

  ngOnDestroy(): void {
    if (this.networkStatusSub) {
      this.networkStatusSub.unsubscribe()
    }
  }

  //Metodo para mostrar los detalles por id
  GoToDetails(task: Tasks){
    this.router.navigate([`/details/${task.id}`], {
      state: { task: task }
    })
  }

  //Metodo para realizar la alerta
  private showNetworkAlert(status: boolean){
    const alerEl = document.getElementById('network-alert')
  }

  //Creamos una funcion para obtener las tareas
  async loadTasks() {
    if (this.isOnline) {
    this.tasks = await this.service.getAllTasks()
  }
  }

  ionViewWillEnter (): void {
    this.loadTasks() //Recueda que este hooks se ejecuta "Antes de entrar a la pagina"
  }
    
  //Metodo para completar una tarea (actualizar las tareas para quitar la realizada)
  async completedTasks(id: number){
    if (this.isOnline) {
      await this.service.completedTask(id)
      await this.loadTasks()
  }
  }

  //Metodo para eliminar una tarea
  async deleteTasks(id: number){
    if (this.isOnline) {
      await this.service.deleteTask(id)
      await this.loadTasks()
  }
  }
}
