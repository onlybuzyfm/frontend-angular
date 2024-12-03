import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent implements OnInit {

  books: Book[] = []

  constructor(
    private apiService: ApiCallService
  ) { }

  ngOnInit() {

    this.loadBooksList()
  }

  loadBooksList() {

    this.apiService.getBooks().subscribe((booksAPI: Book[]) => {
      this.books = booksAPI
    });


  }

}
