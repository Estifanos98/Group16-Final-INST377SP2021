/* eslint-disable operator-linebreak */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
async function studioName () {
  const data = await fetch("/api/studio");
  const getStudio = await data.json();

  const studioArray = getStudio.data;
  const table = document.querySelector(".target");
  studioArray.forEach((studio) => {
    const studios = document.createElement("tr");
    studios.innerHTML = 
        `
        <th>${studio.studio_id}</th>
        <td>${studio.studio_name}</td>
        `;
    table.append(studios); 
  });
}

window.onload = studioName();