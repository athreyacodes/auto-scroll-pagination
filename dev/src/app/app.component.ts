import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Scroll Pagination';
  list: any[] = [];
  total: number = 0;
  loading: boolean = false;
  pageSize: number = 20;

  get areAllItemsLoaded() {
    return this.list.length >= this.total;
  }

  constructor(private srv: AppService) { }

  ngOnInit() {
    this.list = [];
    this.total = 0;
    this.loadMails();
  }

  loadNextPage() {
    if (!this.areAllItemsLoaded) {
      this.loadMails();
    }
  }

  onScroll(event: any) {
    if ((event?.target?.offsetHeight + event?.target?.scrollTop + 20) >= event?.target?.scrollHeight) {
      this.loadNextPage();
    }
  }

  private loadMails() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.srv.GetList(this.list.length || 0, this.pageSize).subscribe(t => {
      this.list = this.list.length ? this.list.concat(t.items) : t.items;
      this.total = t.total;
    }).add(() => { this.loading = false; });
  }
}
