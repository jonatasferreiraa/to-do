const addItem = document.getElementById("add-note");

const popup = document.querySelector("dialog");
const removePopup = document.querySelector("#close-popup");
const backgroundPopup = document.querySelector(".background-popup");

const searchForm = document.querySelector("#new-note-form");
const newNoteForm = document.querySelector(".dashboard form");

const inputSearch = document.querySelector("#seach");
const inputnewNote = document.querySelector("#new-note");

const noteContainer = document.querySelector(".note-container");
const taskAdd = document.querySelector("#btn-popup #add-task");

// Lista com os dois formulários para facilitar a manipulação em conjunto
let forms = [searchForm, newNoteForm];

// percorre toda a lista de formulário atribuída na variável acima
forms.forEach((form) => {
  // evento que tira a atualização da página quando clica no botão de submissão.
  form.onsubmit = (event) => {
    event.preventDefault();

    applyTask();
  };
});

// função que captura o clique no botão de adicionar nota e abre o popup
function openPopUp() {
  addItem.onclick = () => {
    popup.classList.remove("invisible");
    popup.classList.add("visible");
    backgroundPopup.classList.remove("invisible");
    backgroundPopup.classList.add("visible");
  };
}

// funcão que fecha o pop-up quando clicamos no botão 'cancel'
function closePopUp() {
  removePopup.onclick = () => {
    popup.classList.remove("visible");
    popup.classList.add("invisible");
    backgroundPopup.classList.remove("visible");
    backgroundPopup.classList.add("invisible");
  };
}

function applyTask() {
  taskAdd.onclick = () => {
    const validadeAddTask = (erroValue) => {
      erroValue("Preencha o campo para adicionar uma tarefa!");
    };

    if (!inputnewNote.value) {
      validadeAddTask((erroMessage) => {
        const MessageError = document.createElement("div");
        MessageError.classList.add("error-message");
        const imgErro = document.createElement("img");
        imgErro.src = "/assets/error-icon.svg";
        const ErroText = document.createElement("p");
        ErroText.textContent = erroMessage;

        noteContainer.append(MessageError);
        MessageError.appendChild(imgErro);
        MessageError.appendChild(ErroText);
      });
      return false;
    } else {
      addTask();
      return true;
    }
  };
}

function addTask() {
  //DOM: Estrutura de tarefa
  const contentNote = document.createElement("div");
  contentNote.classList.add("note-content");

  const note = document.createElement("div");
  note.classList.add("note");

  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.id = "checked";
  checkboxInput.name = "checked-task";
  const checkboxStyle = document.createElement("div");
  checkboxStyle.classList.add("checkbox");
  const ValueNote = document.createElement("label");
  ValueNote.htmlFor = "checked";
  ValueNote.textContent = inputnewNote.value;

  const iconsNote = document.createElement("div");
  iconsNote.classList.add("icons-note");

  const iconPencil = document.createElement("span");
  iconPencil.classList.add("icon-pencil");
  const iconTrash = document.createElement("span");
  iconTrash.classList.add("icon-trash");

  const divisor = document.createElement("div");
  divisor.classList.add("divisor");

  contentNote.append(note, divisor);
  note.append(checkboxInput, checkboxStyle, ValueNote, iconsNote);
  iconsNote.append(iconPencil, iconTrash);

  noteContainer.append(contentNote);

  // mensagem de tarefa concluída;
  const sucessMessage = (taskComplete) => {
    taskComplete("Tarefa Concluída com sucesso!");
  };

  // mensagem de remoção de tarefa;
  const removeMessage = (removeTask) => {
    removeTask("Tarefa removida com sucesso!");
  };

  //Captura o clique no checkbox, e verifica se a tarefa for concluida então ele adiciona a taxação na tarefa, se não, ele remove.
  checkboxInput.onclick = () => {
    if (checkboxInput.checked) {
      ValueNote.textContent = inputnewNote.value;
      ValueNote.style.textDecoration = "line-through";
      ValueNote.style.textDecorationColor = "rgba(37, 37, 37, 0.5)";

      ValueNote.style.color = "rgba(37, 37, 37, 0.5)";

      sucessMessage((message) => {
        const MessageContainer = document.createElement("div");
        MessageContainer.classList.add("sucess-message");
        const imgCheck = document.createElement("img");
        imgCheck.src = "/assets/checkbox.svg";
        const MessageText = document.createElement("p");
        MessageText.textContent = message;

        noteContainer.append(MessageContainer);
        MessageContainer.appendChild(imgCheck);
        MessageContainer.appendChild(MessageText);
      });

      //chamada de callback para mensagem de sucesso em tarefa!
    } else {
      ValueNote.textContent = inputnewNote.value;
      ValueNote.style.textDecoration = "none";
    }
  };

  iconTrash.onclick = () => {
    contentNote.remove();

    removeMessage((remove) => {
      const MessageContainer = document.createElement("div");
      MessageContainer.classList.add("sucess-message");
      MessageContainer.style.backgroundColor = "rgba(108, 99, 255, 0.2)";
      MessageContainer.style.color = "#6C63FF";
      const imgCheck = document.createElement("img");
      imgCheck.src = "/assets/trash-purple.svg";
      const MessageText = document.createElement("p");
      MessageText.textContent = remove;

      noteContainer.append(MessageContainer);
      MessageContainer.appendChild(imgCheck);
      MessageContainer.appendChild(MessageText);
    });
  };
}

//chamada de função de adicionar e remover pop-up da tela
openPopUp();
closePopUp();
