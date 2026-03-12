import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from './services/book.service';
import { Book } from './models/book.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  books: Book[] = [];
  
  // Form fields
  newBook: Book = { id: 0, title: '', author: '', year: 2024 };
  editingBook: Book | null = null;
  
  // UI state
  loading = false;
  error = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.error = '';
    
    this.bookService.getAll().subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load books. Make sure the backend is running on http://localhost:5070';
        this.loading = false;
        console.error(err);
      }
    });
  }

  addBook(): void {
    if (!this.newBook.title || !this.newBook.author) {
      this.error = 'Please fill in title and author';
      return;
    }

    this.bookService.create(this.newBook).subscribe({
      next: () => {
        this.loadBooks();
        this.newBook = { id: 0, title: '', author: '', year: 2024 };
        this.error = '';
      },
      error: (err) => {
        this.error = 'Failed to add book';
        console.error(err);
      }
    });
  }

  startEdit(book: Book): void {
    this.editingBook = { ...book };
  }

  cancelEdit(): void {
    this.editingBook = null;
  }

  saveEdit(): void {
    if (!this.editingBook) return;

    this.bookService.update(this.editingBook.id, this.editingBook).subscribe({
      next: () => {
        this.loadBooks();
        this.editingBook = null;
        this.error = '';
      },
      error: (err) => {
        this.error = 'Failed to update book';
        console.error(err);
      }
    });
  }

  deleteBook(id: number): void {
    if (!confirm('Are you sure you want to delete this book?')) return;

    this.bookService.delete(id).subscribe({
      next: () => {
        this.loadBooks();
        this.error = '';
      },
      error: (err) => {
        this.error = 'Failed to delete book';
        console.error(err);
      }
    });
  }
}
