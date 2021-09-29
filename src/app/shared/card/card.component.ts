import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'emsi-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    @Input() public scaleHeight: boolean = false;
    @Input() public clickable: boolean = false;

    @Output() public click: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit(): void {
    }

    public triggerClick(): void {
        this.click.emit();
    }

}
