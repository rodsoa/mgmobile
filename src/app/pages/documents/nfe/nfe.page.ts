import { Component, OnInit } from '@angular/core';
import {ActionSheetController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FileUploadOptions, FileTransferObject, FileTransfer} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-nfe',
  templateUrl: './nfe.page.html',
  styleUrls: ['./nfe.page.scss'],
})
export class NfePage implements OnInit {

  url = 'http://sistema.martinsegagliotti.com.br';
  token = null;

  rows = [];
  cols = [];
  selected = [];

  constructor(
      private actionSheetController: ActionSheetController,
      private http: HttpClient,
      private transfer: FileTransfer,
      public file: File
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
        this.url + '/api/files?type=NFE',
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
    if ( event.type === 'click' ) {
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
            this.download(id, category);
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

  download( id: any, category: any ) {
    const endpoint = `${this.url}/${id}/download`;
    const name = `${category}-${id}`;
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(endpoint, this.file.dataDirectory + name, false,
        {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        }).then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }

}
