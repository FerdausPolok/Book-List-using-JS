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

    showAlert(message, className){
        let div = document.createElement('div');
        div.className= `alert ${className}` //Skeleton CSS Class -> alert className

        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container')
        let form = document.querySelector('#book-form')

        container.insertBefore(div, form) //new div boshalam form er age

        setTimeout(()=>{
            document.querySelector('.alert').remove();
        }, 2500);
    }
}

//Add event listener

from.addEventListener('submit', newBook);

//Define function

function newBook(e) {
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    let ui = new UI();

    if (title === '' || author === '' || isbn === '') {
       
        ui.showAlert("Please Fill up all the Fields!!", "error");

    } else {
        let book = new Book(title, author, isbn);
        ui.addToBookList(book);
        ui.clearFields();
        ui.showAlert("Book Added!!", "success");
    }




    //console.log("Submitted");
    //console.log(book);

    e.preventDefault();
}