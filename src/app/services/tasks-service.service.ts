import { Injectable } from '@angular/core';
import { Tasks } from '../models/tasks';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {

  tasks: Tasks[] = []
  tasksCompleted: Tasks[] = []
  private isOnlineSubject = new BehaviorSubject<boolean>(true)
  isOnline$ = this.isOnlineSubject.asObservable()

  constructor(private storage: Storage) {
    this.initStorage()
    this.monitorNetwork()
  }
  
  private async initStorage(){
    await this.storage.create()
    await this.loadTasks() // ✅ Agregamos await
  }

  private monitorNetwork(){
    Network.addListener('networkStatusChange', status =>{
      this.isOnlineSubject.next(status.connected)
      console.log(`Network status changed: ${status.connected ? 'online' : 'offline'}`);
    })

    this.checkInitialNetworkStatus()
  }

  private async checkInitialNetworkStatus(){
    const status = await Network.getStatus()
    this.isOnlineSubject.next(status.connected)
  }

  private async loadTasks(){
    const storageTasks = await this.storage.get('tasks')
    const storageTasksCompleted = await this.storage.get('tasksCompleted')
    this.tasks = storageTasks || []
    this.tasksCompleted = storageTasksCompleted || []
  }

  // ✅ NUEVO: Método para generar ID único
  private getNextId(): number {
    if (this.tasks.length === 0) {
      return 1;
    }
    const maxId = Math.max(...this.tasks.map(task => task.id));
    return maxId + 1;
  }

  async getAllTasks(): Promise<Tasks[]>{
    // ✅ Recargar desde storage antes de retornar
    await this.loadTasks()
    return this.tasks
  }

  async getCompletedTasks(): Promise<Tasks[]>{
    await this.loadTasks()
    return this.tasksCompleted
  }

  // ✅ MODIFICADO: Ahora el servicio asigna el ID
  async addTask(newTask: Omit<Tasks, 'id'>): Promise<void>{
    const taskWithId: Tasks = {
      ...newTask,
      id: this.getNextId() // ✅ El servicio asigna el ID automáticamente
    }
    this.tasks.push(taskWithId)
    await this.storage.set('tasks', this.tasks)
    console.log('✅ Tarea agregada:', taskWithId);
  }

  async deleteTask(id: number): Promise<void>{
    this.tasks = this.tasks.filter(task=> task.id !== id)
    await this.storage.set('tasks', this.tasks)
  }
  
  private updateTasksCompleted(task: Tasks){
    if(task.completed){
      if(!this.tasksCompleted.find(t=> t.id === task.id)){
        this.tasksCompleted.push(task)
      }
    }else{
      this.tasksCompleted = this.tasksCompleted.filter(t=> t.id !== task.id)
    }
  }

  async completedTask(id:number): Promise<void>{ 
    const task = this.tasks.find(task=> task.id === id)
    if(task){
      task.completed = !task.completed
      this.updateTasksCompleted(task)
      await this.storage.set('tasks', this.tasks)
      await this.storage.set('tasksCompleted', this.tasksCompleted)
    }
  }

  async addTasksCompleted(taskCompleted: Tasks): Promise<void>{
    if(taskCompleted.completed && !this.tasksCompleted.find(t=> t.id === taskCompleted.id)){
      this.tasksCompleted.push(taskCompleted)
      await this.storage.set('tasksCompleted', this.tasksCompleted)
    }
  }

  async selectPhoto(): Promise<string | undefined> {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Photos,
        resultType: CameraResultType.Base64,
      });

      const base64Data = `data:image/jpeg;base64,${photo.base64String}`;
      return base64Data;
    } catch (error) {
      console.error("ERROR: ", error);
      return undefined;
    }
  }
}