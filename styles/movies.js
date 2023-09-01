const params = new URLSearchParams(window.location.search);
const imdb = params.get("i");
const infoMovies = document.querySelector(".block-info");
const apikey = "f3312c8c";
fetch(`https://www.omdbapi.com/?i=${imdb}&apikey=${apikey}&full`)
   .then((response) => response.json())
   .then((data) => {
      infoMovies.innerHTML = "";
      const movieImg = data.Poster;
      const movieName = data.Title;
      const movieYears = data.Year;
      const movieRating = data.imdbRating;
      const movieData = data.Released;
      const movieRun = data.Runtime;
      const movieGenre = data.Genre;
      const movieDirect = data.Director;
      const movieActors = data.Actors;
      const movieText = data.Plot;
      const infoMoviesHTML = `<div class="info-movies">
            <div class="info-img">
               <img
                  src="${movieImg}"
                  alt=""
               />
            </div>
            <div class="info-text">
               <h2 class="name">${movieName}</h2>
               <h2 class="years">Years : <span> ${movieYears}</span></h2>
               <h2 class="rating">Rating : <span> ${movieRating}</span></h2>
               <h2 class="release">Release date : <span> ${movieData}</span></h2>
               <h2 class="duration">Run Time : <span> ${movieRun}</span></h2>
               <h2 class="genre">Genre : <span> ${movieGenre}</span></h2>
               <h2 class="directed">Directed by : <span> ${movieDirect}</span></h2>
               <h2 class="actors">Actors : <span> ${movieActors}</span></h2>
            </div>
         </div>
         <div class="big-text">
            <span>${movieText}</span>
         </div>`;
      infoMovies.innerHTML = infoMoviesHTML;
   });
