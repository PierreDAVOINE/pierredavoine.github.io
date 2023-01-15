(function () {
  emailjs.init("kh6GZN8avNMIJKqum");
})();

//===========

// Ecoute du submit du formulaire
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const serviceID = "service_2td5673";
    const templateID = "template_1lhxo8v";

    // send the email here
    emailjs.sendForm(serviceID, templateID, this).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert(
          "Votre message à bien été envoyé ! Je vous répondrais au plus vite."
        );
      },
      (error) => {
        console.log("FAILED...", error);
        alert(
          "Un problème est survenu, merci de réessayer plus tard ou de me contacter sur LinkedIn.",
          error
        );
      }
    );
  });
