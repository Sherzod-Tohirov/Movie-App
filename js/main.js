const elForm = document.querySelector('.js-form');
const elList = document.querySelector('.js-list');
const elInpSearch = document.querySelector('.js-input-search');
const elInpStartYear = document.querySelector('.js-start-year-input');
const elInpEndYear = document.querySelector('.js-end-year-input');
const elRefreshBtn = document.querySelector('.js-refresh-btn');
const elWatchLaterBtn = document.querySelector('.js-watch-later-btn');
const elWatchLater = document.querySelector('.js-watch-later');
const elWatchCloseBtn = document.querySelector('.js-watch-close-btn');
const elWatchLaterList = document.querySelector('.js-watch-later-list');
const elWatchLaterRemoveAllBtn = document.querySelector('.js-remove-all-btn');
let watchLaterList = [];
let copy_movies = movies;
renderMovie(copy_movies);

if (localStorage.getItem('watchLaterData')) {
  watchLaterList = JSON.parse(localStorage.getItem('watchLaterData'));
  elWatchLaterRemoveAllBtn.style.display = 'block';
  renderWatchLater(watchLaterList);
}

elInpSearch.addEventListener('keyup', (evt) => {
  let arr = movies.filter((item) => {
    return item.Title.toLowerCase().startsWith(`${elInpSearch.value.toLowerCase()}`);
  });
  if (arr.length > 0) {
    copy_movies = arr;
    renderMovie(arr);
  } else {
    elList.innerHTML = '';
    elList.innerHTML = '<p class="no-data-desc">No movie available with this name !</p>';
  }
});

elRefreshBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  renderMovie(movies);
});

elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (elInpStartYear.value.length == 0 && elInpEndYear.value.length == 0) {
    elInpStartYear.classList.add('error');
    elInpEndYear.classList.add('error');
    setInterval(() => {
      elInpStartYear.classList.remove('error');
      elInpEndYear.classList.remove('error');
    }, 3000);
    clearInterval();
    return;
  } else {
    elInpStartYear.classList.remove('error');
    elInpEndYear.classList.remove('error');
  }
  let arr = [];
  if (elInpStartYear.value.length == 0 && elInpEndYear.value.length > 0) {
    arr = copy_movies.filter((item) => {
      return item.movie_year <= elInpEndYear.value;
    });
    copy_movies = arr;
  } else if (elInpEndYear.value.length == 0 && elInpStartYear.value.length > 0) {
    arr = copy_movies.filter((item) => {
      return item.movie_year >= elInpStartYear.value;
    });
    copy_movies = arr;
  } else {
    if (elInpStartYear.value > elInpEndYear.value) {
      elInpStartYear.classList.add('error');
      elInpEndYear.classList.add('error');
      setInterval(() => {
        elInpStartYear.classList.remove('error');
        elInpEndYear.classList.remove('error');
      }, 5000);
      clearInterval();
      return;
    }

    arr = copy_movies.filter((item) => {
      return item.movie_year >= elInpStartYear.value && item.movie_year <= elInpEndYear.value;
    });

    copy_movies = arr;

  }



  if (copy_movies.length == 0) {
    elList.innerHTML = '';
    elList.innerHTML = '<p class="no-data-desc">No movie available with this years !</p>';
  } else {
    renderMovie(copy_movies);
  }

});



elWatchLaterBtn.addEventListener('click', (evt) => {
  elWatchLater.classList.toggle('watch-later-move');
  elWatchLaterBtn.classList.toggle('watch-later-list-btn-none');
});

elWatchCloseBtn.addEventListener('click', (evt) => {
  elWatchLater.classList.toggle('watch-later-move');
  elWatchLaterBtn.classList.toggle('watch-later-list-btn-none');
});



removeWatchLater();


function removeWatchLater() {
  const elWatchRemoveBtn = document.querySelectorAll('.js-watch-remove-btn');

  elWatchRemoveBtn.forEach(btn => {
    btn.addEventListener('click', (evt) => {
      let name = evt.target.parentElement.childNodes[1];
      let foundItemIndex = watchLaterList.findIndex(item => {
        return item.Title === name.innerText;
      });

      watchLaterList.splice(foundItemIndex, 1);

      localStorage.setItem('watchLaterData', JSON.stringify(watchLaterList));

      renderWatchLater(watchLaterList);
    });
  });

  if (elWatchLaterList.innerHTML == '') {
    elWatchLaterRemoveAllBtn.style.display = 'none';
    elWatchLaterList.innerHTML = `<p class="watch-later__no-data-desc" title="No movie available">No movie available !</p>`;
  }

}

