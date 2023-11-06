import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import { Observable } from 'rxjs';
import {map} from "rxjs/operators";








@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  welcomeMessages: string[] = [];
  convertedTimes: string = '';


  constructor(private httpClient:HttpClient){}

  private baseURL:string='http://localhost:8080';

  private getUrl:string = this.baseURL + '/room/reservation/v1/';
  private postUrl:string = this.baseURL + '/room/reservation/v1';
  public submitted!:boolean;
  roomsearch! : FormGroup;
  rooms! : Room[];
  request!:ReserveRoomRequest;
  currentCheckInVal!:string;
  currentCheckOutVal!:string;

  ngOnInit() {
    //Fetch converted times
    this.fetchConvertedTimes();
    // Make an HTTP GET request to fetch welcome messages
    this.httpClient.get<string[]>('http://localhost:8080/welcome').subscribe(
      (data: string[]) => {
        this.welcomeMessages = data;
      },
      error => {
        console.error('Error fetching welcome messages:', error);
      }
    );

    this.roomsearch = new FormGroup({
      checkin: new FormControl(' '),
      checkout: new FormControl(' ')
    });

    const roomsearchValueChanges$ = this.roomsearch.valueChanges;

    // subscribe to the stream
    roomsearchValueChanges$.subscribe(x => {
      this.currentCheckInVal = x.checkin;
      this.currentCheckOutVal = x.checkout;
    });
  }
  fetchConvertedTimes() {
    this.httpClient.get('http://localhost:8080/converted-times', { responseType: 'text' })
      .subscribe(
        (data: string) => {
          this.convertedTimes = data;
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching converted times:', error);
        }
      );
  }


  onSubmit({ value, valid }: { value: Roomsearch, valid: boolean }) {
    this.getAll().subscribe(
      rooms => {
        console.log(Object.values(rooms)[0]);
        this.rooms = <Room[]>Object.values(rooms)[0];
        // Calculate crude conversion for priceCAD and priceEUR
        this.rooms.forEach(room => {
          room.priceCAD = (parseFloat(room.price) * 1.3).toFixed(2); // Conversion rate for CAD
          room.priceEUR = (parseFloat(room.price) * 0.9).toFixed(2); // Conversion rate for EUR
        });
      },
      error => {
        console.error('Error fetching rooms:', error);
      }
    );
  }

    reserveRoom(value:string){
      this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);

      this.createReservation(this.request);
    }
    createReservation(body:ReserveRoomRequest) {
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
     // let options = new RequestOptions({headers: headers}); // Create a request option

     const options = {
      headers: new HttpHeaders().append('key', 'value'),

    }

      this.httpClient.post(this.postUrl, body, options)
        .subscribe(res => console.log(res));
    }

  /*mapRoom(response:HttpResponse<any>): Room[]{
    return response.body;
  }*/

    getAll(): Observable<any> {


       return this.httpClient.get(this.baseURL + '/room/reservation/v1?checkin='+ this.currentCheckInVal + '&checkout='+this.currentCheckOutVal, {responseType: 'json'});
    }

  }



export interface Roomsearch{
    checkin:string;
    checkout:string;
  }




export interface Room{
  id:string;
  roomNumber:string;
  price:string;
  links:string;
  priceCAD?: string; // Add priceCAD variable to the Room interface
  priceEUR?: string; // Add priceEUR variable to the Room interface

}
export class ReserveRoomRequest {
  roomId:string;
  checkin:string;
  checkout:string;

  constructor(roomId:string,
              checkin:string,
              checkout:string) {

    this.roomId = roomId;
    this.checkin = checkin;
    this.checkout = checkout;
  }
}

/*
var ROOMS: Room[]=[
  {
  "id": "13932123",
  "roomNumber" : "409",
  "price" :"20",
  "links" : ""
},
{
  "id": "139324444",
  "roomNumber" : "509",
  "price" :"30",
  "links" : ""
},
{
  "id": "139324888",
  "roomNumber" : "609",
  "price" :"40",
  "links" : ""
}
] */

