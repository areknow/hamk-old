/// <reference types="googlemaps" />

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Keyboard } from '@ionic-native/keyboard';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Loader } from '@googlemaps/js-api-loader';

interface IButtonGroup {
  active: boolean;
  value: number;
  label: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild('mapTarget', { static: false }) mapTarget: ElementRef;

  searchValue = '';
  sheetOpen = false;

  resultGroup = [
    {
      active: true,
      value: 1,
      label: 'Best Match'
    },
    {
      active: false,
      value: 2,
      label: 'Proximity'
    },
    {
      active: false,
      value: 3,
      label: 'Most Popular'
    }
  ];
  accessibilityGroup = [
    {
      active: true,
      value: 1,
      label: 'Most'
    },
    {
      active: false,
      value: 2,
      label: 'Moderate'
    },
    {
      active: false,
      value: 3,
      label: 'Least'
    }
  ];

  defaultPosition = {
    lat: undefined,
    lng: undefined
  };

  mapObject: google.maps.Map;

  constructor(private geolocation: Geolocation) {}

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    setTimeout(async () => {
      const {
        coords: { latitude, longitude }
      } = await this.geolocation.getCurrentPosition();
      this.defaultPosition = {
        lat: latitude,
        lng: longitude
      };
      this.loadMap();
    }, 100); // time out because ios doesn't want to load the geo location right away
  }

  async loadMap() {
    const loader = new Loader({
      apiKey: environment.mapsApiKey,
      version: 'weekly'
    });

    loader.load().then(() => {
      this.mapObject = new google.maps.Map(this.mapTarget.nativeElement, {
        center: this.defaultPosition,
        zoom: 8,
        disableDefaultUI: true
      });
    });
  }

  submit() {
    Keyboard.hide();
  }

  toggleTuneSheet() {
    this.sheetOpen = !this.sheetOpen;
  }

  handleResultButtonGroup(event: number) {
    this.toggleButtonGroupStates(this.resultGroup, event);
  }

  handleAccessibilityButtonGroup(event: number) {
    this.toggleButtonGroupStates(this.accessibilityGroup, event);
  }

  toggleButtonGroupStates(group: IButtonGroup[], event: number) {
    for (const button of group) {
      button.active = button.value === event;
    }
  }

  centerMap() {
    this.mapObject.panTo(this.defaultPosition);
  }
}
