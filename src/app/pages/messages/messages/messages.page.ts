import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

interface Message {
  id: any;
  title: any;
  body: any;
  created_at: any;
  updated_at: any;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  url = 'http://sistema.martinsegagliotti.com.br';
  token = null;

  public messages = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.token = sessionStorage.getItem('token');

    this.http.get(
        this.url + '/api/messages',
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          })
        }).subscribe( (response: any) => { this.messages = response; } );
  }

  view( messageID: number ) {
    this.router.navigateByUrl('/view-message/' + messageID);
  }
}
