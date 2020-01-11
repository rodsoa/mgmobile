import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { IonicModule } from '@ionic/angular';

import { UploadDocumentsPage } from './upload-documents.page';

const routes: Routes = [
  {
    path: '',
    component: UploadDocumentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ImagePicker
  ],
  declarations: [UploadDocumentsPage]
})
export class UploadDocumentsPageModule {}
