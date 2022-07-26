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
  success=false;
  fail=false;
  loader=false;
  scanned=false;
  currentDevice : any

  ngOnInit(){

  }

  constructor(private db: AngularFirestore) { }

    async scanSuccessHandler(resultString:String){
    this.loader=true
    this.qrResult= resultString;
    this.hidden=false
    this.data = firstValueFrom(await this.db.collection('trial').doc('invited').get());
    this.data = (await this.data).data()
    this.object = this.data
    this.data = this.data["123_"+this.qrResult]
    if(this.data==undefined){
      console.log("Denied");
      this.hidden=false;
      this.loader=false
      this.fail=true;
      this.scanned=false;
    }
    else if(this.data["accepted"] != "rejected" && this.data["status"]!= "attended" ){
    this.data["attended"] = "true";
    this.data["status"] = "attended"
    this.field = "123_"+this.qrResult
    this.object[this.field] = this.data
    await this.db.collection('trial').doc('invited').update(this.object);
    this.hidden=false;
    this.loader=false
    this.success=true;
    }
    else{
      this.scanned=true;
      this.hidden=false;
      this.loader=false
      this.fail=true;
    }

    }

    goNext(){
      this.hidden=true;
      this.loader=false;
      this.fail=false;
      this.success=false;
    }


    }








