function create_element(element, clas_list=""){
    const output = document.createElement(element);
    output.classList = clas_list;
    return output;
}

async function getTrendingMoviesPreview(){
    const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY);
    const data = await res.json();

    const res_categories = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY);
    const data_categories = await res_categories.json();
    const categories = data_categories.genres;

    const movies = data.results;
    console.log(movies)
    const movies_grid = document.getElementById("movies-grid--popular");
    movies.forEach(movie => {
        const poster = create_element("img", "movie-container--poster");
        poster.setAttribute("alt", movie.title);
        poster.setAttribute("src", "https://image.tmdb.org/t/p/w300"+movie.poster_path);

        const movie_info = create_element("div", "movie-container--movie-info");
        const title = create_element("p", "movie-info--title");
        title.innerText = movie.title;
        const date = create_element("p", "movie-info--date");
        date.innerHTML = '<span class="movie-info_icon icon-calendar"></span>&nbsp; ' + movie.release_date;
        const calification = create_element("p", "movie-info--calification");
        calification.innerHTML = '<span class="movie-info_icon icon-star"></span>&nbsp; ' + movie.vote_average;

        movie_info.appendChild(title);
        movie_info.appendChild(date)
        movie_info.appendChild(calification)

        const categories_container = create_element("div", "movie-info--categories-container");
        movie.genre_ids.forEach(genre => {
            const pill = create_element("div", "movie-info--categories-pill pill-"+genre+"-bg");
            pill.innerText = categories.filter(category => category.id === genre)[0].name;
            categories_container.appendChild(pill)
        });

        const movie_container = create_element("article", "movie_container");
        movie_container.appendChild(poster);
        movie_container.appendChild(movie_info);
        movie_container.appendChild(categories_container);

        movies_grid.appendChild(movie_container);
    });
}

async function getCategoriesPreview(){
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key="+API_KEY);
    const data = await res.json();

    const categories = data.genres;

    const categories_container = document.getElementById("categories-container");
    categories.forEach(category => {
        const pillCategory = create_element("div", "categories-pill pill-"+category.id+"-bg");
        pillCategory.innerText = category.name;
        categories_container.appendChild(pillCategory);
    });
}

getTrendingMoviesPreview()
getCategoriesPreview()