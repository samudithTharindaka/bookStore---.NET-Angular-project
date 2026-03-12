using Backend.Models;

namespace Backend.Services
{
    public class BookService
    {
        private static List<Book> books = new List<Book>()
        {
            new Book{Id=1, Title="Clean Code", Author="Robert Martin", Year=2008}
        };

        public List<Book> GetAll() => books;

        public Book Get(int id)
        {
            return books.FirstOrDefault(b => b.Id == id);
        }

        public void Add(Book book)
        {
            book.Id = books.Max(b => b.Id) + 1;
            books.Add(book);
        }

        public void Update(int id, Book updated)
        {
            var book = Get(id);

            if (book == null) return;

            book.Title = updated.Title;
            book.Author = updated.Author;
            book.Year = updated.Year;
        }

        public void Delete(int id)
        {
            var book = Get(id);

            if (book != null)
                books.Remove(book);
        }
    }
}