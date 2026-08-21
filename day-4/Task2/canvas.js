//link: https://stackoverflow.com/questions/50528954/give-each-shape-on-html5-canvas-a-random-colour

const canvas = document.getElementById("canvas");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");

const ctx = canvas.getContext("2d");

const particles = [];

for (let i = 0; i < 200; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,

    vx: Math.random(),
    vy: Math.random(),

    radius: 3,
    color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
    // color: `hsl(${Math.random() * 360}, 100%, 50%)`,
  });
}

function animateFn() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.x = particle.x + particle.vx;
    particle.y = particle.y + particle.vy;

    if (particle.x < 0 || particle.x > canvas.width) {
      particle.vx = particle.vx * -1;
    }

    if (particle.y < 0 || particle.y > canvas.height) {
      particle.vy = particle.vy * -1;
    }

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
  });

  frame = requestAnimationFrame(animateFn);
}

let frame = requestAnimationFrame(animateFn);

pauseBtn.addEventListener("click", () => {
  cancelAnimationFrame(frame);
});

resumeBtn.addEventListener("click", () => {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(animateFn);
});
