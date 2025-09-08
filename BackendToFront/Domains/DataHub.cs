using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Runtime.CompilerServices;

namespace BackendToFront.Domains
{
    public class DataHub : IDataHub
    {
        private ICollection<ICategory> categories =  new Collection<ICategory>();

        private ICollection<INews> news = new Collection<INews>();

        private ICollection<IComment> commentaries = new Collection<IComment>();

        public void AddCategory(ICategory _category)
        {
            if (this.categories.Any(x => x.Title == _category.Title))
                throw new ArgumentException("Категория с таким наименованием уже существует");

            this.categories.Add(_category);
        }

        public void AddNews(INews _news) => this.news.Add(_news);

        public void AddComment(IComment _comment) => this.commentaries.Add(_comment);


        public ICollection<ICategory> GetCategories() => this.categories;

        public ICollection<INews> GetNews() => this.news;

        public ICollection<IComment> GetCommentaries() => this.commentaries;


        public ICollection<INews>? GetNewsByCategoryTitle(string categoryTitle)
        {
            var categoryId = categories.Where(x => x.Title == categoryTitle).Select(x => x.Id).FirstOrDefault();

            if (categoryId != Guid.Empty)
                return this.news.Where(x => x.CategoryId == categoryId).ToList();

            return null;
        }

        public ICollection<IComment> GetCommentariesByNewsId(Guid _newsId) => this.commentaries.Where(x => x.NewsId == _newsId).ToList();
    }
}
