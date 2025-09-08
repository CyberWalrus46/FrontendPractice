using BackendToFront.Domains;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Net.WebSockets;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackendToFront.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ControllersGet : ControllerBase
    {
        private IDataHub datahub;
        public ControllersGet(IDataHub _datahub)
        {
            this.datahub = _datahub;
        }

        [HttpGet("categories")]
        public IActionResult GetAllCategories()
        {
            var categories = this.datahub.GetCategories();
            if (categories != null)
                return Ok(categories);

            return NoContent();

        }

        [HttpGet("news/{categoryTitle}")]
        public IActionResult GetNewsByCategory(string categoryTitle)
        {
            var news = datahub.GetNewsByCategoryTitle(categoryTitle);
            if (news != null)
                return Ok(news);

            return NoContent();
        }

        [HttpGet("news")]
        public IActionResult GetAllNews()
        {
            var news = datahub.GetNews();
            if (news != null)
                return Ok(news);

            return NoContent();
        }

        [HttpGet("comments/{newsId}")]
        public IActionResult GetCommentsByNewsId(string newsId)
        {
            Guid.TryParse(Uri.EscapeDataString(newsId), out Guid news_id);
            if (news_id != Guid.Empty)
            {
                var comments = datahub.GetCommentariesByNewsId(news_id);
                if (comments != null)
                    return Ok(comments);

                return NoContent();
            }
            else
                return BadRequest($"Неверный GUID: {newsId}");
        }
    }
}
