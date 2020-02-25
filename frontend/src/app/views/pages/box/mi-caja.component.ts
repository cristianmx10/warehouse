import { Component, OnInit } from '@angular/core';
import { Box } from 'src/app/models/box.model';
import { BoxService } from 'src/app/services/box.service';
import { Employe } from 'src/app/models/employe.model';
import { Local } from 'src/app/models/local.model';
import { finalize } from 'rxjs/operators';
declare const $: any;

@Component({
  selector: 'app-mi-caja',
  templateUrl: './mi-caja.component.html',
  styles: []
})
export class MiCajaComponent implements OnInit {
  lastOpenBox: Box = { active: false, _id: '' };
  box: Box = {};
  boxes: Box[] = [];
  employe: Employe;
  local: Local;
  hasOpenBox: boolean;
  constructor(private boxService: BoxService) {
    this.employe = JSON.parse(localStorage.getItem('user'));
    this.local = JSON.parse(localStorage.getItem('local'));
  }

  ngOnInit() {
    this.getLastBoxOpen();
    this.getAllBoxes();
  }

  openOrClose() {
    if (this.lastOpenBox.active) {
      this.lastOpenBox.active = false;
      this.closeBox();
    } else {
      this.openBox();
    }
  }

  openBox() {
    this.boxService.openBox(this.box)
      .pipe(finalize(() => {
        this.getLastBoxOpen();
        this.closeModal();
        this.getAllBoxes();
      }))
      .subscribe(
        (data: Box) => localStorage.setItem('mc', data._id),
        (error) => console.error(error));
  }

  closeBox() {
    this.boxService.closeLastBox(this.lastOpenBox)
      .pipe(finalize(() => {
        this.getLastBoxOpen();
        this.closeModal();
        this.getAllBoxes();
      }))
      .subscribe(
        (data: Box) => console.log(data),
        (error) => console.error(error));
  }

  getLastBoxOpen() {
    this.boxService.getLastBoxOpenByIdEmploye(this.employe._id, this.local._id)
      .subscribe(
        (data: Box) => {
          if (data) {
            this.hasOpenBox = true;
            this.lastOpenBox = data;
          }
        },
        (error) => console.error(error));
  }

  getAllBoxes() {
    this.boxService.getAllBoxes(this.employe._id, this.local._id)
      .subscribe(
        (data: Box[]) => this.boxes = data,
        (error) => console.error(error));
  }

  showModalBox() {
    if (!this.lastOpenBox.active) {
      this.box.startingPrice = 0;
      this.box.endPrice = 0;
      this.box.obsrvation = '';
      this.box.employe = this.employe;
      this.box.local = this.local;
    } else {
      this.box = this.lastOpenBox;
    }
    $('#modaBox').modal('show');
  }

  closeModal() {
    $('#modaBox').modal('hide');
  }

}
