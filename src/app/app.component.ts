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
  hasdevices: boolean = false;
  availableDevices : MediaDeviceInfo[]=[]
  currentDevice: MediaDeviceInfo | undefined;


  constructor(private db: AngularFirestore) { }



    async scanSuccessHandler(resultString:String){
    this.qrResult= resultString;
    this.hidden=false
    this.data = firstValueFrom(await this.db.collection('trial').doc('invited').get());
    this.data = (await this.data).data()
    this.object = this.data
    this.data = this.data["123_"+this.qrResult]
    this.data["attended"] = "true";
    this.data["status"] = "attended"
    this.field = "123_"+this.qrResult
    this.object[this.field] = this.data
    await this.db.collection('trial').doc('invited').update(this.object);
    document.getElementById("popButton")!.click();
    }

    scannerEvent(){
      this.hidden=true
    }

    ngOnInit():void{
      this.scanner.camerasFound.subscribe((devices:MediaDeviceInfo[])=>{this.hasdevices=true
      this.availableDevices=devices});

      this.scanner.camerasNotFound.subscribe(()=>this.hasdevices=false);
      // this.scanner.scanComplete.subscribe((result:Result)=>this.qrResult=result);
    }

    onDeviceSelectChange(selectedValue: string) {
      console.debug('Selection changed: ', selectedValue);
      // this.currentDevice = this.scanner.getDeviceById(selectedValue);
      this.currentDevice=this.availableDevices.find(x => x.deviceId === selectedValue);
    }

    }








