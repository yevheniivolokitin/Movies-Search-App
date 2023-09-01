let searchResult = [];
const movieSearch = document.querySelector(".movie-search");
const btn = document.querySelector(".btn");
const movieListHtml = document.querySelector(".movie-list");
const apikey = "f3312c8c";
let valueSerch = "";
function search() {
   valueSerch = movieSearch.value;
   fetch(`https://www.omdbapi.com/?s=${valueSerch}&apikey=${apikey}&`)
      .then((response) => response.json())
      .then((data) => {
         searchResult = data.Search;
         movieListHtml.innerHTML = "";
         if (data.Response === "True") {
            data.Search.forEach((movie) => {
               const moviePoster = movie.Poster;
               const movieTitle = movie.Title;
               const movieYears = movie.Year;
               const movieType = movie.Type;
               const imdbId = movie.imdbID;
               const movieList = `
                 <div class="movie">
                    <div class="movie-img"><img src="${moviePoster}" alt="" /></div>
                    <div class="movie-text">
                    <h2 class="movie-name">${movieTitle}</h2>
                    <h2 class="movie-years">${movieYears}</h2>
                    <h2 class="movie-type">${movieType}</h2>
                    <h2 style="display:none;" class="movie-id">${imdbId}</h2>
                    </div>
                </div>
                        `;
               movieListHtml.insertAdjacentHTML("beforeend", movieList);
               movieSearch.value = "";
            });
            movieListHtml.addEventListener("click", function (event) {
               const selectedElement = event.target.closest(".movie");
               if (selectedElement) {
                  const imdb =
                     selectedElement.querySelector(".movie-id").textContent;
                  const params = new URLSearchParams();
                  params.set("i", imdb);
                  sessionStorage.setItem(
                     "search",
                     JSON.stringify(searchResult)
                  );
                  window.location.href = `movies.html?${params.toString()}`;
               }
            });
         }
      });
}
window.addEventListener("load", function () {
   const needStorage = sessionStorage.getItem("search");
   if (needStorage) {
      searchResult = JSON.parse(needStorage);
      movieListHtml.innerHTML = "";

      searchResult.forEach((movie) => {
         const moviePoster = movie.Poster;
         const movieTitle = movie.Title;
         const movieYears = movie.Year;
         const movieType = movie.Type;
         const imdbId = movie.imdbID;
         const movieList = `
                 <div class="movie">
                    <div class="movie-img"><img src="${moviePoster}" alt="" /></div>
                    <div class="movie-text">
                    <h2 class="movie-name">${movieTitle}</h2>
                    <h2 class="movie-years">${movieYears}</h2>
                    <h2 class="movie-type">${movieType}</h2>
                    <h2 style="display:none;" class="movie-id">${imdbId}</h2>
                    </div>
                </div>
                        `;
         movieListHtml.insertAdjacentHTML("beforeend", movieList);
         movieSearch.value = "";
      });
      movieListHtml.addEventListener("click", function (event) {
         const selectedElement = event.target.closest(".movie");
         if (selectedElement) {
            const imdb = selectedElement.querySelector(".movie-id").textContent;
            const params = new URLSearchParams();
            params.set("i", imdb);
            sessionStorage.setItem("search", JSON.stringify(searchResult));
            window.location.href = `movies.html?${params.toString()}`;
         }
      });
   }
});

btn.addEventListener("click", function () {
   search();
});
movieSearch.addEventListener("keydown", (event) => {
   if (event.key === "Enter") {
      search();
   }
});
