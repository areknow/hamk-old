import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Keyboard } from '@ionic-native/keyboard';
declare var require: any;
const loadGoogleMapsApi = require('load-google-maps-api');

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('mapTarget', { static: false })
  set map(target: ElementRef) {
    if (target) {
      this.loadMap(target);
    }
  }

  searchValue = '';
  sheetOpen = true;

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

  async loadMap(target: ElementRef) {
    try {
      const googleMaps = await loadGoogleMapsApi({
        key: environment.mapsApiKey
      });
      // tslint:disable-next-line: no-unused-expression
      new googleMaps.Map(target.nativeElement, {
        center: {
          lat: 43.948601,
          lng: -84.60767
        },
        zoom: 7,
        disableDefaultUI: true
      });
    } catch (error) {
      console.error(error);
    }
  }

  submit() {
    Keyboard.hide();
  }

  toggleTuneSheet() {
    this.sheetOpen = !this.sheetOpen;
  }

  handleResultButtonGroup(event) {
    this.toggleButtonGroupStates(this.resultGroup, event);
  }

  handleAccessibilityButtonGroup(event) {
    this.toggleButtonGroupStates(this.accessibilityGroup, event);
  }

  toggleButtonGroupStates(group, event) {
    for (const button of group) {
      if (button.value === event) {
        button.active = true;
      } else {
        button.active = false;
      }
    }
  }
}
