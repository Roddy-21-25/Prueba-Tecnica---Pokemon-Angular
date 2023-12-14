import { Component, OnInit } from '@angular/core';
import { PokeapiserviceService } from './pokeapiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'pokeapp';

  constructor() {}

  ngOnInit() {
  }
}
