//Get UI Elements

let from = document.querySelector('#book-form')
let bookList = document.querySelector('#book-list')



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
    

    static addToBookList(book) {
        //console.log(book)

        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete" style="text-decoration: none;color:red;">X</a></td>
        `
        list.appendChild(row)
    }

    static clearFields() {
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }

    static showAlert(message, className){
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


    static deleteFromBookLst(target){
        if (target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert("Book Removed!", "error");
        }
    }
}

//Store data to local storage class

class Store{
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null){
            books=[];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        let books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks(){
        let books = Store.getBooks();

        books.forEach(book => {
            UI.addToBookList(book);
        });
    }

    static removeBook(isbn){
        let books = Store.getBooks();

        books.forEach((book, index)=>{
            if (book.isbn === isbn){
                books.splice(index, 1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Add event listener

from.addEventListener('submit', newBook);
bookList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());

//Define function

function newBook(e) {
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    

    if (title === '' || author === '' || isbn === '') {
       
        UI.showAlert("Please Fill up all the Fields!!", "error");

    } else {
        let book = new Book(title, author, isbn);
        UI.addToBookList(book);
        UI.clearFields();
        UI.showAlert("Book Added!!", "success");

        Store.addBook(book);
    }

    //console.log("Submitted");
    //console.log(book);

    e.preventDefault();
}


function removeBook(e){

   
    UI.deleteFromBookLst(e.target);
    


    e.preventDefault();

}
