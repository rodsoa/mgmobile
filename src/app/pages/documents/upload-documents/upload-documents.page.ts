import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.page.html',
  styleUrls: ['./upload-documents.page.scss'],
})
export class UploadDocumentsPage implements OnInit {

  imageResponse: any;
  options: any;

  constructor(
    public loadingController: LoadingController,
    private router: Router,
    private imagePicker: ImagePicker
  ) { }

  ngOnInit() {
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
        this.imageResponse = 'data:image/jpeg;base64,' + results[i];
      }
    }, (err) => {
      alert(err);
    });
  }

  submit(): void {
    this.presentLoading();
    setTimeout(() => {
      this.loadingController.dismiss();
      this.router.navigateByUrl('/dashboard');
    }, 2000);
  }
}
