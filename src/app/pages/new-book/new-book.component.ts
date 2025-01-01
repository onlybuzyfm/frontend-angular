import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms'
import { ApiCallService } from '../../services/api-call.service';
import { response } from 'express';
import { Book } from '../../models/book';

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  bookForm!: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiCallService
  ) { }

  ngOnInit(): void {
    this.createForm();
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
      const newBook: Book = this.bookForm.value
      this.apiService.addBook(newBook).subscribe({
        next: (response) => {
          console.log('Book added successfully');
          this.bookForm.reset();
          this.router.navigate(['/'])
        },
        error: (err) => {
          console.log(newBook)
          console.error('Error adding book:', err);
        },
        complete: () => {
          console.log(newBook)
        }
      })
    }
  }

  goToBookList() {
    this.router.navigate(['/'])
  }
}
