/*
 * erika.js  – V2.1  (cancel‑safe typewriter)
 *  ▸ Regular quotes shuffle on load
 *  ▸ Deep‑quote array triggered by #deepQuotesBtn click
 *  ▸ New: any time a fresh quote starts, unfinished typing from the
 *    previous one is automatically cancelled, so no more garbled text.
 */

(() => {
  /* ---------- CONFIG ---------- */
  const CHAR_DELAY = 45; // ms between characters
  const FADE_DURATION = 300; // ms per character fade‑in

  /* ---------- QUOTE LISTS ---------- */
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

  const deepQuotes = [
    `She walks with a knowing gaze, a shield of pride,
  A mind convinced she’s mastered life’s tide.
  Yet beneath the bravado, a storm brews deep,
  A soul that aches, a pain she keeps.
  
  Her silence whispers louder than words,
  A melody trapped, like caged birds.
  She’s weathered storms, seen skies turn gray,
  Yet fears the dawn might steal her away.
  
  To let love in feels like a thief's plan,
  For trust, once shattered, scars the span.
  So she builds her walls, brick by brick,
  Convinced that distance will do the trick.
  
  Yet love persists, patient and kind,
  Seeking the cracks where light might find
  The courage hidden, the strength to share,
  A heart too tender, too afraid to “care”.
  
  But, oh, if she could only see,
  That love is not a lock, but the key.
  To heal the wounds, to mend the seams,
  To hold her fears and cradle her dreams.
  
  Let her know, in her quiet fight,
  That she’s deserving of love’s soft light.
  For the bravest hearts are those that dare,
  To love through pain, to trust, to care.`,
  ];

  /* ---------- ROTATOR FACTORY ---------- */
  const makeRotator = (arr, key) => {
    const ORDER_KEY = `${key}-order`;
    const POINTER_KEY = `${key}-ptr`;
    return () => {
      let order = JSON.parse(localStorage.getItem(ORDER_KEY));
      let pointer = parseInt(localStorage.getItem(POINTER_KEY), 10);
      if (!order || order.length !== arr.length) {
        order = [...Array(arr.length).keys()];
        for (let i = order.length - 1; i; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [order[i], order[j]] = [order[j], order[i]];
        }
        pointer = 0;
      }
      const idx = order[pointer];
      pointer = (pointer + 1) % arr.length;
      localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      localStorage.setItem(POINTER_KEY, pointer.toString());
      return arr[idx];
    };
  };
  const nextQuote = makeRotator(quotes, 'erika');
  const nextDeepQuote = makeRotator(deepQuotes, 'erika-deep');

  /* ---------- CANCELLABLE TYPEWRITER ---------- */
  let writerToken = 0; // increments every time we start a new write

  const typeWriter = (text, el) => {
    const myToken = ++writerToken; // unique id for this invocation
    el.innerHTML = '';

    const write = (i) => {
      if (myToken !== writerToken) return; // another writer took over
      if (i >= text.length) return; // finished

      if (text[i] === '\n') {
        el.appendChild(document.createElement('br'));
        return write(i + 1);
      }
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.opacity = '0';
      span.style.transition = `opacity ${FADE_DURATION}ms ease`;
      el.appendChild(span);
      requestAnimationFrame(() => (span.style.opacity = '1'));
      setTimeout(
        () => write(i + 1),
        text[i] === ' ' ? CHAR_DELAY / 2 : CHAR_DELAY
      );
    };

    write(0);
  };

  /* ---------- BOOT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const poemEl = document.querySelector('.poem');
    if (!poemEl) return;
    poemEl.style.whiteSpace = 'pre-line'; // keep new‑lines, allow wrapping

    // show a regular quote first
    typeWriter(nextQuote(), poemEl);

    // deep‑quote button
    const deepBtn = document.getElementById('deepQuotesBtn');
    if (deepBtn) {
      deepBtn.addEventListener('click', () =>
        typeWriter(nextDeepQuote(), poemEl)
      );
    }
  });
})();
