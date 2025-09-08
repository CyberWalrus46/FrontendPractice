const categoriesList = document.querySelector('.categories');
const newsContainer = document.querySelector('.news-container');
const addNewsModal = document.getElementById('addNewsModal');
const addNewsBtn = document.getElementById('addNewsBtn');
const cancelBtn = document.getElementById('cancelBtn');
const newsForm = document.getElementById('newsForm');
const categorySelect = document.getElementById('category');
const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

const API_BASE = "http://localhost:5070/api/"
        
let currentCategory = 'Все новости';
        
        // Загрузка категорий при запуске
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadCategories();
    loadNews();
});

// Функция загрузки темы
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';

    body.setAttribute('data-theme', savedTheme);
    localStorage.setItem('theme', savedTheme);

    if (savedTheme === 'dark') {
        themeToggleBtn.textContent = '☀️ Светлая тема';
    } else {
        themeToggleBtn.textContent = '🌙 Тёмная тема';
    }
}

// Обработчик переключения темы
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
        themeToggleBtn.textContent = '☀️ Светлая тема';
    } else {
        themeToggleBtn.textContent = '🌙 Тёмная тема';
    }
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

// async function loadNews() {

//     while (newsContainer.children.length > 0)
//         newsContainer.removeChild(newsContainer.lastChild);

//     const loading = document.createElement('div');
//     loading.classList.add('loading');
//     loading.textContent = "Загрузка новостей...";
//     newsContainer.append(loading);


//     const response = currentCategory === 'Все новости' ? await fetch(API_BASE + 'ControllersGet/news') : 
//                                                 await fetch(API_BASE + 'ControllersGet/news/' + decodeURIComponent(currentCategory));

//     const news = await response.json() ?? {};

//     console.log(news);

//     news.forEach(val => {
//         const newsCard = document.createElement('div');
//         newsCard.className = 'news-card';
        
//         const newsTitle = document.createElement('label');
//         newsTitle.textContent = val.title;
//         newsTitle.className = 'news-title';
        
//         const newsText = document.createElement('p');
//         newsText.textContent = val.text;
//         newsText.className = 'news-text';

//         newsCard.append(newsTitle, newsText);
//         newsContainer.append(newsCard);
//     });

//     if (newsContainer.children.length > 1)
//     {
//         newsContainer.removeChild(newsContainer.firstElementChild);
//     }
    
//     else
//     {
//         newsContainer.firstElementChild.textContent = 'Похоже, новости для данной категории отсутствуют';
//     }
// }






async function loadNews() {
            try{
                newsContainer.innerHTML = '<div class="loading">Загрузка новостей...</div>';
                
                let url;
                if (currentCategory === 'Все новости') {
                    url = `${API_BASE}ControllersGet/news`;
                } else {
                    url = `${API_BASE}ControllersGet/news/` + decodeURIComponent(currentCategory);
                }
                
                const news = await fetch(url);

                newsJson = await news.json() ?? {};
                
                displayNews(newsJson);
            } catch (error) {
                console.error('Ошибка при загрузке новостей:', error);
                newsContainer.innerHTML = '<div class="error">Ошибка при загрузке новостей</div>';
            }
        }
        
        // Отображение новостей
        function displayNews(news) {
            newsContainer.innerHTML = '';
            
            if (news.length === 0) {
                newsContainer.innerHTML = '<div class="loading">Новостей нет</div>';
                return;
            }
            
            news.forEach(newsItem => {
                const newsCard = createNewsCard(newsItem);
                newsContainer.appendChild(newsCard);
            });
        }
        
        // Создание карточки новости
        function createNewsCard(newsItem) {
            const card = document.createElement('div');
            card.className = 'news-card';
            
            const shortText = newsItem.text.length > 150 
                ? newsItem.text.substring(0, 150) + '...' 
                : newsItem.text;
            
            const categoryElement = document.querySelector(`.categories li[data-category="${newsItem.categoryId}"]`);
            const categoryName = categoryElement ? categoryElement.textContent : 'Неизвестная категория';
            
            card.innerHTML = `
                <h3 class="news-title">${newsItem.title}</h3>
                <div class="news-category">Категория: ${categoryName}</div>
                <p class="news-text">${shortText}</p>
                ${newsItem.text.length > 150 ? '<div class="read-more">Читать полностью</div>' : ''}
                <div class="comments-section">
                    <h4>Комментарии</h4>
                    <div class="comments-list" data-news-id="${newsItem.categoryId}">
                        Загрузка комментариев...
                    </div>
                </div>
            `;
            
            const readMoreBtn = card.querySelector('.read-more');
            if (readMoreBtn) {
                readMoreBtn.addEventListener('click', () => {
                    const newsText = card.querySelector('.news-text');
                    if (newsText.textContent === shortText) {
                        newsText.textContent = newsItem.text;
                        readMoreBtn.textContent = 'Свернуть';
                    } else {
                        newsText.textContent = shortText;
                        readMoreBtn.textContent = 'Читать полностью';
                    }
                });
            }
            
            loadComments(newsItem.categoryId);
            
            return card;
        }

        // Загрузка комментариев
        async function loadComments(newsId) {
            try {
                const comments = await fetch(`${API_BASE}ControllersGet/comments/${newsId}`);
                const commentsList = document.querySelector(`.comments-list[data-news-id="${newsId}"]`);
                
                if (!commentsList) return;
                
                if (comments.length === 0) {
                    commentsList.innerHTML = 'Комментариев нет';
                    return;
                }
                
                commentsList.innerHTML = '';
                const com = await comments.json();
                com.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment';
                    commentElement.textContent = comment.text;
                    commentsList.appendChild(commentElement);
                });
            } catch (error) {
                console.error('Ошибка при загрузке комментариев:', error);
                const commentsList = document.querySelector(`.comments-list[data-news-id="${newsId}"]`);
                if (commentsList) {
                    commentsList.innerHTML = 'Ошибка при загрузке комментариев';
                }
            }
        }

        // Обработчики для модального окна
        addNewsBtn.addEventListener('click', () => {
            addNewsModal.style.display = 'flex';
        });
        
        cancelBtn.addEventListener('click', () => {
            addNewsModal.style.display = 'none';
            newsForm.reset();
        });
        
        // Обработчик отправки формы
        newsForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const categoryId = categorySelect.value;
            const title = document.getElementById('title').value;
            const text = document.getElementById('text').value;
            
            const url = `${API_BASE}ControllersPost/news/${categoryId}&${encodeURIComponent(title)}&${encodeURIComponent(text)}`;

            try {
                // Отправка данных на сервер
                const response = await fetch(
                    url,
                    { method: 'POST' }
                );

                alert('Новость успешно добавлена!');
                addNewsModal.style.display = 'none';
                newsForm.reset();
                loadNews();
            } catch (error) {
                console.error('Ошибка при добавлении новости:', error);
                alert('Ошибка при добавлении новости. Проверьте консоль для подробностей.');
            }
        });