const toggleBurger = () => {
    let burgerIcon = document.getElementById('burger');
    let dropMenu = document.getElementById('navbarOptions');
    burgerIcon.classList.toggle('is-active');
    dropMenu.classList.toggle('is-active');
  };


// Category: Movies Display
async function movieData () {
  const data1 = await fetch('/api/custom_movies');
  const getMovies = await data1.json();

  const table = document.querySelector(".target");
  const row = document.createElement("tr");
    row.innerHTML = 
    `
    <th>TITLE</th>
    <th>YEAR</th>
    <th>DURATION</th>
    <th>RATING</th>
    <th>GENRE</th>
    `;
    table.append(row);
  getMovies.forEach((movie) => {
    const movies = document.createElement("tr");
    movies.innerHTML = 
      `
      <th>${movie.title}</th>
      <td>${movie.year}</td>
      <td>${movie.duration}</td>
      <td>${movie.avg_star_rating}</td>
      <td>${movie.genre_name}</td>
      `;
    table.append(movies);
  });
 }

async function windowActions (){
  movieData();
};

window.onload = windowActions();
