import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  currentLoading = null;

  constructor(
      public loadingController: LoadingController,
      public httpClient: HttpClient
  ) {}

  async present(message: string = null, duration: number = null) {
    // Dismiss previously created loading
    if (this.currentLoading != null) {
        this.currentLoading.dismiss();
    }

    this.currentLoading = await this.loadingController.create({
        duration: duration,
        message: message
    });

    return await this.currentLoading.present();
  }

  async dismiss() {
    if (this.currentLoading != null) {
      await this.loadingController.dismiss();
      this.currentLoading = null;
    }

    return;
  }
}
