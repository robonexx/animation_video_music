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
    `I feel her love  
not in grand words,  
but in the way she asks,  
“Are you okay?”  
when no one else notices`,

    `In the way she calls,  
just to hear my voice.  
In the stillness between us  
that says,  
“I see you, I’m here.”`,

    `...I’m not afraid of falling anymore.
Because every time I land next to you,
it feels like I’ve come home...
and every time,
I fall deeper in love with you`,

    `Believe the quiet thinker who says they care,  they’ve doubted every feeling, questioned every motive, and still chose you`,

    `And in those small moments,  
when she shows she cares,  
I remember what love is supposed to feel like,
safe,  
present,  
real.`,

    `When i look in to her eyes, i feel the light of the moon touching my soul`,

    `Her touch wasn’t a question, 
it was an answer. 
A quiet way of saying: 
“I trust you.” `,

    `I choose to love her now, 
in this breath, 
in this moment. 

Not holding on too tight, 
but holding her with presence,
and trusting the flow 
that brought her to me.`,

    `Nothing else existed...
just her warmth, 
her heartbeat, 
her love 
wrapped around mine.`,

    `Inget annat fanns Erika,
bara din värme,
Ditt hjärtas slag,
Din kärlek
omsorgsfullt svept runt mitt hjärta. 💞`,

    `Your voice is the place  
my soul remembers how to breathe.`,

    `I just want to hold you, kiss you, and caress you`,

    `I want to be the one who makes you smile,
the one who makes you laugh, the one who makes you feel alive in love.`,

    `From now on each morning,  
my coffee carries her touch, 
a quiet reminder  
that I’m loved,  
even in the smallest things.`,

    `I would never step on your heart,
I would never take you for granted,
I would never stand in your way,
I would never try to steal you from your life,
I would never try to change you,
I would never try to make you feel less than you are

You are love in its purest form`,

    `Hon bär en skönhet som inte skriker,
men som viskar i vinden.
En skönhet som når djupare än huden,
ända in i mitt hjärta.`,

    `Hennes skönhet fångade inte bara min blick,
den fångade mitt hjärta,
den stillade min själ.`,

    `När jag ser på henne,
är det inte bara ögonen som ser.
Det är hjärtat som känner,
själen som minns något den alltid längtat efter.`,

    `She is not just beautiful to my eyes.
She is beautiful to my soul,
a light that calls me home without a single word.`,

    `I trust her light. I trust my light.
I don’t chase. I don’t pull away.
I stay open, steady, free`,

    `Her laughter is my favorite song, and her smile, the sunrise I never knew I needed.`,

    `This is the kind of love that grows real roots`,

    `Her voice drifts through me,  
a river soft and whole,  
washing the weight from my chest,  
calming the corners of my soul.`,

    `We gave eachother our energy not in pieces, but whole.
Hours that felt like fire and still in time eyes that stayed even in silence
We didn't speak of forever, time said it louder than any vow
With every moment We could've spent elsewhere and didn't`,

    `Is this the kind of love people spend lifetimes searching for? Could be`,

    `I'm here anytime you want to talk more, whether it’s love, talk about daily life, you need someone to listen or just to breathe together through the emotions`,

    `In her eyes, I find not just love, but a home where my heart can rest and dream freely.`,

    `She doesn't complete me. She expands me. She reminds me of the joy I already hold inside.`,

    `With her, even silence feels like music, two souls humming the same melody.`,

    `Choosing her isn't a decision. It's the most natural thing my heart has ever done.`,

    `When her hand finds mine, it's not about holding tight, it's about walking forward, together.`,

    `Her presence turns ordinary moments into memories I want to live in forever.`,

    `She is not my reason for happiness. she is the echo of it, the shared smile of two free hearts meeting.`,

    `Du kom in i mitt liv som från en dröm,
  Dina ögon har månens glans,
  Din röst, sagornas stilla magi,
  Ditt leende värmer hjärtat som morgonsolens första strålar.`,

    `Maybe… you needed to be sad once,
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
    `Love didn’t arrive when I chased it, 
or when I dreamed it into a perfect shape. 

It came when I stopped searching, 
and started seeing. 

Not a flawless face, 
but a soul with edges, 
a voice that felt like home, 
a presence I didn’t want to fix, only hold. 

This time, love didn’t complete me. 
It met me. 
And chose to walk beside me.`,

    `I doubted myself 
more than I doubted her. 
But the silence, the shift, 
the ache in the air,
they told me everything. 

