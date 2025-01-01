import { Routes } from '@angular/router';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { NewBookComponent } from './pages/new-book/new-book.component';

export const routes: Routes = [
    {path: '', component: BooksListComponent},
    {path: 'new-book', component:NewBookComponent }
];
