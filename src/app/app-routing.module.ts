import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';

const routes: Routes = [

  //Creamos la ruta raiz (principal)
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'listTask',
        pathMatch: 'full'
      },

      {
        path: 'listTask',
        loadChildren: () => import('./pages/list-task/list-task.module').then( m => m.ListTaskPageModule)
      },
      
      {
        path: 'createTask',
        loadChildren: () => import('./pages/create-task/create-task.module').then( m => m.CreateTaskPageModule)
      },

      {
        path: 'completedTask',
        loadChildren: () => import('./pages/completed-task/completed-task.module').then( m => m.CompletedTaskPageModule)
      },

      {
        path: 'tasksApi',
        loadChildren: () => import('./pages/tasks-api/tasks-api.module').then( m => m.TasksAPIPageModule)
      },

      {
        path: 'details/:id',
        loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
      },

    ]
  },
  
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
