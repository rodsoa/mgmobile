import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
