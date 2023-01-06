// Selection du container de titres
const gridTitles = document.getElementById("grid-titles");

const calcPaths = (totalDuration = 7) => {
  let len = 0; // Varible pour stocker la taille
  let delay = 0; // Variable pour stocker le delay d'animation

  // Ajout de la class "animated" pour reset l'animation
  gridTitles.classList.add("animated");

  // Selection de tous les path du svg
  const paths = document.querySelectorAll(".sig__path");

  // Vérifie la présence de paths
  if (!paths.length) {
    return false;
  }

  // Calcul la taille total des paths
  paths.forEach((path) => {
    const totalLen = path.getTotalLength();
    len += totalLen;
  });

  paths.forEach((path) => {
    const pathElem = path;

    // Récupère la taille du path actuel
    const totalLen = path.getTotalLength();

    // Calcul la durée d'animation nécessaire au path actuel en fonction de sa taille
    const duration = (totalLen / len) * totalDuration;

    // Applique la durée d'animation et de delay necessaire aux paths avec un minimum de 0.2s
    pathElem.style.animationDuration = `${duration < 0.2 ? 0.2 : duration}s`;
    pathElem.style.animationDelay = `${delay}s`;

    // Applique les stroke dasharray et stroke dashoffset pour afficher le path
    pathElem.setAttribute("stroke-dasharray", totalLen);
    pathElem.setAttribute("stroke-dashoffset", totalLen);

    // Ajoute 0.2 de delay à chaque animation pour plus de réalisme
    delay += duration + 0.2;
  });

  // Déclancher l'animation
  // gridTitles.classList.add("animated");
  return true;
};

calcPaths(1);
