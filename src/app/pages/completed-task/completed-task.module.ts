import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedTaskPageRoutingModule } from './completed-task-routing.module';

import { CompletedTaskPage } from './completed-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedTaskPageRoutingModule
  ],
  declarations: [CompletedTaskPage]
})
export class CompletedTaskPageModule {}
