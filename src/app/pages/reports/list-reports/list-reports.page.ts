import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.page.html',
  styleUrls: ['./list-reports.page.scss'],
})
export class ListReportsPage implements OnInit {

  url = 'http://sistema.martinsegagliotti.com.br';
  token = null;

  rows = [];
  cols = [];
  selected = [];

  constructor(
    private actionSheetController: ActionSheetController,
    private http: HttpClient
  ) {
    this.cols = [
      { prop: 'status', name: 'Status'},
      { prop: 'type', name: 'Tipo' },
      { prop: 'procedure', name: 'Procedimento' },
      { prop: 'date', name: 'Data'}
    ];
  }

  ngOnInit() {
    this.token = sessionStorage.getItem('token');

    this.http.get(
        this.url + '/api/reports',
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
      this.presentOption( event.row );
    }
  }

  /*
   * ActionSheet de Download do Arquivo.
   */
  async presentOption( { id, name, category } ) {
    const actionSheet = await this.actionSheetController.create({
      header: name,
      buttons: [
        {
          text: 'Visualizar',
          icon: 'code-working',
          handler: () => {
            console.log('View file clicked');
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

}
