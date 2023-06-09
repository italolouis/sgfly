import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationStart, Router, Scroll} from "@angular/router";
import {MENU_ITEMS} from "../../../../pages/pages-menu";

@Component({
  selector: 'ez-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  componentTitle?: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(data => {
      if (data instanceof Scroll) {
        const url = data.routerEvent.url;
        // @ts-ignore
        const menu = this.find(MENU_ITEMS, url);
        this.componentTitle = menu? menu['text']: undefined;
      }
    });
  }

  find = (array = [], url: string) => {
    var result;
    array.some(o => result = o['routerLink'] === url ? o : this.find(o['children'] || [], url));
    return result;
  };

}
