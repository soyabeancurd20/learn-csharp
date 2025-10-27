import { AfterViewInit, Component, ElementRef, Inject, inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import {RoomsComponent} from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import{localStorageToken} from'./localstorage.token'

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'hotelinventoryapp';

  @ViewChild('name', { static: true }) name!: ElementRef;

constructor(@Optional() private loggerService: LoggerService,
  @Inject(localStorageToken) private localStorage: Storage) {

}

  ngOnInit(): void {
    this.loggerService?.log('AppComponent.ngOnInit()');
      this.name.nativeElement.innerText = "Hilton Hotel";

    this.localStorage.setItem('name','Hilton Hotel');
  }



 // @ViewChild('user',{read: ViewContainerRef}) vcr!: ViewContainerRef;

 // ngAfterViewInit() {
   // const componentRef = this.vcr.createComponent(RoomsComponent);
   // componentRef.instance.numberOfRooms = 50;
  //}
}


