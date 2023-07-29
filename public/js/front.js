// Gestion du hover tactible des projets
const projects = document.querySelectorAll('.project');

// Pour chaque projet, on ajoute un event listener sur le touchstart
// qui ajoute ou supprime la classe hover
projects.forEach((project) => {
  project.addEventListener('touchstart', () => {
    project.classList.toggle('hover');
  });
});

// Gestion de l'affichage des mentions légales
const mentionsLink = document.getElementById('mentions-link');
const mentions = document.getElementById('mentions-legales');

const showMention = () => {
  console.log('click');
  mentions.classList.toggle('show-mentions');
};

mentionsLink.addEventListener('click', showMention);
mentions.addEventListener('click', showMention);
