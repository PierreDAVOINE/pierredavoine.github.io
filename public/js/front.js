// Gestion du hover tactible des projets

const projects = document.querySelectorAll(".project");

projects.forEach((project) => {
  project.addEventListener("touchstart", (e) => {
    // e.preventDefault();
    project.classList.toggle("hover");
  });
});

// Gestion de l'affichage des mentions légales

const mentionsLink = document.getElementById("mentions-link");
const mentions = document.getElementById("mentions-legales");

const showMention = () => {
  mentions.classList.toggle("show-mentions");
};

mentionsLink.addEventListener("click", showMention);
mentions.addEventListener("click", showMention);
