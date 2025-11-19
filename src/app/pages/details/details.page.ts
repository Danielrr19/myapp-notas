import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tasks } from 'src/app/models/tasks'; // Ajusta la ruta según tu proyecto
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  task: Tasks | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Obtener la tarea desde los parámetros de navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.task = navigation.extras.state['task'];
    }
  }

  editTask() {
    console.log('Editar tarea:', this.task);
    // Navegar a la página de edición si la tienes
    // this.router.navigate(['/edit-task'], { state: { task: this.task } });
  }

  async deleteTask() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            console.log('Tarea eliminada:', this.task);
            // Aquí implementarías la lógica para eliminar de tu servicio
            this.router.navigate(['/listTask']);
          }
        }
      ]
    });

    await alert.present();
  }
}