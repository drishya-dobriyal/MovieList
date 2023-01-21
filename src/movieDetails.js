/* Fetch And Display Movie result */
async function displayDetails() {
  const pageUrl = window.location.href;
  const params = pageUrl.split("?")[1];
  const movieId = params.split("=")[1];
  const url = "https://www.omdbapi.com/?apikey=7ace29ee&i=" + movieId;

  const response = await fetch(url, {
    method: "GET",
  });
  const detail = await response.json();
  /* Update Details */
  document.getElementById("movie-poster").setAttribute("src", detail.Poster);
  document.getElementById("title").textContent = detail.Title;
  var dataNeeded = [
    "Title",
    "Year",
    "Released",
    "Runtime",
    "Genre",
    "Director",
    "Actors",
    "Plot",
    "imdbRating",
    "imdbID",
  ];
  for (let key of dataNeeded) {
    document.querySelector("#details-table tbody").innerHTML += `
        <tr>
            <td>${key}</td>
            <td>${detail[key]}</td>
        </tr>
    `;
  }
}
