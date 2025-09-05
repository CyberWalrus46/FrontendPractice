
namespace BackendToFront.Domains
{
    public interface IComment
    {
        Guid Id { get; set; }
        Guid NewsId { get; set; }
        string Text { get; set; }
    }
}