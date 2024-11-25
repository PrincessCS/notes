const addNoteBtn = document.getElementById("add-note");
const noteContainer = document.createElement("div");
noteContainer.id = "note-container";
document.body.appendChild(noteContainer);
const characterLimit = 200;

function addNote() {
    const noteDiv = document.createElement("div"); 
    noteDiv.classList.add("note-div");

    const newNote = document.createElement("textarea");
    newNote.classList.add("note");
    newNote.rows = 10;
    newNote.cols = 30;

    const characterCount = document.createElement("p");
    characterCount.classList.add("character-count");
    characterCount.textContent = `0 / ${characterLimit} characters`;

  
    newNote.addEventListener('input', () => {
        const noteLength = newNote.value.trim().length;
        characterCount.textContent = `${noteLength} / ${characterLimit} characters`;

     
        if (noteLength > characterLimit) {
            characterCount.style.color = "red";
        } else {
            characterCount.style.color = "green";
        }
    });

    const noteId = `note-${Date.now()}`;
    newNote.id = noteId;

    const limitDialogBox = document.createElement("dialog");
    limitDialogBox.textContent = "Character limit exceeded!";
    const closeLimitDialogBtn = document.createElement("button");
    closeLimitDialogBtn.textContent = "Close";
    closeLimitDialogBtn.classList.add("close-btn");
    closeLimitDialogBtn.addEventListener('click', () => {
        limitDialogBox.close();
    });
    limitDialogBox.appendChild(closeLimitDialogBtn);
    document.body.appendChild(limitDialogBox);

  
    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save";
    saveBtn.classList.add("save-btn");
    saveBtn.addEventListener('click', () => {
        const noteContent = newNote.value;

        if (noteContent.length > characterLimit) {
           limitDialogBox.showModal();
        } else {
            localStorage.setItem(noteId, noteContent); 
            saveBtn.remove();
        }
    });

  
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener('click', () => {
        const savedContent = localStorage.getItem(noteId); 
        if (savedContent) {
            newNote.value = savedContent; 
            newNote.focus();
            characterCount.textContent = `${savedContent.length} / ${characterLimit} characters`; 
            noteDiv.appendChild(saveBtn);
        }
    });
     

    const deleteDialogBox = document.createElement("dialog");
    deleteDialogBox.textContent = "Are You Sure You Want to Delete Note?";

    const cancelDialogBoxBtn = document.createElement("button");
    cancelDialogBoxBtn.textContent = "Cancel";
    cancelDialogBoxBtn.classList.add("cancel-btn");

    const deleteDialogBoxBtn = document.createElement("button");
    deleteDialogBoxBtn.textContent = "Yes";
    deleteDialogBoxBtn.classList.add("delete-note-btn");

    cancelDialogBoxBtn.addEventListener ('click', ()=>{
        deleteDialogBox.close();
    });

    deleteDialogBoxBtn.addEventListener ('click', ()=>{
        noteContainer.removeChild(noteDiv); 
        localStorage.removeItem(noteId); 
        deleteDialogBox.close();

    } )

    deleteDialogBox.appendChild(cancelDialogBoxBtn);
    deleteDialogBox.appendChild(deleteDialogBoxBtn);
    document.body.appendChild(deleteDialogBox);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener('click', () => {
        deleteDialogBox.showModal();
       
    });


    noteDiv.appendChild(newNote);
    noteDiv.appendChild(characterCount);
    noteDiv.appendChild(saveBtn);
    noteDiv.appendChild(editBtn);
    noteDiv.appendChild(deleteBtn);

 
    noteContainer.appendChild(noteDiv);
}

addNoteBtn.addEventListener('click', addNote);
