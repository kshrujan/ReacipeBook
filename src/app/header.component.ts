import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isOpen(){
    document.getElementById("uDrop").classList.toggle("show");
  }

  isClosed(){
    document.getElementById("uDrop").classList.toggle("show");
  }

  constructor() { }

  ngOnInit() {
  }

}
