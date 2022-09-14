import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { UserInterface } from 'src/app/types/user.type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id', 'fullname', 'email', 'phone', 'city', 'country', 'action'
  ];
  dataSource: MatTableDataSource<UserInterface>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private api: ApiService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllUsers();
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
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToUserDetails(id: number) {
    this.router.navigate(['/details/' + id]);
  }
}
