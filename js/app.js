const filmForm = document.getElementById('film-form');
const addInput = document.getElementById('add-input');
const filmList = document.getElementById('film-list');
const filmItems = document.querySelectorAll('.film-item');

let i = 0;

function addFilm(event) {
    event.preventDefault();

    if (addInput.value === '') return alert('Please enter movie title');

    const filmItem = createFilmItem(addInput.value, 0);
    filmList.appendChild(filmItem);
    filmItem.rating = 0;
    filmItem.name = addInput.value;
    addInput.value = '';

}

function createElement(tag, props, arguments, stars) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(function (key) { element[key] = props[key] });

    if (arguments !== 0) {


        if (typeof (arguments) == 'object') {
            element.appendChild(arguments);
        } else {
            const child = document.createTextNode(arguments);
            child.innerHTML = arguments;

            element.appendChild(child);
        }

        if (stars !== 0) {
            element.appendChild(stars);
        }



    }


    return element;
}

function createFilmItem(title, rating) {
    const label = createElement('label', { className: '' }, title, 0);
    const stars = createElement('div', { className: 'star-list' }, 0, 0);

    stars.innerHTML = '<input class="star-input" type="radio" name="star' + i + '" id="star-1-' + i + '" value="5">    <label for="star-1-' + i + '"></label>    <input class="star-input" type="radio" name="star' + i + '" id="star-2-' + i + '" value="4">   <label for="star-2-' + i + '"></label>    <input class="star-input" type="radio" name="star' + i + '" id="star-3-' + i + '" value="3">   <label for="star-3-' + i + '"></label>    <input class="star-input" type="radio" name="star' + i + '" id="star-4-' + i + '" value="2">    <label for="star-4-' + i + '"></label>    <input class="star-input" type="radio" name="star' + i + '" id="star-5-' + i + '" value="1">    <label for="star-5-' + i + '"></label>';

    i++;

    const filmItem = createElement('li', { className: 'film-item' }, label, stars);

    filmItem.rating = rating;

    bindEvents(filmItem);

    localStorage.setItem(title, rating);

    setStars(filmItem);

    return filmItem;
}

function setStars(filmItem) {
    const stars = filmItem.querySelectorAll('.star-input');
    const gusli = Math.abs(filmItem.rating - 5);

    for (let i = 0; i < 5; i++) {
        if (i == gusli) {
            stars[i].setAttribute('checked', true);
        }
    }
}

function bindEvents(filmItem) {
    const stars = filmItem.querySelector('.star-list');


    stars.addEventListener('click', updateRating);
}

function updateRating() {
    const filmItem = this.parentNode;
    const stars = filmItem.querySelectorAll('.star-input');

    for (let i = 0; i < stars.length; i++) {
        Array.prototype.slice.call(stars).forEach(function (input) {
            if (input.checked) {
                filmItem.rating = input.value;
            }
        });
    }

    localStorage.setItem(filmItem.name, filmItem.rating);
    sortFilms();
}

function sortFilms() {
    let films = filmList.querySelectorAll('.film-item');

    let items = Array.prototype.slice.call(films);
    items.sort(function (a, b) {
        if (a.rating > b.rating) return 1;
        if (a.rating < b.rating) return -1;
    });
    for (let i = 0; i < items.length; i++) {
        filmList.insertBefore(items[i], filmList.firstChild);
    }
}

function load() {
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key) == true) {
            let value = localStorage[key];
            const film = createFilmItem(key, value);
            filmList.appendChild(film);
            film.rating = value;
            film.name = key;
        }
    }

    sortFilms();

}

function createFirstFilms() {
    const film1 = createFilmItem('The Godfather (1972)', 0);
    filmList.appendChild(film1);
    film1.rating = 0;
    film1.name = 'The Godfather (1972)';

    const film2 = createFilmItem('Star Wars', 0);
    filmList.appendChild(film2);
    film2.rating = 0;
    film2.name = 'Star Wars';

    const film3 = createFilmItem('Bad Boys', 0);
    filmList.appendChild(film3);
    film3.rating = 0;
    film3.name = 'Bad Boys';

    const film4 = createFilmItem('The Lord of the Rings', 0);
    filmList.appendChild(film4);
    film4.rating = 0;
    film4.name = 'The Lord of the Rings';
}

function main() {
    load();

    if (localStorage.length == 0) {
        createFirstFilms();
    }

    filmForm.addEventListener('submit', addFilm);

    Array.prototype.slice.call(filmItems).forEach(function (item) { bindEvents(item) });
}

main();









