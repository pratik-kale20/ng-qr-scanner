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

  @ViewChild('click') click!: ElementRef;


  public toggleb = <HTMLAudioElement>document.getElementById("popButton");
  subContent: any;

  constructor(private db: AngularFirestore) { }

  async scanSuccessHandler(resultString:String){
    this.qrResult= resultString;
    this.data = firstValueFrom(await this.db.collection('trial').doc('work').get());
    this.data = (await this.data).data()
    console.log(this.data);
    this.subContent.nativeElement.click();

    // this.popup='block'
  }

//   var myModal = document.getElementById('myModal')
// var myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })
  


    
  }


