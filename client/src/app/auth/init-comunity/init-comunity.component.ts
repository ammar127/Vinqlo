import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-init-comunity',
  templateUrl: './init-comunity.component.html',
  styleUrls: ['./init-comunity.component.css']
})
export class InitComunityComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  checkClick(){
    this.router.navigate(['/feed'])
  }
}
