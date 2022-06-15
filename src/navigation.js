window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

custom_butn_search.addEventListener('click', () => {
    console.log("entro");
    location.hash ='#search='+ custom_input_search.value;
});

return_arrow.addEventListener("click", () => {
    history.back();
    //location.hash("Home");
});

function navigator(){

    if(location.hash.startsWith("#trends")){
        trendsPage();
    }
    else if(location.hash.startsWith("#search=")){
        searchPage();
    }
    else if(location.hash.startsWith("#movie=")){
        moviePage();
    }
    else if(location.hash.startsWith("#category=")){
      categoriesPage();
    }
    else{
        homePage();
    }
}


function trendsPage(){
    section_trending.classList.remove("d-none");
    generic_title_container.classList.remove("d-none")
    generic_title.innerText = "Tendencias";
    return_arrow_container.classList.remove("d-none");
    
    section_movie_data.classList.add("d-none");
    
    section_search.classList.add("d-none")

    section_categorie_movies.classList.add("d-none")

    section_index.classList.add("d-none");
    header_text_container.classList.add("d-none");

    getTrendingMovies();
}
function searchPage(){
    section_search.classList.remove("d-none")
    return_arrow_container.classList.remove("d-none");

    generic_title_container.classList.add("d-none")

    section_movie_data.classList.add("d-none");

    section_categorie_movies.classList.add("d-none")

    section_index.classList.add("d-none");
    header_text_container.classList.add("d-none");

    section_trending.classList.add("d-none");

    const hash = location.hash;
    const search_data = hash.slice(hash.indexOf("=")+1);
    
    getMoviesBySearch(search_data);
}
function moviePage(){
    section_movie_data.classList.remove("d-none");
    return_arrow_container.classList.remove("d-none");

    section_index.classList.add("d-none");
    header_text_container.classList.add("d-none");

    section_categorie_movies.classList.add("d-none")
    generic_title_container.classList.add("d-none")

    section_search.classList.add("d-none")

    section_trending.classList.add("d-none");

    const hash = location.hash;
    const movie_id = hash.slice(hash.indexOf("=")+1);
    getMovieById(movie_id);
    window.scrollTo(0, 0);
}
function categoriesPage(){
    section_categorie_movies.classList.remove("d-none")
    generic_title_container.classList.remove("d-none")
    return_arrow_container.classList.remove("d-none");

    section_movie_data.classList.add("d-none");

    section_index.classList.add("d-none");
    header_text_container.classList.add("d-none");

    section_search.classList.add("d-none");

    section_trending.classList.add("d-none");

    const hash = location.hash;
    const hashId = hash.slice(hash.indexOf("=")+1,hash.indexOf("-"));
    //console.log(hashId);
    getMoviesByCategory(hashId)
}
function homePage(){
    getTrendingMoviesPreview()

    section_index.classList.remove("d-none");
    header_text_container.classList.remove("d-none");

    section_movie_data.classList.add("d-none");
    return_arrow_container.classList.add("d-none");

    section_categorie_movies.classList.add("d-none")
    generic_title_container.classList.add("d-none")

    section_search.classList.add("d-none")

    section_trending.classList.add("d-none");
}