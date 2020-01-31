class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
    
}

class UI{

    addBookToList(book){
        const list = document.getElementById("book-list");

        //create tr eglement
        const row = document.createElement("tr");

        //Insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete"/>X</td>
        `;

        list.appendChild(row);
    }

    clearFields(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("ISBN").value = "";
    }

    showAlert(message, className){
        const div = document.createElement("div");
        div.className = `alert ${className}`;

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector(".container");

        const form = document.querySelector("#book-form");

        container.insertBefore(div, form);

        setTimeout(function(){
        document.querySelector(".alert").remove();
        }, 3000)

    }

    deleteBook(target){
        if(target.className === "delete"){
            target.parentElement.parentElement.remove();
        }
        
    }
}

class Store {
    static getBooks(){
        let books;

        if(localStorage.getItem("books") === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;

    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book) {
            const ui = new UI();
            ui.addBookToList(book);
        });

    }

    static addBooks(book){
        const books = Store.getBooks();
        books.push(book);
         
        localStorage.setItem("books", JSON.stringify(books));

    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index){
            books.splice(index, 1);
        });
        localStorage.setItem("books", JSON.stringify(books));

    }
}

document.addEventListener("DOMContentLoaded", Store.displayBooks);


document.getElementById("book-form").addEventListener('submit', 
function(e){
//Get form values
const title = document.getElementById('title').value;
const author = document.getElementById('author').value;
const isbn = document.getElementById('ISBN').value;

// Instantiate book
const book = new Book(title, author, isbn);

// Instantiate UI
const ui = new UI();



// Add book to list

if(title === "" || author === "" || isbn === ""){
    ui.showAlert("Need a valid value", "error");
    }else{
        ui.addBookToList(book);

        Store.addBook(book);

        ui.showAlert("Added in the list", "success");
        // Clear fields
        ui.clearFields();
        
    } 

    e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", 
function(e){
    const ui = new UI();
    ui.deleteBook(e.target);

    Store.removeBook
    (e.target.parentElement.previousElementSibling.textContent);
    
    ui.showAlert("Book removed!", "success");

    e.preventDefault();
    
});

