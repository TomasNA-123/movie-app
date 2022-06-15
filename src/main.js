const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
    params: {
        "api_key": API_KEY,
    },
});

function create_element(element, clas_list=""){
    const output = document.createElement(element);
    output.classList = clas_list;
    return output;
}

async function getTrendingMoviesPreview(){
    const { data } = await api("trending/movie/day");
    
    const data_categories = await api("genre/movie/list");
    const categories = data_categories.data.genres;

    const movies = data.results;

    createMoviesCards(movies, categories, movies_grid);
}

async function getCategoriesPreview(){
    const data_categories = await api("genre/movie/list");
    const categories = data_categories.data.genres;

    categories.forEach(category => {
        const pillCategory = create_element("a", "categories-pill pill-"+category.id+"-bg");
        pillCategory.setAttribute("href", "#category="+category.id+"-"+category.name.replace(" ", "_") );
        pillCategory.innerText = category.name;
        top_categories_container.appendChild(pillCategory);
    });
}

//Creamos peliculas por categoria
async function getMoviesByCategory(id){
    const { data } = await api("discover/movie",{
        params: {
            with_genres: id,
        }
    });
    
    const data_categories = await api("genre/movie/list");
    const categories = data_categories.data.genres;

    generic_title.innerText = categories.filter( category => category.id == id )[0].name;

    const movies = data.results;

    createMoviesCards(movies, categories, movies_grid_categories);
}

async function getMoviesBySearch(query){
    console.log(query)
    const { data } = await api("search/movie",{
        params: {
            query,
        },
    });
    
    const data_categories = await api("genre/movie/list");
    const categories = data_categories.data.genres;

    const movies = data.results;

    createMoviesCards(movies, categories, grid_search);
}

async function getTrendingMovies(){
    const { data } = await api("trending/movie/day");
    
    const data_categories = await api("genre/movie/list");
    const categories = data_categories.data.genres;

    const movies = data.results;

    createMoviesCards(movies, categories, grid_trending);
}

async function getMovieById(movie_id){
    const { data: movie } = await api("movie/"+movie_id,{
        params: {
            query: movie_id,
        },
    });
    
    const data_categories = await api("genre/movie/list");
    const categories = data_categories.data.genres;

    console.log(movie);
    document.getElementById("movie-data-image").setAttribute("src", "https://image.tmdb.org/t/p/w300"+movie.poster_path)
    document.getElementById("movie-data--title").innerText = movie.title;
    document.getElementById("movie-data--date").innerHTML = '<span class="movie-info_icon icon-calendar"></span>&nbsp; ' + movie.release_date;
    document.getElementById("movie-data--calification").innerHTML = '<span class="movie-info_icon icon-star"></span>&nbsp; ' + movie.vote_average;
    document.getElementById("description--content"). innerText = movie.overview;
    const cardCategoriesContiner = document.getElementById("movie-data--categories");
    genre_ids = movie.genres.map( item => item.id );
    cardCategoriesContiner.innerHTML = "";
    cardCategoriesContiner.appendChild(createCategoriesInCards(genre_ids, categories, "pill_moviePage"));
}



//crear cards peliculas
function createMoviesCards(movies, categories, movies_container){
    movies_container.innerHTML = "";
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

        const categories_container = createCategoriesInCards(movie.genre_ids, categories);

        const movie_container = create_element("article", "movie_container");
        movie_container.appendChild(poster);
        movie_container.appendChild(movie_info);
        movie_container.appendChild(categories_container);

        movie_container.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
        })
        movies_container.appendChild(movie_container);
    });
}

function createCategoriesInCards(genres, categories, pillClass){
    const categories_container = create_element("div", "movie-info--categories-container");
    genres.forEach(genre => {
        const pill = create_element("div", "movie-info--categories-pill pill-"+genre+"-bg "+pillClass);
        pill.innerText = categories.filter(category => category.id === genre)[0].name;
        categories_container.appendChild(pill);
    });
    return categories_container;
}


getCategoriesPreview()