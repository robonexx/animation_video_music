(() => {
  /* ---------- CONFIG ---------- */
  const CHAR_DELAY = 45; // ms between characters
  const FADE_DURATION = 300; // ms – keep in sync with CSS below
  const STORAGE_KEY_ORDER = 'erika‑quote‑order';
  const STORAGE_KEY_POINTER = 'erika‑quote‑ptr';

  /* ---------- QUOTES ---------- */
  const quotes = [
    `A showing with time, a sign of truth,
  A soul shows their intentions shining through.
  Overcoming fear to open up the heart,
  Never be afraid of a bright new start.
  When the time is right, you will truly share,
  Until you are ready, I will be waiting right here.`,

    `Du kom in i mitt liv som från en dröm,
  Dina ögon har månens glans,
  Din röst, sagornas stilla magi,
  Ditt leende värmer hjärtat som morgonsolens första strålar.`,

    `Maybe… you needed to be sad once… 
  so you could know how good this actually feels now
  to know the quiet between heartbeats
  wasn’t silence,
  but safety.`,

    `The moon connection
  It was her whisper to the stars,
  and my call echoing back
  the universe nodding in resonance
  A vibration to let our souls dance`,

    `Her soul recognizes mine…
  Not through words or sight,
  but by vibration, 
  on the same frequency,
  both near and far.`,

    `The way flowers turn to the sun without question.
  when her eyes find mine,
  time softens, the world fades,
  we are somewhere else,
  a place only we can reach.`,

    `Maybe it was me,
  my insecurity, my fear of not being enough.
  She kept her soul hidden,
  but I didn’t offer mine with trust and ease.`,

    `I see now ...
  she needed comfort, not pressure.
  Safety, not intensity.`,

    `Now her gaze cuts through me,
  and for the first time, I feel ready,
  to open fully,
  to let her in,
  
  to stop holding back.`,

    `Her eyes  shows me,
  She is love.
  She is warmth.
  She is true.`,

    `She feels safe in the warmth of my arms,
  Secure not by force, but by trust,
  By the silent knowing that she is free, and she stays.`,

    `She is choosing me,
  Not out of habit, not out of fear,
  But out of the clear, endless river of her heart,
  Choosing again and again,
  The way flowers turn to the sun without question.`,

    `I saw the shadow behind her smile
   and didn’t flinch.
   Didn’t run.
   Didn’t ask her to be brighter.
  I stayed.
   And that, that
   is what scared her the most.`,

    `Because for the first time,
   someone wasn’t reaching for the perfect version
   they were choosing her.
   As she was.
   Shadow and all.`,

    `For the first time without trembling hands,
  Without bracing for a storm that never comes.
  I breathe…
  And in that space between heartbeats,
  I receive love like morning light on open skin.`,

    `She does not look back to broken mirrors.
  She walks with me toward gardens yet unseen,
  Where the past cannot drag her feet,
  Where the future is ours to paint in colors undreamed.`,

    `I breathe,
  And with every breath,
  I welcome the love I once thought I could only chase.
  Now it is here.
  Now it is mine.
  Now, I am ready.`,

    `Because to open the door
   was to risk being seen,
   and left.`,

    `She said,
   "I got scared of you because you didn’t want to leave me alone."
   But what she meant was deeper,
   a truth wrapped in trembling silence`,
  ];

  /* ---------- UTILITIES ---------- */
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const nextIndex = () => {
    let order = JSON.parse(localStorage.getItem(STORAGE_KEY_ORDER));
    let pointer = parseInt(localStorage.getItem(STORAGE_KEY_POINTER), 10);

    // if first run or array length changed, build a new shuffled order
    if (!order || order.length !== quotes.length) {
      order = shuffle([...Array(quotes.length).keys()]);
      pointer = 0;
    }

    const idx = order[pointer];
    pointer = (pointer + 1) % quotes.length;

    localStorage.setItem(STORAGE_KEY_ORDER, JSON.stringify(order));
    localStorage.setItem(STORAGE_KEY_POINTER, pointer.toString());

    return idx;
  };

  /* ---------- TYPEWRITER ---------- */
  const typeWriter = (text, container, cb) => {
    const write = (i) => {
      if (i >= text.length) {
        if (cb) cb();
        return;
      }
      const chr = text[i];
      if (chr === '\n') {
        container.appendChild(document.createElement('br'));
        write(i + 1);
      } else {
        const span = document.createElement('span');
        span.textContent = chr;
        span.style.opacity = '0';
        span.style.transition = `opacity ${FADE_DURATION}ms ease`;
        container.appendChild(span);
        requestAnimationFrame(() => (span.style.opacity = '1'));
        setTimeout(
          () => write(i + 1),
          chr === ' ' ? CHAR_DELAY / 2 : CHAR_DELAY
        );
      }
    };
    write(0);
  };

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const poemEl = document.querySelector('.poem');
    if (!poemEl) return;
    poemEl.innerHTML = '';
    poemEl.style.whiteSpace = 'pre-wrap'; // preserve line breaks
    const quote = quotes[nextIndex()];
    typeWriter(quote, poemEl);
  });
})();
