const faqs = document.querySelectorAll(".services");

faqs.forEach(services => {
    services.addEventListener("click", () => {
        services.classList.toggle("active");
  })
})

document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  burgerMenu.addEventListener('click', function() {
      burgerMenu.classList.toggle('active');
      mobileMenu.classList.toggle('active');
  });
});