import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileTransferObject, FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.page.html',
  styleUrls: ['./upload-documents.page.scss'],
})
export class UploadDocumentsPage implements OnInit {
  url = 'http://sistema.martinsegagliotti.com.br';
  token = null;

  imageResponse: any;
  uriData: any;
  options: any;

  fileName: string;

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private imagePicker: ImagePicker,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private transfer: FileTransfer,
    private http: HttpClient,
    private base64: Base64
  ) {}

  ngOnInit() {
    this.token = sessionStorage.getItem('token');
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Processando dados...',
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
      outputType: 1,
    };

    this.imageResponse = [];

    this.imagePicker.getPictures(this.options).then(
      (results) => {
        for (var i = 0; i < results.length; i++) {
          this.imageResponse = 'data:image/jpeg;base64,' + results[i];
        }
      },
      (err) => {
        alert(err);
      }
    );
  }

  selectDocument() {
    this.uriData = [];
    this.fileChooser.open().then(
      (uri) => {
        this.filePath
          .resolveNativePath(uri)
          .then((filePath) => {
            console.log(filePath);
            this.base64.encodeFile(filePath).then(
              (base64File: string) => {
                console.log(base64File);
                this.uriData = base64File;
              },
              (err) => {
                console.log(err);
              }
            );
          })
          .catch((err) => console.log(err));
      },
      (err) => {
        console.log(err);
        alert(err);
      }
    );
  }

  upload() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const options: FileUploadOptions = {
      // The name of the form element.(optional)
      fileKey: 'doctor_document',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      // The file name to use when saving the file on the server(optional)
      fileName: this.fileName,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
    };

    this.http.post(this.url + '/api/files/upload', { doctor_document: this.uriData }, options).subscribe(
      (data) => {
        this.loadingController.dismiss();
      },
      (err) => {
        this.loadingController.dismiss();
      }
    );
  }

  submit(): void {
    this.presentLoading();
    this.upload();
  }
}
