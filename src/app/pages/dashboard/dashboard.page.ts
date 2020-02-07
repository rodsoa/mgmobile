import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private url = 'http://sistema.martinsegagliotti.com.br';
  private token = null;
  public doctor = null;
  public menu = [
    { name: 'Produção em curso', url: '/list-reports', icon: 'cloud-upload'},
    { name: 'Lancamentos', url: '/reports', icon: 'git-branch'},
    { name: 'Documentos', url: '/documents', icon: 'folder'},
    { name: 'NFe', url: '/nfe', icon: 'document'},
    { name: 'Informes', url: '/messages', icon: 'mail'}
  ];
  public hasMessage = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');

    this.http.get(
        this.url + '/api/messages/has-unread',
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          })
        }).subscribe( (response: any) => { this.hasMessage = response; console.log(response); } );
  }

  ionViewDidEnter() {
    this.doctor = JSON.parse( sessionStorage.getItem('user'));
    this.http.get(
      this.url + '/api/messages/has-unread',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        })
      }).subscribe( (response: any) => { this.hasMessage = response; console.log(response); } );
  }

  go(url: string) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

}
