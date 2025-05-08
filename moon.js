let pageImage = document.querySelector('img');
let phase = document.querySelector('#phase');

let d = new Date();
let dd = d.getDate();
let mm = d.getMonth() + 1;
let yy = d.getFullYear();

const Moon = {
  phase: function (yy, mm, dd) {
    let c = (e = jd = b = 0);

    if (mm < 3) {
      yy--;
      mm += 12;
    }

    ++mm;
    c = 365.25 * yy;
    e = 30.6 * mm;
    jd = c + e + dd - 694039.09;
    jd /= 29.5305882;
    b = parseInt(jd);
    jd -= b;
    b = Math.round(jd * 8);
    if (b >= 8) b = 0;

    switch (b) {
      case 0:
        pageImage.src =
          'https://raw.githubusercontent.com/tallulahh/moon-phase/main/newmoon.png';
        phase.innerText = 'New Moon';
        break;
      case 1:
        pageImage.src =
          'https://raw.githubusercontent.com/tallulahh/moon-phase/main/waxingcrescent.png';
        phase.innerText = 'Waxing Crescent';
        break;
      case 2:
        pageImage.src =
          'https://raw.githubusercontent.com/tallulahh/moon-phase/main/firstquarter.png';
        phase.innerText = 'First Quarter';
        break;
      case 3:
        pageImage.src =
          'https://raw.githubusercontent.com/tallulahh/moon-phase/main/waxinggibbous.png';
        phase.innerText = 'Waxing Gibbous';
        break;
      case 4:
        pageImage.src =
          'https://raw.githubusercontent.com/tallulahh/moon-phase/main/fullmoon.png';
        phase.innerText = 'Full Moon';
        break;
      case 5:
        pageImage.src =
          'https://raw.githubusercontent.com/tallulahh/moon-phase/main/waninggibbous.png';
        phase.innerText = 'Waning Gibbous';
        break;
      case 6:
        pageImage.src =
          'https://raw.githubusercontent.com/tallulahh/moon-phase/main/lastquarter.png';
        phase.innerText = 'Last Quarter';
        break;
      case 7:
        pageImage.src =
          'https://raw.githubusercontent.com/tallulahh/moon-phase/main/waningcrescent.png';
        phase.innerText = 'Waning Crescent';
        break;
    }
  },
};

// Update on load
Moon.phase(yy, mm, dd);

// Search by date
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    dd = document.getElementById('day').value;
    mm = document.getElementById('month').value;
    yy = document.getElementById('year').value;

    Moon.phase(yy, mm, dd);
    document.getElementById('day').value = '';
    document.getElementById('month').value = '';
    document.getElementById('year').value = '';
    document.querySelector(
      '.imageHeader'
    ).innerText = `Moon phase on ${dd}/${mm}/${yy}:`;
  }
});

// Reveal input
document.querySelector('.searchBtn').addEventListener('click', function () {
  document.querySelector('.main').style.opacity = '1';
});
