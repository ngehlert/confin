import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public hoveredIndex: number = 0;

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private router: Router,
    ) {
        this.matIconRegistry.addSvgIcon(
            'sneak_peak',
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/home-sneak.svg")
        );
    }

    public ngOnInit(): void {
    }

    public goToDemoDashboard(): void {
        void this.router.navigate(['demo-dashboard'], {});
    }

}
