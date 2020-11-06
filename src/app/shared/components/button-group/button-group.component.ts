import { Component, Directive, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Directive({
  selector: 'app-button-group-item',
  exportAs: 'appButtonGroupItem'
})
export class ButtonGroupItemDirective {
  @HostBinding('class')
  elementClass = 'button-group-item';
}

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonGroupComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