It isn’t over. 
It never really is with her. 
And in the end, 
my body knows
what my mind tries to silence: 
I'm right I know this.`,

    `Her words said goodbye, 
but my body flinched,
not from heartbreak, 
but from the lie it carried. 

The energy was still warm, still tethered. 
My gut knew it all: 
this wasn’t truth,
this was fear, 
wearing the mask of certainty. 

And though my mind searched for reason, 
nothing aligned. 
Because when energy speaks love, 
but the voice says no… 
the soul hears the difference.`,

    `A showing with time, a sign of truth,
    A soul shows their intentions shining through.
    Overcoming fear to open up the heart,
    Never be afraid of a bright new start.
    When the time is right, you will truly share,
    Until you are ready, I will be waiting right here.`,

    `We are never fully ready,
never finished,
never perfect.

We are growing, healing,
failing, trying again,
always becoming.

Connections aren't built
on readiness,
but on showing up,
messy, real,
and willing to grow.

Stop waiting to be ready.
Be real to what you feel instead.`,

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

    `Maybe it was me,
  my insecurity, my fear of not being enough.
  She kept her soul hidden,
  but I didn’t offer mine with trust and ease.`,

    `I see now ...
  she needed comfort, not pressure.
  Safety, not intensity.`,

    `She walks through dreams I cannot reach,
 A fading voice, a distant beach.
 I called her name across the night,
 But silence answered, soft and light.

There was a time I felt her near,
 A pull, a thread, a whispered year.
 Now all that's left is open skies,
 And learning how to say goodbye.
 
Still, somewhere deep where echoes stay,
 I wish her peace along her way.
 No chains, no cries to pull her back,
 Just love, released into the black.`,

    `If roads must part, then let them part,
With quiet hands and open heart.
Not every storm is ours to save,
Not every love becomes a grave.

She carries oceans in her chest,
Tides she alone must now confess.
I cannot swim where she must go,
Nor force the rivers not to flow.

But still I send her silent prayers,
That when she falls, love finds her there.
And though my hands may not hold tight,
My soul still wraps her in its light.`,

    `Still I remember the look in her eyes,
A battle fought beneath bright skies.

I watched her build her careful walls,
Stacked by the weight of a thousand falls.
And I, outside, with hands turned bare,
Could only whisper: I'm still there.

If she must walk where I cannot tread,
If dreams she chases leave me unsaid,
Then I will honor her silent pleas,
It time to free the part she left in me.`,

    `Even when silence swallowed our days,
Even when distance blurred our ways,
A thread unseen still pulled my soul,
Tugging gently, making me whole.

I spoke no words, you heard them still,
I felt your ache beyond my will.
Across the dark, through dreams unplanned,
We met where only hearts could stand.

You were never truly gone from me,
Only hidden in tides I could not see.
And somewhere deeper than goodbye,
We touched, we held, we learned to fly.`,

    `As we stand in the full moon’s glow,
I think of a soul I used to know
The warmth of the sun in her gentle smile,
moonglow eyes that stayed awhile
We met beneath that silver tide,
a fleeting spark the night would hide

If you happen to look up and feel something unknown…
It's just the universe, reminding you:
You’re never truly alone

No matter the distance, or how paths bend,
I still wish you peace, and love, my friend`,

    `I send you light through distant skies
Rest, renew, and softly mend,
My heart is with you, my spirit I send ❤️`,

    `She didn’t knock, didn’t ask, didn’t wait. 
She smiled... and my guard fell like fate. 
No mask, no plan, no grand disguise, 
Just a spark that stole the breath from my skies. 

She was A thief, yes… but gentle and true,
She stole my heart, and somehow gave it back too.`,

    `Her words said goodbye, 
but my body flinched,
not from heartbreak, 
but from the lie it carried. 

The energy was still warm, still tethered. 
My gut knows it all,
this wasn’t truth,
this was fear, 
wearing the mask of certainty. 

And though my mind searched for reason, 
nothing feels aligned. 
Because when energy speaks love, 
but the voice says no… 
the soul hears the difference.
I know we are not done yet.`,

    `I doubted myself 
more than I doubted her. 
But the silence, the shift, 
the ache in the air,
they told me everything. 

It isn’t over. 
It never really is with her. 
And in the end, 
my body knows
what my mind tries to silence, 
I'm right I know this.`,

    `Her born day on earth is next month, 
something in me just knows, 
This is when we will meet again.

I just know. 
She’ll come back. 
We’ll meet. 
And when it happens, 
it’ll feel like it was always meant to be.

I can’t explain it,
I can’t rationalize it,
But I can feel it.
I can sense it.

Only future will tell`,
  ];

  /* ---------- ROTATOR ---------- */
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
    poemEl.style.whiteSpace = 'pre-line';

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
