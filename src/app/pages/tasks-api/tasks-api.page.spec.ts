import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksAPIPage } from './tasks-api.page';

describe('TasksAPIPage', () => {
  let component: TasksAPIPage;
  let fixture: ComponentFixture<TasksAPIPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksAPIPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
