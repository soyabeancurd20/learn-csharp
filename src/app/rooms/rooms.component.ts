import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked{

    hotelName = 'Hilton Hotel'

    numberOfRooms = 10;

    hideRooms = true;

  selectedRoom!: RoomList;

    rooms : Room = {
      totalRooms: 20,
      availableRooms: 10,
      bookedRooms: 5,

    }

  title = 'Room List'

  roomList: RoomList[] = [];

  stream = new Observable<string>(observer =>{
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    //observer.error('error');
  })

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

    @ViewChildren(HeaderComponent)headerChildrenComponent!: QueryList<HeaderComponent>;

    //roomService = new RoomsService();

    error: string = '';
    
    totalBytes = 0;

    subscription ?: Subscription;

    error$ =new Subject<string>;

    getError$ = this.error$.asObservable();

    rooms$ = this.roomsService.getRooms$.pipe(
      catchError((err)=>{
        //console.log(err);
        this.error$.next(err.message);
        return of([]);
      })
    );

    roomsCount$ = this.roomsService.getRooms$.pipe(
      map((rooms) => rooms.length)
    );

    constructor(@SkipSelf() private roomsService: RoomsService){}


    ngOnInit():void{

      this.roomsService.getPhotos().subscribe((event)=>{
        switch(event.type){
          case HttpEventType.Sent:{
            console.log('Request has been made!');
            break
          }
          case HttpEventType.ResponseHeader:{
            console.log('Response success!');
            break
          }
          case HttpEventType.DownloadProgress:{
            this.totalBytes += event.loaded;
            break
          }
          case HttpEventType. Response:{
            console.log(event.body);
          }
        }
      })
      this.stream.subscribe({
        next: (value) => console.log(value),
        complete: ()=> console.log('complete'),
        error: (err)=> console.log(err),   
      });
      this.stream.subscribe((data)=>console.log(data));
      //this.roomsService.getRooms$.subscribe(rooms=>{
        //this.roomList = rooms;
      //});
    }


    ngDoCheck(): void {
        console.log('on change is called');
    }

    ngAfterViewInit(): void {
      this.headerComponent.title = "Rooms View";

      console.log(this.headerChildrenComponent.last.title ="Last Title");
      //this.headerChildrenComponent.get(0).title ="First Title";
    }

    ngAfterViewChecked(): void {
        
    }

    toggle(){
      this.hideRooms = !this.hideRooms;
      this.title = "Rooms List";
    }


    selectRoom(room: RoomList){
    this.selectedRoom =room;
    }

  addRoom(){
    const room: RoomList ={
     // roomNumber: '4',
      roomType: 'Econo Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 300,
      photos: 'https://media.architecturaldigest.com/photos/67901a12a063ae0fb541860b/16:9/w_6432,h_3618,c_limit/@Garruppo%20Small%20Bedroom%20Shot%202.jpg',
      checkinTime: new Date('20-Nov-2025'),
      checkoutTime: new Date('21-Nov-2025'),
      rating: 4.45
    };
    
   // this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    })
    
  }
  
  editRoom(){
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Econo Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 300,
      photos: 'https://media.architecturaldigest.com/photos/67901a12a063ae0fb541860b/16:9/w_6432,h_3618,c_limit/@Garruppo%20Small%20Bedroom%20Shot%202.jpg',
      checkinTime: new Date('20-Nov-2025'),
      checkoutTime: new Date('21-Nov-2025'),
      rating: 4.45
    };

    this.roomsService.editRoom(room).subscribe((data)=>{
      this.roomList = data;
    });
  }

  deleteRoom(){
    this.roomsService.delete('3').subscribe((data)=>{
      this.roomList = data;
    })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe(); 
    }
  }
  
}




