using BackendToFront.Domains;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackendToFront.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ControllersPost : ControllerBase
    {
        private IDataHub datahub;
        public ControllersPost(IDataHub _datahub)
        {
            this.datahub = _datahub;
        }

        [HttpPost("categories/{title}")]
        public IActionResult CreateCategory(string title)
        {
            try
            {
                datahub.AddCategory(new Category(title));

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("news/{categoryId}&{title}&{text}")]
        public IActionResult CreateCategory(string categoryId, string title, string text)
        {
            try
            {
                Guid.TryParse(Uri.UnescapeDataString(categoryId), out Guid category_id);
                if (category_id != Guid.Empty)
                {
                    datahub.AddNews(new News(category_id, title, text));

                    return Ok();
                }
                else
                    return BadRequest($"Неверный GUID: {categoryId}");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("comments/{newsId}&{text}")]
        public IActionResult CreateComment(Guid newsId, string text)
        {
            try
            {
                datahub.AddComment(new Comment(newsId, text));

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
