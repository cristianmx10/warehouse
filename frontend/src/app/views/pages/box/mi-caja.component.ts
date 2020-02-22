import { Component, OnInit } from '@angular/core';
import { Box } from 'src/app/models/box.model';
import { BoxService } from 'src/app/services/box.service';
declare const $: any;

@Component({
  selector: 'app-mi-caja',
  templateUrl: './mi-caja.component.html',
  styles: []
})
export class MiCajaComponent implements OnInit {
  box: Box = {};
  constructor(private boxService: BoxService) { }

  ngOnInit() {
  }

  openBox() {
    this.boxService.openBox(this.box)
      .subscribe(
        (data: Box) => console.log(data),
        (error) => console.error(error));
  }

  showModalBox() {
    $('#modaBox').modal('show');
  }

}
