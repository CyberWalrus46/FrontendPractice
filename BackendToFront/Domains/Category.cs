namespace BackendToFront.Domains
{
    public class Category : ICategory
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Title { get; set; } = "";

        public Category(string Title)
        {
            this.Title = Title;
        }
    }
}
