const addItem = document.getElementById("add-note");
const popup = document.querySelector("dialog");

//função que captura o clique no botão de adicionar nota e abre o popup
function addNote() {
  addItem.addEventListener("click", () => {
    console.log("clicou!");

    setTimeout(() => {
      popup.classList.remove("invisible");
      popup.classList.add("visible");
    });
  });
}

addNote();
