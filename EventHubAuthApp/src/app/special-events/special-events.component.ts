import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { HttpResponse, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = []
  constructor(private _eventService: EventService, private _router:Router) { }

  ngOnInit() {
    this._eventService.getSpecialEvents()
        .subscribe(res => this.specialEvents = res,
                   err => {
                     if(err instanceof HttpErrorResponse){
                      if(err.status === 401){
                        this._router.navigate(['/login'])
                      }
                     }
                   })
  }

}
