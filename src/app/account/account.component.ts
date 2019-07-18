import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor() { }

  swiperConfig: SwiperConfigInterface = {
    freeMode: true,
    slidesPerView: 2,
    navigation: true,
    breakpoints: {
      768: {
        slidesPerView: 1
      }
    }
  }

  ngOnInit() {
  }

}
