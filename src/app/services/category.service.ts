import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl='http://127.0.0.1:8000/book-categories/'

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get<string[]>(this.apiUrl)
  }
}
