const categoriesList = document.querySelector('.categories');
const newsContainer = document.querySelector('.news-container');
const addNewsModal = document.getElementById('addNewsModal');
const addNewsBtn = document.getElementById('addNewsBtn');
const cancelBtn = document.getElementById('cancelBtn');
const newsForm = document.getElementById('newsForm');
const categorySelect = document.getElementById('category');

const API_BASE = "http://localhost:5070/api/"
        
let currentCategory = 'all';
        
        // Загрузка категорий при запуске
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadNews();
});


async function loadCategories() {
    console.log("Start of loading categories");

    const response = await fetch(API_BASE + 'ControllersGet/categories');
    const categories = await response.json();

    console.log(categories);

    while (categoriesList.children.length > 1) {
                    categoriesList.removeChild(categoriesList.lastChild);
                }
    
    // Добавляем категории в боковую панель
    categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = category.title;
        li.dataset.category = category.id;
        categoriesList.appendChild(li);
                    
        // Добавляем категорию в выпадающий список формы
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.title;
        categorySelect.appendChild(option);
    });

    document.querySelectorAll('.categories li').forEach(item => {
        item.addEventListener('click', () => {
            // Убираем активный класс у всех элементов
            document.querySelectorAll('.categories li').forEach(li => {
                li.classList.remove('active');
            });
                    // Добавляем активный класс к выбранному элементу
            item.classList.add('active');

            currentCategory = item.textContent;
            loadNews();
        });
    });
}

async function loadNews() {
    const response = currentCategory === 'all' ? await fetch(API_BASE + 'ControllersGet/news') : 
                                                await fetch(API_BASE + 'ControllersGet/news/' + decodeURIComponent(currentCategory));

    const news = await response.json();

    console.log(news);

    while (newsContainer.children.length > 0)
        newsContainer.removeChild(newsContainer.lastChild);

    news.forEach(val => {
        const newsCard = document.createElement('div');
        newsCard.className = 'newsCard';
        
        const newsTitle = document.createElement('label');
        newsTitle.textContent = val.title;
        
        const newsText = document.createElement('p');
        newsText.textContent = val.text;

        newsCard.append(newsTitle, newsText);
        newsContainer.append(newsCard);
    });


}