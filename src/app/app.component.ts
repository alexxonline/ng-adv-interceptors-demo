import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GitHubService } from './services/github.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showLoader = false;
  constructor(private github: GitHubService, private loader: LoaderService) {
  }

  ngOnInit(): void {
    this.loader.getStatus().subscribe(status => this.showLoader = status);
  }

  run() {
    this.github.getInfo().subscribe(info => {
      console.log(info);
    })
  }
}
