namespace BackendToFront.Domains
{
    public class Comment : IComment
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid NewsId { get; set; }

        public string Text { get; set; } = "";

        public Comment(Guid newsId, string text)
        {
            this.NewsId = newsId;
            this.Text = text;
        }
    }
}
