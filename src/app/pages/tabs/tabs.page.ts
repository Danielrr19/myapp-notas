import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public appPages = [
    { title: 'Home', url: 'listTask', icon: 'home' },
    { title: 'Create', url: 'createTask', icon: 'paper-plane' },
    { title: 'Completed', url: 'completedTask', icon: 'checkmark' },
    { title: 'Tasks Api', url: 'tasksApi', icon: 'checkmark-done' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
