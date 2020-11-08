import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapPage } from './map.page';
import { MapPageRoutingModule } from './map-routing.module';
import { ButtonGroupModule } from '../../shared/components/button-group/button-group.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, MapPageRoutingModule, ButtonGroupModule],
  declarations: [MapPage]
})
export class MapPageModule {}
