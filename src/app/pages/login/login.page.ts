import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  MenuController
} from '@ionic/angular';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

interface UserForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  url = 'http://sistema.martinsegagliotti.com.br';

  // Verifica se o processo de verificacao esta em andamento
  loading: any;
  isLoading: boolean;
  userForm: UserForm;


  constructor(
      private alertCtrl: AlertController,
      private menuCtrl: MenuController,
      private loadingCtrl: LoadingController,
      private router: Router,
      private http: HttpClient
  ) {
    this.userForm = { email: '', password: '' };
    this.isLoading = false;
  }

  ngOnInit() {}

  ionViewWillEnter(): void {
    this.menuCtrl.enable( false );
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Validando credenciais'
    });

    return await this.loading.present();
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loading.dismiss();
  }

  login(form: NgForm): boolean {
    let token = null;
    let refreshToken = null;
    let user = null;

    this.presentLoading();

    this.http.post(
        this.url + '/oauth/token',
        {
          grant_type: 'password',
          client_id: 2,
          client_secret: 'T9ukUfzPWlXEG5Td2IwJhzeMlUxv2xtnWgoxKZDD',
          username: this.userForm.email,
          password: this.userForm.password
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
    ).subscribe(
        (data: any) => {
                token = data.access_token;
                refreshToken = data.access_token;

                sessionStorage.setItem('token', token);
                sessionStorage.setItem('refresh_token', refreshToken);

                console.log('Token: ' + token);
                console.log('Refresh Token: ' + refreshToken);

                /**
                 * TODO: Refatorar essa parte em um service
                 */
                this.http.get(
                    this.url + '/api/user',
                    {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        })
                    }
                ).subscribe(( userData: any ) => {
                    user = JSON.stringify( userData );
                    sessionStorage.setItem('user', user);
                });

                this.dismissLoading();
                this.router.navigateByUrl('/dashboard');
              },
        (error) => {
                this.userForm.password = null;
                console.log('deu tiuti');
                this.dismissLoading();
              }
        );

    return true;
  }

}
