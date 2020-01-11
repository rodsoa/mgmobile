import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import { IonicModule } from '@ionic/angular';

import { NfePage } from './nfe.page';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: NfePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    File,
    FileTransfer
  ],
  declarations: [NfePage]
})
export class NfePageModule {}
