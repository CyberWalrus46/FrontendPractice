
namespace BackendToFront.Domains
{
    public interface INews
    {
        Guid CategoryId { get; set; }
        Guid Id { get; set; }
        string Text { get; set; }
        string Title { get; set; }
    }
}