const elForm = document.querySelector('.js-form');
const elList = document.querySelector('.js-list');
const elInpSearch = document.querySelector('.js-input-search');
const elInpStartYear = document.querySelector('.js-start-year-input');
const elInpEndYear = document.querySelector('.js-end-year-input');
const elRefreshBtn = document.querySelector('.js-refresh-btn');
renderMovie(movies);

elInpSearch.addEventListener('keyup', (evt) => {
    let arr = movies.filter((item) => { return item.Title.toLowerCase().startsWith(`${elInpSearch.value.toLowerCase()}`); });
    renderMovie(arr);
});

elRefreshBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  renderMovie(movies);
});

elForm.addEventListener('submit', (evt) => {
   evt.preventDefault();
   
   if(elInpStartYear.value.length == 0 && elInpEndYear.value.length == 0) {
       elInpStartYear.classList.add('error');
       elInpEndYear.classList.add('error');
       return;
   }else {
       elInpStartYear.classList.remove('error');
       elInpEndYear.classList.remove('error');
   }
   let arr = [];
   if(elInpStartYear.value.length == 0 && elInpEndYear.value.length > 0) { 
     arr = movies.filter((item) => {
        return item.movie_year <= elInpEndYear.value;
       });
   }else if(elInpEndYear.value.length == 0 && elInpStartYear.value.length > 0) {
     arr = movies.filter((item) => {
        return item.movie_year >= elInpStartYear.value;
     });
   }else {
    if(elInpStartYear.value > elInpEndYear.value) {
        elInpStartYear.classList.add('error');
        elInpEndYear.classList.add('error');
        return;
    } 

     arr = movies.filter((item) => {
        return item.movie_year >= elInpStartYear.value && item.movie_year <= elInpEndYear.value;
      });

   }

  
   
   if(arr.length == 0) {
    elList.innerHTML = ''; 
    elList.innerHTML = '<p class="no-data-desc">No movie available with this years !</p>';
   }else {
    renderMovie(arr);
   }

}); 









function renderMovie(arr) {
    elList.innerHTML = '';
    arr.forEach((item, index) => {

        if(index == 50) {
            return;
        }
       let length_hour = String(Math.floor(Number(item.runtime) / 60)).padStart(2, '0');
       let length_minutes = String(Number(item.runtime) % 60).padStart(2, '0');
       let summary = item.summary.split(' ');
       if(summary.length > 20) {
        summary = summary.slice(0, 20).join(' ');
       }
        elList.innerHTML += 
      
      `<li class="list__item">
      <div class="list__img-wrapper">
       <img class="list__img" src="https://i3.ytimg.com/vi/${item.ytid}/maxresdefault.jpg" width="300" height="375" alt="movie">
       <a class="list__movie-link" href="https://www.imdb.com/title/${item.imdb_id}/" target="_blank">
           <img src="./images/play.png" width="18" height="18" alt="play button icon">
       </a>
      </div>
      <div class="list__movie-info-wrapper">
       <img class="list__movie-info-img" src="https://i3.ytimg.com/vi/${item.ytid}/maxresdefault.jpg" width="100" height="125" alt="movie">
          <div class="list__movie-info-inner-wrapper">
              <h3 class="list__movie-name" title="${item.Title}">
                ${item.Title}
              </h3>
              <p class="list__movie-rating" title="rating">
               rating: 
               <span class="list__movie-rating-text" title="${item.imdb_rating}">
                ${item.imdb_rating}
               </span>
           </p>
          </div>
          <div class="list__movie-details-wrapper details">
            <div class="details__wrapper">
               <strong class="details__name" title="Length">
                   Length
               </strong>
               <span class="details__desc" title="${length_hour}:${length_minutes}">
                    ${length_hour}:${length_minutes} 
               </span>
            </div>
            <div class="details__wrapper">
               <strong class="details__name" title="Lang">
                   Lang
               </strong>
               <span class="details__desc" title="">
                   ${item.language}
               </span>
            </div>
            <div class="details__wrapper">
               <strong class="details__name" title="Year">
                   Year
               </strong>
               <span class="details__desc" title="${item.movie_year}">
                   ${item.movie_year}
               </span>
            </div>
            <div class="details__wrapper">
               <strong class="details__name" title="">
                   Category
               </strong>
               <span class="details__desc" title="${item.Categories}">
                   ${item.Categories.indexOf('|') ? item.Categories.slice(0, item.Categories.indexOf('|')) : item.Categories }
               </span>
            </div>
          </div>
          <div class="list__summary-wrapper">
            <h4 class="list__summary-title" title="Summary">Summary: </h4>
            <p class="list__summary-desc" title="${item.summary}">
               ${summary != '' ? summary +  '...' : "There is no summary for this movie"}
            </p>
          </div>
      </div>
  </li>`;
    });
}

