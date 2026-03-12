using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly BookService service = new BookService();

        [HttpGet]
        public ActionResult<List<Book>> GetAll()
        {
            return service.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<Book> Get(int id)
        {
            var book = service.Get(id);

            if (book == null)
                return NotFound();

            return book;
        }

        [HttpPost]
        public IActionResult Create(Book book)
        {
            service.Add(book);
            return Ok(book);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Book book)
        {
            service.Update(id, book);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            service.Delete(id);
            return Ok();
        }
    }
}