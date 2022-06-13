function create_element(element, clas_list=""){
    const output = document.createElement(element);
    output.classList = clas_list;
    return output;
}

async function getTrendingMoviesPreview(){
    const res = await fetch("https:api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY);
    const data = await res.json();

    const movies = data.results;

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

        const movie_container = create_element("article", "movie_container");
        movie_container.appendChild(poster);
        movie_container.appendChild(movie_info);

        movies_grid.appendChild(movie_container);
    });
}

getTrendingMoviesPreview()