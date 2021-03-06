import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  public adress: string;
  public lat: number;
  public lng: number;
  public zoom: number;
  public name: string;

  constructor(private _mapService: MapService,
    public _toastr: ToastrService) {
  }

  ngOnInit() {
    this.lat = 50.8660773;
    this.lng = 20.6285676;
    this.zoom = 15;
  }

  onMapRightClick($event) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;

  }

  searchButtonOnClick() {
    this._mapService.getCoordsByAdress(this.adress)
      .subscribe(data => {
        if (data !== undefined) {
          if (data.results[0] !== undefined) {
            this.lat = data.results[0].geometry.location.lat;
            this.lng = data.results[0].geometry.location.lng;
            this.name = data.results[0].formatted_address;
          } else {
            setTimeout(() => this._toastr.error('Nie odnaleziono lokalizacji', 'Błąd!'));
          }
        }
      });
  }
}