elWatchLaterRemoveAllBtn.addEventListener('click', (evt) => {
  watchLaterList = [];
  localStorage.removeItem('watchLaterData');
  evt.target.remove();
  elWatchLaterList.innerHTML = `<p class="watch-later__no-data-desc" title="No movie available">No movie available !</p>`;
});


checkList();



function renderWatchLater(arr) {
  elWatchLaterList.innerHTML = '';
  arr.forEach(item => {
    elWatchLaterList.innerHTML +=
      `<li class="watch-later__item">
                 <a class="watch-later__link" href="https://www.imdb.com/title/${item.imdb_id}/" target="_blank">
                   <img class="watch-later__img" src="https://i3.ytimg.com/vi/${item.ytid}/maxresdefault.jpg" width="100" height="80" alt="">
                 </a>
                 <div class="watch-later__item-details-wrapper">
                     <strong class="watch-later__inner-title" title=" ${item.Title}">
                         ${item.Title}
                     </strong>
                     <button class="watch-later__remove-btn js-watch-remove-btn" type="button"></button>
                 </div>
               </li>`
  });

  elWatchLaterRemoveAllBtn.style.display = 'block';

  removeWatchLater();
  checkList();

}




function renderMovie(arr) {
  elList.innerHTML = '';
  let count = 1;
  arr.forEach((item, index) => {

    if (index == 50) {
      return;
    }
    let length_hour = String(Math.floor(Number(item.runtime) / 60)).padStart(2, '0');
    let length_minutes = String(Number(item.runtime) % 60).padStart(2, '0');
    let summary = item.summary.split(' ');
    if (summary.length > 20) {
      summary = summary.slice(0, 20).join(' ');
    }
    elList.innerHTML +=

      `<li class="list__item">
      <div class="list__img-wrapper">
       <span class="msg js-msg" data-id='${count}'></span>
       <img class="list__img" src="https://i3.ytimg.com/vi/${item.ytid}/maxresdefault.jpg" width="300" height="169" alt="movie">
       <button class="list__watch-later-btn js-watch-later-adder-btn" type="button" title="watch later"></button>
       <a class="list__movie-link" href="https://www.imdb.com/title/${item.imdb_id}/" target="_blank" data-id=${item.imdb_id}>
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
                    ${length_hour != 0 && length_minutes != 0 ? length_hour + ':' + length_minutes : 'N/A'}  
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
                   ${item.Categories.indexOf('|') ? item.Categories.slice(0, item.Categories.indexOf('|')) : item.Categories}
               </span>
            </div>
          </div>
          <div class="list__summary-wrapper">
            <h4 class="list__summary-title" title="Summary">Summary: </h4>
            <p class="list__summary-desc" title="${item.summary}">
               ${summary != '' ? summary +  `...`  : "There is no summary for this movie"}
               <button class="modal-btn js-modal-btn" data-id=${item.imdb_id}>More info</button>
            </p>
          </div>
      </div>
  </li>`;
    count++;
  });
}


function checkList() {
  const elWatchLaterAdderBtn = document.querySelectorAll('.js-watch-later-adder-btn');
  let elMsg = document.querySelectorAll('.js-msg');
  elWatchLaterAdderBtn.forEach((btn, index) => {
    let data = [...elMsg];
    let val;
    btn.addEventListener('click', (evt) => {

      let id = evt.target.nextElementSibling.dataset.id;
      let foundItem = movies.find(item => {
        return item.imdb_id == id;
      });
      if (!watchLaterList.includes(foundItem)) {
        for (item in data) {
          if (data[item].dataset.id == index + 1) {
            val = data[item];
            break;
          }
        }
        if (val) {
          val.style.display = 'block';
          val.classList.toggle('msg-success');
          val.innerHTML = 'Added to the list sucessfully !';
          watchLaterList.push(foundItem);
          setTimeout(() => {
            val.style.display = 'none';
            val.classList.remove('msg-success');
          }, 1000);
          localStorage.setItem('watchLaterData', JSON.stringify(watchLaterList));
        }

        renderWatchLater(watchLaterList);
      } else {

        if (val) {
          val.style.display = 'block';
          val.classList.toggle('msg-error');
          val.innerHTML = 'Already in the list !';
          setTimeout(() => {
            val.style.display = 'none';
            val.classList.remove('msg-error');
          }, 1000);
          console.log("This movie is already added to watch list !");
        }
      }


    });
  });
}