import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy
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

export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  private routeSubscription: Subscription | undefined;

  displayedColumns: string[] = [
    'id', 'fullname', 'email', 'phone', 'city', 'country', 'street', 'action'
  ];
  dataSource: MatTableDataSource<UserInterface>;
  pageEvent: PageEvent | undefined;
  pageIndex = new BehaviorSubject<number>(0);
  pageSize = new BehaviorSubject<number>(10);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
      this.dataSource = new MatTableDataSource();

      this.routeSubscription = this.route.params.subscribe(params => {
        const currTablePage = parseInt(params['page']);

        if (isNaN(currTablePage)) {
          this.router.navigate(['/']);
        }

        if (!!currTablePage) {
          this.pageIndex.next(currTablePage);

          setTimeout(() => {
            if (this.dataSource.paginator) {
              this.dataSource.paginator.pageIndex = currTablePage - 1;
              this.ngAfterViewInit();
            }
          }, 0);
        }
      });
  }

  ngOnInit(): void {
    this.getAllUsers();

    setTimeout(() => {
      if (this.dataSource.paginator) {
        this.dataSource.paginator.pageIndex = this.pageIndex.getValue() - 1;
      }
    }, 0);

    const currentPageSize = localStorage.getItem('pageSize');
    if (currentPageSize) {
      this.pageSize.next(parseInt(currentPageSize));
    }
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }

  getAllUsers() {
    this.api.getUsers()
      .subscribe({
        next: (result) => {
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator || null;
          this.dataSource.sort = this.sort || null;
        },
        error: (error) => {
          console.error('error while fetching users: ', error.message)
        }
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
    this.dataSource.sort = this.sort || null;
  }

  applyFilter(event: Event) {
    if (this.dataSource.paginator) {
      this.dataSource.paginator.pageIndex = this.pageIndex.getValue() - 1;
    }

    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = (data, filter) => {
      const textToSearch = getNestedValues(data, []).join();
      console.log(textToSearch)
      return textToSearch.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1;
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToUserDetails(id: number) {
    this.router.navigate(['/details', id]);
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
