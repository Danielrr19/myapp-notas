import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksAPIPage } from './tasks-api.page';

const routes: Routes = [
  {
    path: '',
    component: TasksAPIPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksAPIPageRoutingModule {}
