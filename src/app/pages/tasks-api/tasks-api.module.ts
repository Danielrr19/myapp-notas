import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksAPIPageRoutingModule } from './tasks-api-routing.module';

import { TasksAPIPage } from './tasks-api.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksAPIPageRoutingModule
  ],
  declarations: [TasksAPIPage]
})
export class TasksAPIPageModule {}
