import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { ApiCallService } from '../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { Book } from '../../models/book';
import { CategoryService } from '../../services/category.service';
import path from 'node:path/posix';

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  bookForm!: FormGroup;
  categories!: string[];
  isUpdateMode = false;
  bookId: string | null = null

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiCallService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.loadCategories();
    this.bookId = this.route.snapshot.paramMap.get('id')

    if (this.bookId) {
      this.isUpdateMode = true;
      this.loadBookDetails(this.bookId)
    }
  }

  createForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required]
    })
  }

  onSubmit() {

    if (this.bookForm.valid) {
      const bookData: Book = this.bookForm.value;
      if (this.isUpdateMode) {
        this.apiService.updateBook(this.bookId!, bookData).subscribe({
          next: (response) => {
            this.router.navigate(['']);
          },
          error: (err) => {
            console.log(err);

          },
          complete: () => {
            console.log(bookData);
          }

        });

      } else {
        this.apiService.addBook(bookData).subscribe({
          next: (response) => {
            console.log('Book added successfully');
            this.bookForm.reset();
            this.router.navigate(['/'])
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => {
            console.log(bookData)
          }
        });

      }

    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories: string[]) => {
      this.categories = categories;
      console.log(categories);
    }
    )
  }

  loadBookDetails(bookId: string) {
    this.apiService.getBookById(bookId).subscribe({
      next: (book: Book) => {
        this.bookForm.patchValue(book)
      },
      error: (err) => {
        console.log(err);
      }

    })
  }

  goToBookList() {
    this.router.navigate(['/'])
  }
}
