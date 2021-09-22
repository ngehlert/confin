import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public form: FormGroup = this.formBuilder.group({
        name: null,
        password: null,
    });

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private router: Router,
    ) { }

    public ngOnInit(): void {
    }

    public login(): void {
        if (this.form.invalid) {
            return;
        }

        this.http.post<{token: string}>(
            `${environment.apiUrl}/auth`,
            {
                name: this.form.controls.name.value,
                password: this.form.controls.password.value,
            },
        ).subscribe((result: {token: string}) => {
            sessionStorage.setItem(environment.tokenKey, result.token);
            this.router.navigate(['/dashboard']);
        });
    }
}
