import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { Book } from '../../models/book';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  books: Book[] = []

  constructor(
    private apiService: ApiCallService,
    private router: Router
  ) { }

  ngOnInit() {

    this.loadBooksList()
  }

  loadBooksList() {

    this.apiService.getBooks().subscribe((booksAPI: Book[]) => {
      this.books = booksAPI
    });

  }

  deleteBook(bookId: number) {
    this.apiService.deleteBook(bookId).subscribe({
      next: () => {
        console.log('Book with id was deleted');
        this.loadBooksList();
      },
      error: (err)=>{
        console.error(`Error while deleting book ${bookId}`,err);
      }}
    )
  }

  addNewBook(){
    this.router.navigate(['/new-book']);
  }

}
