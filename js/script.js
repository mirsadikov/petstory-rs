const slider = document.querySelector('.pets__cards');
const sliderPrev = document.querySelector('.pets__slider-btn--left');
const sliderNext = document.querySelector('.pets__slider-btn--right');
const scroller = document.querySelector('#testimonials-slider');
const testimonials_wrapper = document.querySelector(
  '.testimonials__cards-wrapper',
);
const testimonial_cards = document.querySelector('.testimonials__cards');
const testimonial_card_list = document.querySelectorAll('.testimonials__card');
const testimonials_modal = document.querySelector('.testimonials__modal');
const testimonials_modal_close_layer = document.querySelector(
  '.testimonials__modal-layer',
);

const animalsJSON = [
  {
    img: '/img/panda.png',
    title: 'Giant pandas',
    desc: 'Native to Southwest China',
    food: '/img/banana-bamboo_icon.svg',
  },
  {
    img: '/img/eagle.png',
    title: 'Eagles',
    desc: 'Native to South America',
    food: '/img/meet-fish_icon.svg',
  },
  {
    img: '/img/gorilla.png',
    title: 'Gorillas',
    desc: 'Native to Congo',
    food: '/img/banana-bamboo_icon.svg',
  },
  {
    img: '/img/sloth.png',
    title: 'Two-toed Sloth',
    desc: 'Mesoamerica, South America',
    food: '/img/banana-bamboo_icon.svg',
  },
  {
    img: '/img/cheetah.png',
    title: 'Cheetahs',
    desc: 'Native to Africa',
    food: '/img/meet-fish_icon.svg',
  },
  {
    img: '/img/penguin.png',
    title: 'Penguins',
    desc: 'Native to Antarctica',
    food: '/img/meet-fish_icon.svg',
  },
  {
    img: '/img/gorilla2.png',
    title: 'Gorillas',
    desc: 'Native to Congo',
    food: '/img/banana-bamboo_icon.svg',
  },
  {
    img: '/img/alligator.png',
    title: 'Alligators',
    desc: 'Native to Southeastern United States',
    food: '/img/meet-fish_icon.svg',
  },
  {
    img: '/img/fox.png',
    title: 'Foxes',
    desc: 'Native to North America',
    food: '/img/meet-fish_icon.svg',
  },
];

function checkSlideProps() {
  if (window.innerWidth < 1000 && window.innerWidth > 500) {
    slider.config = { slidesPerView: 4, gap: 3 };
  } else if (window.innerWidth < 501) {
    slider.config = { slidesPerView: 4, gap: 3 };
  } else {
    slider.config = { slidesPerView: 6, gap: 3 };
  }
}

function checkScrollerProps() {
  if (window.innerWidth <= 1366 && window.innerWidth > 800) {
    scroller.setAttribute('max', testimonial_card_list.length - 3);
    scroller.slidesPerView = 3;
  } else if (window.innerWidth <= 800) {
    scroller.setAttribute('max', testimonial_card_list.length - 2);
    scroller.slidesPerView = 2;
  } else {
    scroller.setAttribute('max', testimonial_card_list.length - 4);
    scroller.slidesPerView = 4;
  }
}

function arrayShuffle(o) {
  for (
    var j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}

document.addEventListener('DOMContentLoaded', function () {
  // alert('Please give me some time to finish it all, thanks')
  checkSlideProps();
  const { slidesPerView, gap } = slider.config;
  renderNRandomAnimals(slidesPerView, 'beforeend');

  sliderPrev.addEventListener('click', function () {
    if (slider.animating) return;
    slider.animating = true;
    renderNRandomAnimals(slidesPerView, 'afterbegin');
    slider.style.transform = `translateX(calc(-100% - ${gap}rem))`;
    setTimeout(() => {
      slider.style.transition = 'transform 0.5s ease-in-out';
      slider.style.transform = 'translateX(0)';

      setTimeout(() => {
        slider.style.transition = 'none';

        for (let i = 0; i < slidesPerView; i++) {
          slider.removeChild(slider.lastElementChild);
        }

        slider.animating = false;
      }, 500);
    });
  });

  sliderNext.addEventListener('click', function () {
    if (slider.animating) return;
    slider.animating = true;
    renderNRandomAnimals(slidesPerView, 'beforeend');
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(calc(-100% - ${gap}rem))`;

    setTimeout(() => {
      for (let i = 0; i < slidesPerView; i++) {
        slider.removeChild(slider.firstElementChild);
      }

      slider.style.transition = 'none';
      slider.style.transform = 'translateX(0)';
      slider.animating = false;
    }, 500);
  });

  checkScrollerProps();

  scroller.addEventListener('input', function () {
    testimonial_cards.style.transform = `translateX(calc(-${
      (this.value * 100) / scroller.slidesPerView
    }% - ${(this.value * 3) / scroller.slidesPerView}rem))`;
  });

  if (window.innerWidth <= 640) {
    testimonial_cards.addEventListener('click', function (e) {
      const card = e.target.closest('.testimonials__card');
      if (card) {
        testimonials_modal.classList.add('testimonials__modal--show');
        testimonials_modal.innerHTML = '';
        const cardClone = card.cloneNode(true);
        cardClone.insertAdjacentHTML(
          'afterbegin',
          "<div class='testimonials__modal-close'>X</div>",
        );
        testimonials_modal.appendChild(cardClone);
      }
      document
        .querySelector('.testimonials__modal-close')
        .addEventListener('click', function () {
          testimonials_modal.classList.remove('testimonials__modal--show');
        });
    });

    testimonials_modal.addEventListener('click', function (e) {
      if (!e.target.closest('.testimonials__card'))
        testimonials_modal.classList.remove('testimonials__modal--show');
    });
  }
});

function renderNRandomAnimals(n, place) {
  arrayShuffle(animalsJSON)
    .slice(0, n)
    .forEach((animal) => {
      const animalCard = document.createElement('a');
      animalCard.classList.add('pets__card');
      animalCard.href = '#';

      const animalImg = document.createElement('img');
      animalImg.classList.add('pets__card-img');
      animalImg.src = animal.img;
      animalImg.alt = animal.title;

      const animalCap = document.createElement('div');
      animalCap.classList.add('pets__card-cap');

      const animalTitle = document.createElement('h4');
      animalTitle.classList.add('pets__card-title', 'text-btn');
      animalTitle.textContent = animal.title;

      const animalDesc = document.createElement('p');
      animalDesc.classList.add('pets__card-desc', 'text-small');
      animalDesc.textContent = animal.desc;

      const animalFood = document.createElement('img');
      animalFood.classList.add('pets__card-food');
      animalFood.src = animal.food;
      animalFood.alt = animal.title;

      animalCap.appendChild(animalTitle);
      animalCap.appendChild(animalDesc);

      animalCard.appendChild(animalImg);
      animalCard.appendChild(animalCap);
      animalCard.appendChild(animalFood);

      // slider.appendChild(animalCard);
      slider.insertAdjacentElement(place, animalCard);
    });
}
