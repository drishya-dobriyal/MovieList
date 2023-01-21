/* Open Movie Details Page */
function openDetailsPage(id) {
  event.preventDefault();
  window.open("src/movieDetails.html?movieId=" + id, "_blank");
}

/* Add or remove Movie to Favourite List that is stored in localStorage */
function updateFavorateList(id) {
  console.log(id);
  let list = localStorage.getItem("favoriteList");
  list = !list ? [] : JSON.parse(list);
  if (list.includes(id)) {
    /* Remove movie id from favorate list */
    document.getElementById(id).querySelector("i").style.color = "white";
    list = list.filter((currId) => currId != id);
  } else {
    /* add to favorite list */
    document.getElementById(id).querySelector("i").style.color = "red";
    list.push(id);
  }
  localStorage.setItem("favoriteList", JSON.stringify(list));
}

/* Create Individual Movie Card */
function movieCard(detail) {
  let list = localStorage.getItem("favoriteList");
  let color = !list || !list.includes(detail.imdbID) ? "white" : "red";
  return `<div class="movie-card" id="${detail.imdbID}">
    <div id="movie-card-poster" onclick="openDetailsPage('${detail.imdbID}')">\
      <img src="${detail.Poster}" alt="Poster of ${detail.Title} movie" />
    </div>
    <div class="movie-card-details">
        <h2 class="movie-card-title">${detail.Title} (${detail.Year})</h2>
        <h2 class="favourite-icon" onclick="updateFavorateList('${detail.imdbID}')" title="Update Favorite List"><i class="fa fa-heart"  style="color:${color};"></i></h2>
    </div>
  </div>`;
}

/* Display Seach Reasult */
function displaySearchResult(movieList) {
  const searchResultEle = document.getElementById("search-result-container");
  searchResultEle.innerHTML = "";
  for (let movie of movieList) {
    searchResultEle.innerHTML += movieCard(movie);
  }
}

/* Display Error Message */
function displayErrorMessage(error) {
  const searchResultEle = document.getElementById("search-result-container");
  searchResultEle.innerHTML = `
  <div id="show-error">Oops! Error ${error}</div>
  `;
}
/* Search Movie */
async function searchMovie() {
  const movieName = document.getElementById("search-movie-title").value;
  const response = await fetch(
    "https://www.omdbapi.com/?apikey=7ace29ee&s=" + movieName,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  console.log(data);
  if (data.Response == "False" || data.Error) {
    displayErrorMessage(data.Error);
    return;
  }
  const movieList = data.Search;
  console.log(data);
  displaySearchResult(movieList);
}

document
  .getElementById("search-movie-title")
  .addEventListener("keyup", searchMovie);
