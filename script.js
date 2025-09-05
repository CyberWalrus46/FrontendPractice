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
    // loadNews();
});

async function loadCategories() {
    const response = await fetch('${API_BASE}ControllersGet/categories');
    const categories = await response.json();

    while (categoriesList.children.length > 1) {
                    categoriesList.removeChild(categoriesList.lastChild);
                }
    
    // Добавляем категории в боковую панель
    categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = category.Title;
        li.dataset.category = category.Id;
        categoriesList.appendChild(li);
                    
        // Добавляем категорию в выпадающий список формы
        const option = document.createElement('option');
        option.value = category.Id;
        option.textContent = category.Title;
        categorySelect.appendChild(option);
    });

    document.querySelectorAll('.categories li').forEach(item => {
        item.addEventListener('click', () => {
            // Убираем активный класс у всех элементов
            document.querySelectorAll('.categories li').forEach(li => {
                li.classList.remove('active');
            })
        });
        // Добавляем активный класс к выбранному элементу
        item.classList.add('active');

        currentCategory = item.dataset.category;
        // loadNews();
    });
}
