import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qr-scanner';
  qrResult:any
  // popup='none';
  data: any;
  field: any;
  object:any;




  constructor(private db: AngularFirestore) { }

  async scanSuccessHandler(resultString:String){
    this.qrResult= resultString;
    this.data = firstValueFrom(await this.db.collection('trial').doc('invited').get());
    this.data = (await this.data).data()
    this.object = this.data
    console.log();
    this.data = this.data["123_"+this.qrResult]
    this.data["attended"] = "true";
    this.data["status"] = "attended"
    this.field = "123_"+this.qrResult
    this.object[this.field] = this.data
    await this.db.collection('trial').doc('invited').update(this.object);
    document.getElementById("popButton")!.click();

    // this.popup='block'
  }

//   var myModal = document.getElementById('myModal')
// var myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })




  }


