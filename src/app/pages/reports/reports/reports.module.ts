import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { IonicModule } from '@ionic/angular';

import { ReportsPage } from './reports.page';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: ReportsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ImagePicker
  ],
  declarations: [ReportsPage]
})
export class ReportsPageModule {}
