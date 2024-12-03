import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ApiCallService {

  private apiUrl = 'http://127.0.0.1:8000/'

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}books/`)
  }

  deleteBook(id: number): Observable<Book[]> {
    return this.http.delete<Book[]>(`${this.apiUrl}books/${id}/`)
  }
}
