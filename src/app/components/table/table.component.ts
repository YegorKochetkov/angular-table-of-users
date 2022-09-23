import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  AfterViewChecked
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { BehaviorSubject, Subscription } from 'rxjs';

import { ApiService } from 'src/app/services/users.service';
import { UserInterface } from 'src/app/types/user.type';
import { getNestedValues } from 'src/app/helpers/getNestedValues';
import { DeleteConfirmationComponent } from 'src/app/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  private routeSubscription: Subscription | undefined;
  loading = false;
  dataSource!: MatTableDataSource<UserInterface>;
  pageEvent: PageEvent | undefined;
  tablePageIndex = new BehaviorSubject<number>(0);
  urlParamsPage = new BehaviorSubject<number>(0);
  numberOfTablePages = new BehaviorSubject<number | null>(null);
  pageSize = new BehaviorSubject<number>(10);
  displayedColumns: string[] = [
    'id', 'fullname', 'email', 'phone', 'city', 'country', 'street', 'action'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.api.loading$.subscribe((isLoading) => this.loading = isLoading);

    this.api.usersList$.subscribe((userList) => {
      this.dataSource = new MatTableDataSource(userList);
      this.dataSource.paginator = this.paginator || null;
      this.dataSource.sort = this.sort || null;
    });

    this.routeSubscription = this.route.params.subscribe((params) => {
      const currTablePage = parseInt(params['page'], 10);

      if (isNaN(currTablePage)) {
        this.router.navigate(['']);
      }

      this.tablePageIndex.next(currTablePage - 1);

      setTimeout(() => {
        if (this.dataSource.paginator) {
          this.dataSource.paginator.pageIndex = this.tablePageIndex.getValue();
          this.dataSource.paginator = this.paginator || null;
          this.dataSource.sort = this.sort || null;
        }
      });
    });

    this.numberOfTablePages.subscribe((pages) => {
      setTimeout(() => {
        if (pages && pages < (this.tablePageIndex.getValue() + 1)) {
          this.router.navigate(['404']);
        }
      });
    });
  }

  ngOnInit(): void {
    this.api.getUsers();

    const currentPageSize = localStorage.getItem('pageSize');

    if (currentPageSize) {
      this.pageSize.next(parseInt(currentPageSize));
    }
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
    this.dataSource.sort = this.sort || null;
  }

  ngAfterViewChecked() {
    this.numberOfTablePages.next(this.dataSource.paginator?.getNumberOfPages() || null);
    // set right page of table after table init
    if (this.dataSource.paginator) {
      this.dataSource.paginator.pageIndex = this.tablePageIndex.getValue();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = (data, filter) => {
      const textToSearch = getNestedValues(data, []).join();

      return textToSearch.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1;
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToUserDetails(id: number) {
    this.loading = true;
    this.router.navigate(['/details', id]);
    this.loading = false;
  }

  handlePaginator(event: PageEvent | undefined) {
    this.pageEvent = event;

    if (this.pageEvent) {
      if (this.pageEvent.pageSize !== this.pageSize.getValue()) {
        this.pageSize.next(this.pageEvent.pageSize);
        localStorage.setItem('pageSize', this.pageEvent.pageSize.toString());
      }

      if (this.pageEvent.previousPageIndex !== this.pageEvent.pageIndex) {
        this.router.navigate(['/dashboard', this.pageEvent.pageIndex + 1]);
      }
    }
  }

  deleteConfirmation(id: number) {
    this.dialog.open(DeleteConfirmationComponent, {
      minWidth: 'fit-content',
      data: {
        id,
      }
    });
  }
}
