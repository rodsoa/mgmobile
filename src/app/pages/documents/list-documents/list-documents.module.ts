import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import { ListDocumentsPage } from './list-documents.page';
import {HttpClientModule} from '@angular/common/http';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

const routes: Routes = [
  {
    path: '',
    component: ListDocumentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
  ],
  providers: [ AndroidPermissions, File, FileTransfer ],
  declarations: [ListDocumentsPage],
})
export class ListDocumentsPageModule {}
