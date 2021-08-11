import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-init-comunity',
  templateUrl: './init-comunity.component.html',
  styleUrls: ['./init-comunity.component.css']
})
export class InitComunityComponent implements OnInit {
  active = 'top';
  constructor(private router:Router) { }
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  ngOnInit(): void {
  }
  checkClick(){
    this.router.navigate(['/feed'])
  }
}
