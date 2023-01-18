const mentionsLink = document.getElementById("mentions-link");
const mentions = document.getElementById("mentions-legales");

const showMention = () => {
  mentions.classList.toggle("show-mentions");
};

mentionsLink.addEventListener("click", showMention);
mentions.addEventListener("click", showMention);
