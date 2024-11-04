const collection = document.querySelector(".collection");
const dialog = document.querySelector("dialog");
const showDialog = document.querySelector(".showDialog");
const closeButton = document.querySelector(".closeButton")
const title = dialog.querySelector("#title");
const author = dialog.querySelector("#author");
const isbn = dialog.querySelector("#isbn");
const readOrNot = dialog.querySelector("#readOrNot");
const page = dialog.querySelector("#page");




const myLibrary = [
    {
        title: "The Hobbit", 
        author: "J.R.R Tolkien", 
        isbn: "978-0547928227",
        page: 295,
        read: false
    },
    {
        title: "Behave", 
        author: "Robert M Sapolsky", 
        isbn: "978-0143110910",
        page: 800,
        read: false
    },
    {
        title: "The XX Brain", 
        author: "Lisa Mosconi", 
        isbn: "978-0593083116",
        page: 368,
        read: true
    },
];

displayBooks();

showDialog.addEventListener("click", () => {
    dialog.showModal();
})

closeButton.addEventListener("click", (e)=> {
    // e.preventDefault();
    console.log(title.value, author.value, isbn.value, page.value, readOrNot.value);
    addBookToLibrary(title.value, author.value, isbn.value, page.value, readOrNot.value);
    dialog.close();

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


function addBookToLibrary(isbn,title, author, pages, read){
    const book = new Book(isbn, title, author, pages, read);
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
        const deletion_cell = document.createElement("td");
        deletion_cell.textContent = "Delete Book";
        button_cell.appendChild(toggle_read_button);
        row.appendChild(button_cell);
        row.appendChild(deletion_cell);
        console.log(row);
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