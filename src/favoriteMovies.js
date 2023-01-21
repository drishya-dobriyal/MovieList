/* Remove A movie From */
function removFromFavorite(id) {
  document.getElementById(id).remove();
  let list = localStorage.getItem("favoriteList");
  if (!list) {
    list = [];
  } else {
    list = JSON.parse(list);
  }
  list = list.filter((currId) => currId != id);
  localStorage.setItem("favoriteList", JSON.stringify(list));
  if (list.length <= 0) {
    document.getElementById("no-data-available").style.display = "block";
  }
}

/* Open Movie Details Page */
function openDetailsPage(id) {
  event.preventDefault();
  window.open("./movieDetails.html?movieId=" + id, "_blank");
}

/* Create Movie Card */
function movieCard(detail) {
  return `<div class="movie-card" id="${detail.imdbID}">
      <div id="movie-card-poster" onclick="openDetailsPage('${detail.imdbID}')">\
        <img src="${detail.Poster}" alt="Poster of ${detail.Title} movie" />
      </div>
      <div class="movie-card-details">
          <h2 class="movie-card-title">${detail.Title} (${detail.Year})</h2>
          <h2 class="favourite-icon" onclick="removFromFavorite('${detail.imdbID}')" title="Remove From favourite"><i class="fa fa-heart" style="color:red;"></i></h2>
      </div>
    </div>`;
}

/* Fetch favorite List and Create List */
async function createList() {
  const listContainer = document.getElementById("favorite-movies");
  /* Take Movie list from localstorage */
  const movieList = JSON.parse(localStorage.getItem("favoriteList"));
  document.getElementById("no-data-available").style.display = "none";
  for (let id of movieList) {
    /* Fetch Movie details */
    const url = "https://www.omdbapi.com/?apikey=7ace29ee&i=" + id;
    const response = await fetch(url, {
      method: "GET",
    });
    const detail = await response.json();
    listContainer.innerHTML += movieCard(detail);
  }
  /* No Movie Present in the list */
  if (movieList.length <= 0) {
    document.getElementById("no-data-available").style.display = "block";
  }
}
