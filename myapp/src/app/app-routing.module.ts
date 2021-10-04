import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';
const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [{path:'student',component:StudentComponent}]
  },
  {
    path: '',
    component: TeacherComponent,
    children: [{path:'teacher',component:TeacherComponent}]
  },
  {
    path: '',
    component: StudentRegisterComponent,
    children: [{path:'studentregister',component:StudentRegisterComponent}]
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }