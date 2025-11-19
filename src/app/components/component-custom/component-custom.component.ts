import { ParsedVariable } from '@angular/compiler';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-component-custom',
  templateUrl: './component-custom.component.html',
  styleUrls: ['./component-custom.component.scss'],
})
export class ComponentCustomComponent  implements OnInit, OnChanges, OnDestroy {

  @Input() variable!: boolean

  constructor() { 
    console.log("Este mensaje se manda desde el constructor");
  }

  ngOnInit() {
    console.log ("Este mensaje se manda desde el Hooks ngOnInit");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['variable']){
      console.log("valor: ", changes['variable'].currentValue)
    }
  }

  ngOnDestroy(): void {
    console.log ("Este mensaje se manda desde el Hooks ngOnDestroy")
  }

}
