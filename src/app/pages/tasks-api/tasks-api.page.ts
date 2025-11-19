import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TaksAPIService } from 'src/app/services/taks-api.service';

@Component({
  selector: 'app-tasks-api',
  templateUrl: './tasks-api.page.html',
  styleUrls: ['./tasks-api.page.scss'],
})
export class TasksAPIPage implements OnInit {

  //Creamos el arreglo
  tasks: any[] = []
  errorMessage: string | null = null //Para mostrar errores
  isLoading: boolean = false; //Para indicar que se está cargando

  page: number = 1; //Creamos la nuevas variables
  limit: number = 10;
  finish: boolean = false;

  //Inyectamos los valores
  constructor(private apiService: TaksAPIService, private loadingController: LoadingController ) { }

  ionViewDidEnter(){
    this.loadTask()
  } 

  ngOnInit() {
    this.loadTask()
  }

  //Creamos el metodo para cargar las tareas
  async loadTask(): Promise<void> {

    if(this.isLoading) return; //Asegurarnos que retorne un valor verdadero
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando tareas...',
      spinner: 'crescent',
      duration: 5000
    });

    await loading.present();

    this.apiService.getAllTasks(this.page, this.limit).subscribe({
      next: (data) => {
        this.tasks = data;
        this.isLoading = false;
        loading.dismiss();
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
        loading.dismiss();
      }
    });

  }



  goToNextPage() {
    this.page++
    if(this.page >= 20){
      this.finish = true;
    }

    this.loadTask()
  }

  goToPreviousPage() {
    if(this.page > 1){
      this.page--;
      this.loadTask()
    }
  }

}

  