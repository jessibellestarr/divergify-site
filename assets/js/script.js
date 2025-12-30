document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const tinfoilBtn = document.getElementById('tinfoil-btn');
  const shadesBtn = document.getElementById('shades-btn');
  const mascotImg = document.getElementById('mascot-img');
  const mascotBubble = document.getElementById('mascot-bubble');
  const navLinks = document.querySelectorAll('.nav-links a');

  const tinfoilActiveLabel = '🔒 Secure';
  const tinfoilInactiveLabel = '🧢 Tin Foil';
  const shadesActiveLabel = '🕶️ Low Stim';
  const shadesInactiveLabel = '👁️ Normal';

  const tipPool = [
    'Neurospicy Tip: Set a 5-minute timer. Momentum loves short sprints.',
    'Neurospicy Tip: Pair a boring task with a favorite playlist.',
    'Neurospicy Tip: Rename your task list to "Boss Battle" for bonus dopamine.',
    'Neurospicy Tip: Do the smallest possible next step to lower the barrier.',
    'Neurospicy Tip: Swap seats or locations to reset your focus.',
    'Neurospicy Tip: Narrate your actions out loud to stay on track.',
    'Neurospicy Tip: Hydrate first. Brain fog is a sneaky debuff.',
    'Neurospicy Tip: Add a reward checkpoint every 20 minutes.'
  ];

  const navHoverMessages = {
    Home: 'Home base: quick access to the Divergify universe.',
    About: 'Learn why Divergify exists and how we build for neurodivergent brains.',
    Divergipedia: 'Divergipedia: a growing knowledge vault for neurodivergent strategy.',
    Blog: 'Field Notes: stories, experiments, and lessons from the lab.',
    'The App': 'The app: your ops center for clarity, momentum, and focus.',
    'Dopamine Depot': 'Dopamine Depot: tools, merch, and boosts for your brain.'
  };

  const safeSetStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Storage can fail in private mode or if blocked.
    }
  };

  const safeGetStorage = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  };

  const setButtonState = (button, isOn, activeLabel, inactiveLabel) => {
    if (!button) return;
    button.innerHTML = isOn ? activeLabel : inactiveLabel;
    button.setAttribute('aria-pressed', String(isOn));
  };

  const updateMascotState = () => {
    if (!mascotImg) return;

    const tinfoilOn = body.classList.contains('tinfoil-mode');
    const shadesOn = body.classList.contains('shades-mode');

    if (mascotBubble) {
      let message = 'Ready to work.';

      if (tinfoilOn && shadesOn) {
        message = 'Bunker Mode engaged. Lights dimmed, trackers blocked.';
      } else if (tinfoilOn) {
        message = 'Trackers blocked. Bunker protocols online.';
      } else if (shadesOn) {
        message = 'Lights dimmed. Calm focus activated.';
      }

      mascotBubble.innerHTML = message;
    }

    // Planned future: swap mascot art per mode.
    // if (tinfoilOn && shadesOn) mascotImg.src = 'mascot-bunker.png';
    // else if (tinfoilOn) mascotImg.src = 'mascot-tinfoil.png';
    // else if (shadesOn) mascotImg.src = 'mascot-shades.png';
    // else mascotImg.src = 'mascot-default.png';
    mascotImg.src = 'mascot-default.png';
  };

  const onMascotClick = () => {
    if (!mascotBubble) return;
    const tip = tipPool[Math.floor(Math.random() * tipPool.length)];
    mascotBubble.innerHTML = tip;
  };

  if (tinfoilBtn) {
    tinfoilBtn.addEventListener('click', () => {
      const isOn = body.classList.toggle('tinfoil-mode');
      setButtonState(tinfoilBtn, isOn, tinfoilActiveLabel, tinfoilInactiveLabel);
      safeSetStorage('tinfoilMode', isOn ? 'on' : 'off');
      updateMascotState();
    });
  }

  if (shadesBtn) {
    shadesBtn.addEventListener('click', () => {
      const isOn = body.classList.toggle('shades-mode');
      setButtonState(shadesBtn, isOn, shadesActiveLabel, shadesInactiveLabel);
      safeSetStorage('shadesMode', isOn ? 'on' : 'off');
      updateMascotState();
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      if (!mascotBubble) return;
      const label = link.textContent.trim();
      const message = navHoverMessages[label] || `Exploring ${label}.`;
      mascotBubble.innerHTML = message;
    });

    link.addEventListener('mouseleave', () => {
      updateMascotState();
    });
  });

  if (mascotImg) mascotImg.addEventListener('click', onMascotClick);
  if (mascotBubble) mascotBubble.addEventListener('click', onMascotClick);

  const storedTinfoil = safeGetStorage('tinfoilMode');
  const storedShades = safeGetStorage('shadesMode');

  if (storedTinfoil === 'on') {
    body.classList.add('tinfoil-mode');
  }

  if (storedShades === 'on') {
    body.classList.add('shades-mode');
  }

  setButtonState(tinfoilBtn, storedTinfoil === 'on', tinfoilActiveLabel, tinfoilInactiveLabel);
  setButtonState(shadesBtn, storedShades === 'on', shadesActiveLabel, shadesInactiveLabel);

  updateMascotState();
});
