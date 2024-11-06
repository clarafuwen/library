const collection = document.querySelector(".collection");
const dialog = document.querySelector("dialog");
const showDialog = document.querySelector(".showDialog");
const closeButton = document.querySelector(".closeButton");
const submitButton = document.querySelector(".submitButton");
const newBookForm = document.querySelector(".newBookForm");

let myLibrary = [];

addBookToLibrary("The Hobbit","J.R.R Tolkien", "978-0547928227",295,"No");
addBookToLibrary("Behave","Robert M Sapolsky", "978-0143110910",800,"No");
addBookToLibrary("The XX Brain","Lisa Mosconi", "978-0593083116",368,"Yes");
addBookToLibrary("A Gentleman in Moscow", "Amor Towles","978-0670026197",480,"Yes");


showDialog.addEventListener("click", () => {
    dialog.showModal();
})

submitButton.addEventListener("click", (e)=> {
    e.preventDefault();
    addBookToLibrary(title.value, author.value, isbn.value, page.value, readOrNot.checked === true? "Yes":"No");
    newBookForm.reset();
    dialog.close();

})

closeButton.addEventListener("click", ()=>{
    newBookForm.reset();
    dialog.close();
})


collection.addEventListener("click", (e)=>{
 if(e.target.className === "toggle_read"){
    const target_isbn = e.target.parentElement.parentElement.getAttribute("id");
    const target = myLibrary.filter(book => book.isbn === target_isbn)[0];
    target.toggleRead();
    reset();
    displayBooks();
 } else if(e.target.className === "delete_book"){
    const isbn_to_delete = e.target.parentElement.getAttribute("id");
    collection.removeChild(e.target.parentElement);
    const updatedLibrary = myLibrary.filter(book=> book.isbn !== isbn_to_delete);
    myLibrary = updatedLibrary;
 }
})


function Book(title, author, isbn, pages, read){
    this.title = title;
    this.author = author;
    this.isbn = isbn,
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function(){
    console.log("inside toggle read func")
    this.read = this.read === "Yes"? "No":"Yes";
}


function addBookToLibrary(title, author,isbn, pages, read){
    const book = new Book(title, author,isbn, pages, read);
    myLibrary.push(book);
    reset();
    displayBooks();
}

function displayBooks(){
    myLibrary.forEach(book => {
        const row = document.createElement("tr");
        for(const prop in book){
            if(typeof book[prop] !== 'function'){
                const data = document.createElement("td")
                data.textContent = book[prop];
                row.appendChild(data);
            }
        }
        row.setAttribute("id",book["isbn"]);
        row.setAttribute("class","book")
        const button_cell = document.createElement("td");
        const toggle_read_button = document.createElement("button");
        toggle_read_button.textContent = "Change read status";
        toggle_read_button.setAttribute("class","toggle_read");
        const deletion_cell = document.createElement("td");
        deletion_cell.textContent = "Delete Book";
        deletion_cell.setAttribute("class","delete_book")
        button_cell.appendChild(toggle_read_button);
        row.appendChild(button_cell);
        row.appendChild(deletion_cell);
        collection.appendChild(row);
    });

}

function reset(){
    const rows = collection.querySelectorAll(".book");
    rows.forEach((row) => {
        collection.removeChild(row);
    })
}