import { Component } from '@angular/core';
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
  data: any;

  constructor(private db: AngularFirestore) { }

  async scanSuccessHandler(resultString:String){
    this.qrResult= resultString;
    this.data = firstValueFrom(await this.db.collection('trial').doc('work').get());
    this.data = (await this.data).data()
    console.log(this.data);
  }

}
