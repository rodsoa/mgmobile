import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListReportsPage } from './list-reports.page';

const routes: Routes = [
  {
    path: '',
    component: ListReportsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxDatatableModule
  ],
  declarations: [ListReportsPage]
})
export class ListReportsPageModule {}
