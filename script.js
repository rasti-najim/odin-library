// Define the Book class
// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// Book.prototype.toggleReadStatus = function() {
//   this.read = !this.read;
// };

// function createBook(title, author, pages, read) {
//   return {
//     title,
//     author,
//     pages,
//     read,
//     toggleReadStatus() {
//       this.read = !this.read;
//     },
//   };
// }

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

// Initialize library with some books
const myLibrary = [
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
  new Book("To Kill a Mockingbird", "Harper Lee", 324, false),
  new Book("1984", "George Orwell", 328, true),
];

// const myLibrary = [
//   createBook("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
//   createBook("To Kill a Mockingbird", "Harper Lee", 324, false),
//   createBook("1984", "George Orwell", 328, true),
// ];

function displayLibrary() {
  const tableBody = document.querySelector("#libraryTable tbody");
  tableBody.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");

    // Create and append cells
    ["title", "author", "pages", "read"].forEach((key) => {
      const cell = document.createElement("td");
      cell.textContent =
        key === "read" ? (book[key] ? "Read" : "Not read yet") : book[key];
      row.appendChild(cell);
    });

    // Create and append action buttons
    const actionsCell = document.createElement("td");

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.dataset.index = index;
    removeButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      displayLibrary();
    });
    actionsCell.appendChild(removeButton);

    const toggleReadButton = document.createElement("button");
    toggleReadButton.textContent = "Toggle Read";
    toggleReadButton.dataset.index = index;
    toggleReadButton.addEventListener("click", () => {
      myLibrary[index].toggleReadStatus();
      displayLibrary();
    });
    actionsCell.appendChild(toggleReadButton);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayLibrary();

  const newBookBtn = document.querySelector("#newBookBtn");
  const newBookDialog = document.querySelector("#newBookDialog");
  const newBookForm = document.querySelector("#newBookForm");
  const cancelBtn = document.querySelector("#cancelBtn");

  newBookBtn.addEventListener("click", () => newBookDialog.showModal());

  newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = parseInt(document.querySelector("#pages").value, 10);
    const read = document.querySelector("#read").checked;

    myLibrary.push(new Book(title, author, pages, read));
    // myLibrary.push(createBook(title, author, pages, read));
    displayLibrary();
    newBookDialog.close();
    newBookForm.reset();
  });

  cancelBtn.addEventListener("click", () => newBookDialog.close());
});
