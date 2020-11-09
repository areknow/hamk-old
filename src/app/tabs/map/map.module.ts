import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapPage } from './map.page';
import { MapPageRoutingModule } from './map-routing.module';
import { ButtonGroupModule } from '../../shared/components/button-group/button-group.module';
import { MapCardModule } from 'src/app/shared/components/map-card/map-card.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, MapPageRoutingModule, ButtonGroupModule, MapCardModule],
  declarations: [MapPage]
})
export class MapPageModule {}
