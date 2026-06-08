import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  users: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() { }
  protected readonly title = signal('backend');


  getUsers() {
    this.http.get('https://localhost:3000/users')
      .subscribe((response: any) => {
        console.log(response)

        this.users = response;

      })
  }
}
