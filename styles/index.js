let searchResult = [];
const movieSearch = document.querySelector(".movie-search");
const btn = document.querySelector(".btn");
const movieListHtml = document.querySelector(".movie-list");
const apikey = "f3312c8c";
const id = "4";
let valueSerch = "";
function search() {
   valueSerch = movieSearch.value;
   console.log(valueSerch);
   fetch(`https://www.omdbapi.com/?s=${valueSerch}&apikey=${apikey}&`)
      .then((response) => response.json())
      .then((data) => {
         console.log(data);
         searchResult = data.Search;
         movieListHtml.innerHTML = "";
         if (data.Response === "True") {
            data.Search.forEach((movie) => {
               const moviePoster = movie.Poster;
               const movieTitle = movie.Title;
               const movieYears = movie.Year;
               const movieType = movie.Type;
               const movieList = `
                 <div class="movie">
                    <div class="movie-img"><img src="${moviePoster}" alt="" /></div>
                    <div class="movie-text">
                    <h2 class="movie-name">${movieTitle}</h2>
                    <h2 class="movie-years">${movieYears}</h2>
                    <h2 class="movie-type">${movieType}</h2>
                    </div>
                </div>
                        `;
               movieListHtml.insertAdjacentHTML("beforeend", movieList);
               movieSearch.value = "";
            });
         }
      });
}
btn.addEventListener("click", function () {
   search();
});
movieSearch.addEventListener("keydown", (event) => {
   if (event.key === "Enter") {
      search();
   }
});
