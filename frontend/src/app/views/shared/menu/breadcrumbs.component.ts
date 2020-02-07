import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titleNow: string;
  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.getDataRoute()
      .subscribe(data => {
        this.titleNow = data.title;
        this.title.setTitle(this.titleNow);
        const METATAG: MetaDefinition = {
          name: 'title',
          content: this.titleNow
        };
        this.meta.updateTag(METATAG);
      });
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild == null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }

}
