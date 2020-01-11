import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {

  messageID = null;
  messages: any = [];
  url = 'http://sistema.martinsegagliotti.com.br';
  token = null;

  constructor(
      private activatedRoute: ActivatedRoute,
      private http: HttpClient
  ) {}

  ngOnInit() {
    this.messageID = this.activatedRoute.snapshot.paramMap.get('messageID');

    this.token = sessionStorage.getItem('token');

    this.http.get(
        this.url + '/api/messages/' + this.messageID,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          })
        }).subscribe( (response: any) => { this.messages = response; console.table(this.messages); } );
  }

}
