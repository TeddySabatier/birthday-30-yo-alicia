const sisterName = "Alicia";
const driveUrl =
  "https://drive.google.com/drive/folders/1nU9sU11UYH6v_bZSMMR9dN-N0xVbxiRW?usp=drive_link";

const birthdayMessages = [
  "Coucouuu et joyeux anniversaire :)",
  "J'espère que tu as passé une belle journée !!",
  "Je te glisse le lien vers mon Drive où il y a une partie des photos de famille, pour que tu ne nous oublies pas hehe.",
  "Bref, joyeux anniversaire soeurette, je t'aime.",
  "Ah et en plus tu vas avoir une session sympa de wellness de la part de tout le monde.",
  "On te fait tous de gros bisous et n'oublie pas de regarder les vidéos.",
  "Ton p'tit frère préféré."
];

const messageList = document.getElementById("message-list");
const surpriseButton = document.getElementById("surprise-button");
const surpriseNote = document.getElementById("surprise-note");
const confettiLayer = document.getElementById("confetti-layer");
let revealEffectTurn = 0;

function populateMessages() {
  const chips = ["Petit mot", "Souvenir", "Clin d'oeil", "Avec amour"];

  birthdayMessages.forEach((text, index) => {
    const card = document.createElement("article");
    card.className = "message reveal message-locked";
    card.style.transitionDelay = `${index * 70}ms`;
    card.setAttribute("data-message-index", String(index));

    const chip = document.createElement("span");
    chip.className = "message-chip";
    chip.textContent = `💌 ${chips[index % chips.length]}`;

    const prompt = document.createElement("span");
    prompt.className = "message-prompt";
    prompt.textContent = "Clique pour ouvrir ce mot";

    const toggle = document.createElement("button");
    toggle.className = "message-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.append(chip, prompt);

    const body = document.createElement("p");
    body.className = "message-text";
    body.textContent = text;
    body.hidden = true;

    card.append(toggle, body);
    messageList.append(card);
  });
}

function setupRevealAnimation() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function runConfetti(originX, originY) {
  const colors = ["#f07ca5", "#f1ca70", "#c6b6ff", "#ffa8c2"];
  const totalPieces = 180;

  for (let i = 0; i < totalPieces; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * Math.PI * 2;
    const distance = 110 + Math.random() * 280;
    const x1 = Math.cos(angle) * distance;
    const y1 = Math.sin(angle) * distance + 180;
    piece.style.setProperty("--x0", "0px");
    piece.style.setProperty("--y0", "0px");
    piece.style.setProperty("--x1", `${x1}px`);
    piece.style.setProperty("--y1", `${y1}px`);
    piece.style.setProperty("--spin", `${180 + Math.random() * 620}deg`);
    piece.style.animationDelay = `${Math.random() * 180}ms`;

    confettiLayer.append(piece);

    setTimeout(() => piece.remove(), 2200);
  }
}

function runFireworks(originX, originY) {
  const colors = ["#ffd166", "#f07ca5", "#c6b6ff", "#7cd7ff", "#ff8fab"];
  for (let i = 0; i < 56; i += 1) {
    const piece = document.createElement("span");
    piece.className = "fx-particle firework";
    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 240;
    piece.style.setProperty("--x1", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--y1", `${Math.sin(angle) * distance}px`);
    confettiLayer.append(piece);
    setTimeout(() => piece.remove(), 1200);
  }
}

function runSparkles(originX, originY) {
  for (let i = 0; i < 36; i += 1) {
    const piece = document.createElement("span");
    piece.className = "fx-particle sparkle-particle";
    piece.style.left = `${originX - 40 + Math.random() * 80}px`;
    piece.style.top = `${originY - 35 + Math.random() * 70}px`;
    piece.style.animationDelay = `${Math.random() * 280}ms`;
    confettiLayer.append(piece);
    setTimeout(() => piece.remove(), 1100);
  }
}

function runHearts(originX, originY) {
  const heartColors = ["#f07ca5", "#ff6f91", "#ff8fab"];
  for (let i = 0; i < 26; i += 1) {
    const piece = document.createElement("span");
    piece.className = "fx-particle heart";
    piece.textContent = "❤";
    piece.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
    piece.style.left = `${originX - 24 + Math.random() * 48}px`;
    piece.style.top = `${originY - 8}px`;
    piece.style.setProperty("--x1", `${-90 + Math.random() * 180}px`);
    piece.style.setProperty("--y1", `${-130 - Math.random() * 140}px`);
    piece.style.animationDelay = `${Math.random() * 160}ms`;
    confettiLayer.append(piece);
    setTimeout(() => piece.remove(), 1400);
  }
}

function runRevealEffect(originX, originY) {
  const effectTurn = revealEffectTurn % 4;
  revealEffectTurn += 1;

  if (effectTurn === 0) {
    runConfetti(originX, originY);
  } else if (effectTurn === 1) {
    runFireworks(originX, originY);
  } else if (effectTurn === 2) {
    runSparkles(originX, originY);
  } else {
    runHearts(originX, originY);
  }
}

function setupMessageRevealInteractions() {
  const messageCards = document.querySelectorAll(".message");
  messageCards.forEach((card) => {
    const toggle = card.querySelector(".message-toggle");
    const text = card.querySelector(".message-text");
    if (!toggle || !text) {
      return;
    }

    toggle.addEventListener("click", (event) => {
      if (card.classList.contains("message-open")) {
        return;
      }

      card.classList.remove("message-locked");
      card.classList.add("message-open");
      toggle.setAttribute("aria-expanded", "true");
      text.hidden = false;

      const rect = event.currentTarget.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      runRevealEffect(originX, originY);
    });
  });
}

function setupSurpriseButton() {
  surpriseButton.addEventListener("click", (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    runConfetti(originX, originY);
    surpriseNote.hidden = false;
    surpriseNote.classList.add("sparkle");
    surpriseButton.textContent = "Photos ouvertes, profite bien";
    surpriseButton.disabled = true;
    surpriseButton.setAttribute("aria-disabled", "true");

    window.open(driveUrl, "_blank", "noopener,noreferrer");
  });
}

function personalizeHeroTitle() {
  const title = document.querySelector("h1");
  title.textContent = `Joyeux anniversaire ${sisterName}`;
}

populateMessages();
personalizeHeroTitle();
setupRevealAnimation();
setupMessageRevealInteractions();
setupSurpriseButton();
