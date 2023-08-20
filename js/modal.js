const elOverlay = document.querySelector('.js-overlay');
const elModal = document.querySelector('.js-modal');

const elModalBtns = document.querySelectorAll('.js-modal-btn');
let data;






elOverlay.addEventListener('click', (evt) => {
  elOverlay.style.display = 'none';
  elModal.classList.toggle('modal-appear');
});

elModalBtns.forEach(btn => {
  btn.addEventListener('click', (evt) => {
    elOverlay.style.display = 'block';
    elModal.classList.toggle('modal-appear');
  });
});

elModalBtns.forEach(btn => {
  btn.addEventListener('click', (evt) => {

    data = movies.find(item => {
      return item.imdb_id == btn.dataset.id;
    });
    if (data) {
       renderModal(data);
       const elModalCloseBtn = document.querySelector('.js-modal-close-btn');
       elModalCloseBtn.addEventListener('click', (evt) => {
	   console.log("Clicked");
	   elOverlay.style.display = 'none';
	   elModal.classList.toggle('modal-appear');
 });

    }


  });

});




function renderModal(data) {
  let length_hour = String(Math.floor(Number(data.runtime) / 60)).padStart(2, '0');
  let length_minutes = String(Number(data.runtime) % 60).padStart(2, '0');
  elModal.innerHTML =

    `
	  <button class="modal__close-btn js-modal-close-btn" type="button">&times;</button>
       <div class="modal__wrapper">
           <h2 class="modal__title" title="${data.Title}">${data.Title}</h2>
           <div class="modal__details-wrapper">
             <img class="modal__img" src="https://i3.ytimg.com/vi/${data.ytid}/maxresdefault.jpg" width="300" height="169" alt="image">
             <div class="modal__inner-details-wrapper">
                <p class="modal__desc" title="desc"><strong class="modal__strong">Rating: </strong>${data.imdb_rating}</p>
                <p class="modal__desc" title="desc"><strong class="modal__strong">Language: </strong> ${data.language}</p>
                <p class="modal__desc" title="desc"><strong class="modal__strong">Length: </strong>  ${length_hour != 0 && length_minutes != 0 ? length_hour + ':' + length_minutes : 'N/A'} </p>
                <p class="modal__desc" title="desc"><strong class="modal__strong">Category: </strong> ${data.Categories}</p>
             </div>
           </div>
           <h3 class="modal__summary-title" title="smth">Summary: </h3>
             <p class="modal__summary" title="smth">${data.summary || "There is no summary for this movie..."}</p>
       </div>

	`
}