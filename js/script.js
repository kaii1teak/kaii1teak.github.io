const faqs = document.querySelectorAll(".services");

faqs.forEach(services => {
    services.addEventListener("click", () => {
        services.classList.toggle("active");
  })
})

