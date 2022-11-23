const addBtn = document.getElementById('add')
const deleteAll = document.querySelector('.delete-all')

addBtn.addEventListener('click', () => renderNote())

const renderNote = (text = '') => {
    const newNote = document.createElement('div')
    newNote.classList.add('note')
    newNote.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class = "${text ? "hidden" : ""}"></textarea>
    `
    const deleteBtn = newNote.querySelector('.delete')
    const editBtn = newNote.querySelector('.edit')
    const main = newNote.querySelector('.main')
    const textArea = newNote.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked.parse(text)
    

    deleteBtn.addEventListener('click', () => {
        newNote.remove()
        updateLocalStorage()
    })

    editBtn.addEventListener('click', () => {
        
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
        
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target
        main.innerHTML = value

        updateLocalStorage()
    })

    deleteAll.addEventListener('click', () => {
        newNote.remove()
        localStorage.clear()
    })
    
     document.body.appendChild(newNote)
}


function updateLocalStorage() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => {
        notes.push(note.value)
    });

    localStorage.setItem('notes', JSON.stringify(notes))
}

const notes = JSON.parse(localStorage.getItem('notes'))
if (notes) {
    notes.forEach(note => renderNote(text = note))
}
