
namespace BackendToFront.Domains
{
    public interface IDataHub
    {
        void AddCategory(ICategory _category);
        void AddComment(IComment _comment);
        void AddNews(INews _news);
        ICollection<ICategory> GetCategories();
        ICollection<IComment> GetCommentaries();
        ICollection<IComment> GetCommentariesByNewsId(Guid _newsId);
        ICollection<INews> GetNews();
        ICollection<INews>? GetNewsByCategoryTitle(string categoryTitle);
    }
}