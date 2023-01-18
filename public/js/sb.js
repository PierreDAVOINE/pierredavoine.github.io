const buttonNav = document.querySelector(".mobile-button");
const mobileNav = document.querySelector(".mobile-nav");
const barsButton = document.querySelectorAll(".bar");

buttonNav.addEventListener("click", () => {
    mobileNav.classList.toggle(`show`);
    barsButton.forEach(bar => {
        bar.classList.toggle(`active`);
        bar.classList.toggle(`close`);
    });
});

