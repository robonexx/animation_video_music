function getMoonAge(date = new Date()) {
  const lunarCycle = 29.530588853;
  const knownNewMoon = new Date('2000-01-06T18:14:00Z');
  const daysSinceNewMoon = (date - knownNewMoon) / 1000 / 60 / 60 / 24;
  const moonAge = daysSinceNewMoon % lunarCycle;
  return moonAge >= 0 ? moonAge : moonAge + lunarCycle;
}

function setMoonPhaseStaticState() {
  const moon = document.querySelector('.moon');
  const wrapper = document.querySelector('.moon-wrapper');
  const moonAge = getMoonAge();
  const lunarCycle = 29.530588853;

  const phaseFraction = moonAge / lunarCycle;

  // ✅ Shadow offset (simplified, still linear)
  const translate = ((phaseFraction - 0.5) * 100) / 2;
  if (moon) {
    moon.style.setProperty('--moon-phase', `${translate}%`);
    moon.style.animation = 'none';
  }

  // ✅ Sun offset (circular orbital illusion)
  const sunOffset = Math.cos(phaseFraction * 2 * Math.PI) * 25;

  if (wrapper) {
    wrapper.style.setProperty('--sun-position', `${sunOffset}%`);
    wrapper.style.animation = 'none';
    wrapper.style.setProperty('--eclipse-animation', 'none');
    wrapper.style.setProperty('--sun-animation', 'none');
  }

  document.body.style.animation = 'none';
}

document.addEventListener('DOMContentLoaded', setMoonPhaseStaticState);
