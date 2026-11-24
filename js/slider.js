const slides = [
  {
    image: "images/hero.png",
    alt: "مدل با بافت زرشکی",
    subtitle: "کالکشن جدید پاییز و زمستان",
    title: "استایل خاص، در هر فصل",
    text: "با لباس‌هایی که حس بهتری بهت میدن.",
  },
  {
    image: "images/hero-2.jpeg",
    alt: "کالکشن زمستانه",
    subtitle: "تخفیف ویژه زمستانه",
    title: "تا ۳۰٪ تخفیف",
    text: "گرم بمان و شیک بمان.",
  },
  {
    image: "images/hero-3.jpeg",
    alt: "کالکشن جدید",
    subtitle: "رسیدن محصولات جدید",
    title: "تازه‌ترین استایل‌ها",
    text: "هر هفته چیزی تازه برای تو.",
  },
];

slides.forEach((slide) => {
  const img = new Image();
  img.src = slide.image;
});

export function initSlider() {
  const hero = document.querySelector("[data-slider]");
  if (!hero) return;

  const image = hero.querySelector("[data-slide-image]");
  const subtitle = hero.querySelector("[data-slide-subtitle]");
  const title = hero.querySelector("[data-slide-title]");
  const text = hero.querySelector("[data-slide-text]");
  const dots = hero.querySelectorAll("[data-slide-dot]");

  let current = 0;
  let timer;

  function showSlide(index) {
    current = index;
    const slide = slides[current];

    image.src = slide.image;
    image.alt = slide.alt;
    subtitle.textContent = slide.subtitle;
    title.textContent = slide.title;
    text.textContent = slide.text;

    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-wine", i === current);
    });
  }

  function stopAutoPlay() {
    clearInterval(timer);
  }

  function startAutoPlay() {
    stopAutoPlay();
    timer = setInterval(() => {
      showSlide((current + 1) % slides.length);
    }, 2000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      startAutoPlay();
    });
  });

  hero.addEventListener("mouseenter", stopAutoPlay);
  hero.addEventListener("mouseleave", startAutoPlay);

  startAutoPlay();
}