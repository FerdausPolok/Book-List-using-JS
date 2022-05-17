//Get UI Elements

let from = document.querySelector('#book-form')


//Book Class

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//ui table data adding class

class UI {
    constructor() {

    }

    addToBookList(book) {
        //console.log(book)

        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='# class="delete>x</a></td>
        `
        list.appendChild(row)
    }

    clearFields() {
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }
}

//Add event listener

from.addEventListener('submit', newBook);

//Define function

function newBook(e) {
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    let book = new Book(title, author, isbn);

    let ui = new UI();

    ui.addToBookList(book);

    ui.clearFields();


    //console.log("Submitted");
    //console.log(book);

    e.preventDefault();
}