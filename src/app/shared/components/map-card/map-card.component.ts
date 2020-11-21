import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

@Component({
  selector: 'app-map-card',
  templateUrl: './map-card.component.html',
  styleUrls: ['./map-card.component.scss']
})
export class MapCardComponent {
  @Input() image: string;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() rating: number;
  @Input() geo: { lat: number; lng: number };
  @Input() id: number;

  @Output() more = new EventEmitter<void>();

  constructor(public actionSheetController: ActionSheetController, private launchNavigator: LaunchNavigator) {}

  async handleMoreClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Directions',
          handler: () => {
            this.launchNavigator.navigate([this.geo.lat, this.geo.lng], { app: this.launchNavigator.APP.APPLE_MAPS });
          }
        },
        {
          text: 'Favorite',
          handler: () => {}
        },
        {
          text: 'Share',
          handler: () => {
            if (navigator.share) {
              navigator
                .share({
                  title: this.title,
                  text: 'Check out this sweet spot!',
                  url: 'https://hamk.io/spot/1231231'
                })
                .then(() => console.log('Successful share'))
                .catch(error => console.log('Error sharing', error));
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    await actionSheet.present();
  }

  handleCardClick() {}
}
