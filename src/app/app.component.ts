import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('scanner')
  scanner!:ZXingScannerComponent

  title = 'qr-scanner';
  qrResult:any
  data: any;
  field: any;
  object:any;
  hidden=true

  ngOnInit(){
    this.getCameraSelection();
  }

  constructor(private db: AngularFirestore) { }

    async scanSuccessHandler(resultString:String){
    this.qrResult= resultString;
    this.hidden=false
    this.data = firstValueFrom(await this.db.collection('trial').doc('invited').get());
    this.data = (await this.data).data()
    this.object = this.data
    this.data = this.data["123_"+this.qrResult]
    if(this.data==undefined){
      console.log("Denied");
      document.getElementById("denyButton")!.click();
    }
    else if(this.data["accepted"] != "rejected"){
    // this.data["attended"] = "true";
    // this.data["status"] = "attended"
    this.field = "123_"+this.qrResult
    this.object[this.field] = this.data
    await this.db.collection('trial').doc('invited').update(this.object);
    document.getElementById("popButton")!.click();
    }
    else{
      document.getElementById("denyButton")!.click();
    }

    }

    getCameraSelection = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      const options = videoDevices.map(videoDevice => {
        return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
      });
      document.querySelector('.video-options>select')!.innerHTML = options.join('');
    };
    scannerEvent(){
      this.hidden=true
    }

    }








