import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.page.html',
  styleUrls: ['./list-documents.page.scss'],
})
export class ListDocumentsPage implements OnInit {

  url = 'http://sistema.martinsegagliotti.com.br';
  token = null;

  rows = [];
  cols = [];
  selected = [];

  constructor(
    private actionSheetController: ActionSheetController,
    private androidPermissions: AndroidPermissions,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private transfer: FileTransfer, 
    private file: File
  ) {
    this.cols = [
      { prop: 'id', name: 'ID', width: 50},
      { prop: 'category', name: 'Tipo', width: 40 },
      { prop: 'name', name: 'Documento' }
    ];
  }

  ngOnInit() {
    this.token = sessionStorage.getItem('token');

    this.http.get(
        this.url + '/api/files',
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          })
        }).subscribe( (response: any) => { this.rows = response; } );
  }

  /**
   * Handle do Evento ACTIVATE NGX-DATATABLE
   */
  onActivate( event ) {
    if ( event.type == 'click' ) {
      console.log( event.row );
      this.presentFileDownloadOption( event.row );
    }
  }

  /*
   * ActionSheet de Download do Arquivo.
   */
  async presentFileDownloadOption( { id, name, category } ) {
    const actionSheet = await this.actionSheetController.create({
      header: name,
      buttons: [
        {
          text: 'Download',
          icon: 'download',
          handler: () => {
            this.getPermission(id, category);
            console.log('Download file clicked');
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async download( id: any, category: any ) {
    const endpoint = `${this.url}/api/files/${id}/download`;
    const name = `${id}.pdf`;
    const fileTransfer: FileTransferObject = this.transfer.create();
    await fileTransfer.download(endpoint, this.file.externalRootDirectory + '/Download/' + name, false,
        {
          headers: {
            "Authorization": `Bearer ${this.token}`
          }
        }).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      console.log(endpoint);
      this.successAlert(name, entry)
    }, (error) => {
      console.log(endpoint);
      console.log(error);
      this.failAlert();
    });
  }

  getPermission(id: any, category: any) {
    this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      .then(status => {
        if (status.hasPermission) {
          this.download(id, category);
        } 
        else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
            .then(status => {
              if(status.hasPermission) {
                this.download(id, category);
              }
            });
        }
      });
    }

  async successAlert(name:any , entry: any) {
    const alertSuccess = await this.alertCtrl.create({
      header: `Download Realizado!`,
      subHeader: `Arquivo ${name} foi transferido para: ${entry.toURL()}`,
      buttons: ['Ok']
    });

    await alertSuccess.present();
  }

  async failAlert() {
    const alertFail = await this.alertCtrl.create({
      header: `Download Falhou!`,
      subHeader: `Ocorreu um erro no processamento do pedido. Tente novamente em alguns instantes`,
      buttons: ['Ok']
    });

    await alertFail.present();
  }

}

