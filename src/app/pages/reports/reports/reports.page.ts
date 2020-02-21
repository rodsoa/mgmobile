import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-list-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  url = 'http://sistema.martinsegagliotti.com.br';
  token = null;

  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];
  customPickerOptions: any;

  procedures: any;
  doctors: any;
  hospitals: any;

  types: [
    {value: 'plt', name: 'Plantão'},
    {value: 'cirps', name: 'Cirurgias P.S'},
    {value: 'cirel', name: 'Cirurgias Eletivas'},
    {value: 'plt', name: 'Ambulatório'}
  ];

  reportDate: null;
  reportType: null;
  reportHospital: null;
  reportPacient: null;
  reportPacientNumber: null;
  reportImages: any;

  plt: any = {carga: null, hour: null, period: null};
  cir: any = {procedure: null, description: null, team: null, images: null};
  amb: any = {
    calls: null,
    consultations: null,
    anothers: null,
    visits: null,
    medical_care: null,
    inter_consultations: null,
    minor_surgeries: null,
    urodynamic: null,
    prostate_biopsy: null,
    night_assessment: null,
    pediatric_surgery: null,
  };

  imageResponse: any;
  options: any;

  constructor(
    public loadingController: LoadingController,
    private router: Router,
    private imagePicker: ImagePicker,
    private http: HttpClient,
  ) {
    this.customPickerOptions = {
      buttons: [{
        text: 'Save',
        handler: () => console.log('Clicked Save!')
      }, {
        text: 'Log',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    };
  }

  ngOnInit() {
    this.token = sessionStorage.getItem('token');

    this.http.get(
      this.url + '/api/hospitals',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        })
      }).subscribe( (response: any) => { this.hospitals = response; console.log( this.hospitals ); } );

    this.http.get(
        this.url + '/api/doctors',
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          })
        }).subscribe( (response: any) => { this.doctors = response; console.log( this.doctors ); } );

    this.http.get(
        this.url + '/api/procedures',
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          })
        }).subscribe( (response: any) => { this.procedures = response; console.log( this.procedures ); } );
  }

  ionViewWillEnter() {
    this.http.get(
        this.url + '/api/doctors',
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          })
        }).subscribe( (response: any) => { this.doctors = response; console.log( this.doctors ); } );

    this.http.get(
        this.url + '/api/procedures',
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          })
        }).subscribe( (response: any) => { this.procedures = response; console.log( this.procedures ); } );

    this.http.get(
          this.url + '/api/reports',
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.token
            })
          }).subscribe( (response: any) => { console.table( response ); } );
  }

  ionViewDidEnter() {

  }

  onChangeTeam(e) {
    if (this.cir.team.length > 3 ) {
      alert("Selecione apenas 3 integrantes para a equipe!");
      this.cir.team = [];
      e.target.value = null;
    }

    console.log(this.cir.team)
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Processando dados...'
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  getImages() {

    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      // maximumImagesCount: 3,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 200,
      // height: 200,

      // quality of resized image, defaults to 100
      quality: 45,

      // output type, defaults to FILE_URIs.
      // available options are
      // window.imagePicker.OutputType.FILE_URI (0) or 
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };

    this.imageResponse = [];

    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }

      this.cir.images = this.imageResponse;
    }, (err) => {
      alert(err);
    });
  }

  submitReport(): void {
    this.presentLoading();

    this.http.post(
        this.url + '/api/reports',
        {
          date: this.reportDate,
          type: this.reportType,
          hospital: this.reportHospital,
          pacient: this.reportPacient,
          number: this.reportPacientNumber,
          plt: this.plt,
          amb: this.amb,
          cir: this.cir
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          })
        }).subscribe( (response: any) => { console.table( response ); } );
    setTimeout(() => {
      this.loadingController.dismiss();
      this.router.navigateByUrl('/dashboard');
    }, 2000);
  }

}
