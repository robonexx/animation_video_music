function getMoonAge(date = new Date()) {
  const lunarCycle = 29.530588853;
  const knownNewMoon = new Date('2000-01-06T18:14:00Z');
  const daysSinceNewMoon = (date - knownNewMoon) / 1000 / 60 / 60 / 24;
  const moonAge = daysSinceNewMoon % lunarCycle;
  return moonAge >= 0 ? moonAge : moonAge + lunarCycle;
}

function setMoonPhaseAnimation() {
  const moonWrapper = document.querySelector('.moon-wrapper');
  const moon = document.querySelector('.moon');

  const moonAge = getMoonAge();
  const lunarCycle = 29.530588853;

  const animationPercentage = (moonAge / lunarCycle) * 100;

  if (moon) {
    moon.style.animationPlayState = 'paused';
    moon.style.setProperty('animation-delay', `-${animationPercentage}%`);

    moon.style.setProperty('--moon-phase-percent', `${animationPercentage}%`);
  }
  if (moonWrapper) {
    moonWrapper.style.animation = 'none';
  }

  document.body.style.animation = 'none';
}

document.addEventListener('DOMContentLoaded', setMoonPhaseAnimation);
