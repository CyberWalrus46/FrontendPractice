namespace BackendToFront.Domains
{
    public class News : INews
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Title { get; set; } = "";

        public string Text { get; set; } = "";

        public Guid CategoryId { get; set; }

        public News(Guid categoryId, string title, string text)
        {
            this.CategoryId = categoryId;
            this.Title = title;
            this.Text = text;
        }
    }
}
