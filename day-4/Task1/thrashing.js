//link: https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing
//link: https://dev.to/aayla_secura/layout-thrashing-what-is-it-and-how-to-eliminate-it-n2j
//link: https://www.youtube.com/watch?v=a9wbrTbg_RI
//link: https://www.youtube.com/results?search_query=layout+thrashing

const cards = document.querySelectorAll(".card");

// cards.forEach((card, i) => {
//   card.style.height = `${200 + i * 10}px`;

//   const height = card.offsetHeight;
//   console.log(height);
// });

//writes batch
cards.forEach((card, i) => {
  card.style.height = `${200 + i * 10}px`;
});

//reads batch
cards.forEach((card, i) => {
  const height = card.offsetHeight;
  console.log(height);
});
