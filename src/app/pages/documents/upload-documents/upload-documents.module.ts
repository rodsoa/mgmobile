import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { IonicModule } from '@ionic/angular';
import { UploadDocumentsPage } from './upload-documents.page';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { HttpClientModule } from '@angular/common/http';
import { FilePath } from '@ionic-native/file-path/ngx';

const routes: Routes = [
  {
    path: '',
    component: UploadDocumentsPage,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, IonicModule, RouterModule.forChild(routes)],
  providers: [ImagePicker, FileChooser, FileTransfer, FilePath, Base64],
  declarations: [UploadDocumentsPage],
})
export class UploadDocumentsPageModule {}
