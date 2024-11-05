const collection = document.querySelector(".collection");
const dialog = document.querySelector("dialog");
const showDialog = document.querySelector(".showDialog");
const closeButton = document.querySelector(".closeButton");
const submitButton = document.querySelector(".submitButton");
const title = dialog.querySelector("#title");
const author = dialog.querySelector("#author");
const isbn = dialog.querySelector("#isbn");
const readOrNot = dialog.querySelector("#readOrNot");
const page = dialog.querySelector("#page");
const newBookForm = document.querySelector(".newBookForm");

// const delete_book = document.querySelectorAll(".delete_book");

const myLibrary = [
    {
        title: "The Hobbit", 
        author: "J.R.R Tolkien", 
        isbn: "978-0547928227",
        page: 295,
        read: "No"
    },
    {
        title: "Behave", 
        author: "Robert M Sapolsky", 
        isbn: "978-0143110910",
        page: 800,
        read: "No"
    },
    {
        title: "The XX Brain", 
        author: "Lisa Mosconi", 
        isbn: "978-0593083116",
        page: 368,
        read: "Yes"
    },
    {
        title: "A Gentleman in Moscow", 
        author: "Amor Towles", 
        isbn: "978-0670026197",
        page: 480,
        read: "Yes"
    },
];


displayBooks();

const delete_book = document.querySelectorAll(".delete_book");
const toggle_read = document.querySelectorAll(".toggle_read");

showDialog.addEventListener("click", () => {
    dialog.showModal();
})

submitButton.addEventListener("click", (e)=> {
    e.preventDefault();
    console.log(title.value, author.value, isbn.value, page.value, readOrNot);
    addBookToLibrary(title.value, author.value, isbn.value, page.value, readOrNot.checked === true? "Yes":"No");
    newBookForm.reset();
    dialog.close();

})

closeButton.addEventListener("click", ()=>{
    console.log("inside close")
    newBookForm.reset();
    dialog.close();
})



delete_book.forEach((delete_cell) =>{
    delete_cell.addEventListener("click", () =>{
        const isbn_to_delete = delete_cell.parentElement.getAttribute("id");
        console.log(isbn_to_delete);
        collection.removeChild(delete_cell.parentElement);
        const updatedLibrary = myLibrary.filter(book=> book.isbn !== isbn_to_delete)

        console.log(myLibrary)
        console.log(updatedLibrary)
    })
})

console.log(toggle_read);
toggle_read.forEach((toggle) =>{
    toggle.addEventListener("click", ()=>{
        const target_isbn = toggle.parentElement.parentElement.getAttribute("id");
        const target = myLibrary.filter(book => book.isbn === target_isbn);
        console.log(target);
        target.toggleRead();
        console.log(myLibrary);
        displayBooks();

    })
})

function Book(isbn,title, author, pages, read){
    this.isbn = isbn,
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // this.info = function(){
    //     return (`${this.title} by ${this.author}, ${pages} pages, ${read}`)
    // }
}
Book.prototype.toggleRead = function(){
    this.read = this.read === "Yes"? "No":"Yes";
}


function addBookToLibrary(isbn,title, author, pages, read){
    const book = new Book(isbn, title, author, pages, read);
    book.toggleRead();
    myLibrary.push(book);
    reset();
    displayBooks();
}

function displayBooks(){
    myLibrary.forEach(book => {
        const row = document.createElement("tr");
        for(const prop in book){
            const data = document.createElement("td")
            data.textContent = book[prop];
            row.appendChild(data);
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
        // console.log(row);
        collection.appendChild(row);
    });

}

function reset(){
    const rows = collection.querySelectorAll(".book");
    console.log(rows);
    rows.forEach((row) => {
        collection.removeChild(row);
    })
}