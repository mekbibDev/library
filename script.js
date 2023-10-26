class Book {
  title;
  author;
  description;
  pages;
  read;

  constructor(title, author, description, pages, read) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.pages = pages;
    this.read = read;
  }
  haveRead() {
    this.read = !this.read;
  }
}
class Library {
  books;

  constructor() {
    this.books = [];
  }
  addBook(book) {
    this.books.push(book);
  }

  deleteBook(title) {
    this.books = this.books.filter((book) => book.title != title);
  }
  findBook(title) {
    return this.books.find((book) => book.title === title);
  }
  get books() {
    return this.books;
  }

  set books(books) {
    this.books = books;
  }
}

var library = new Library();
var tbody = document.querySelector("tbody");
var thead = document.querySelector("thead");
var headerRow = document.createElement("tr");
var showDialogButton = document.querySelector("#showDialog");
var cancelButton = document.querySelector("#cancelButton");
var readButton = document.querySelector("#read");
var addBookDialog = document.querySelector("#addBookDialog");
var addBookButton = document.querySelector("#addBookButton");

var book1 = new Book(
  "Eternal Skies",
  "Emily Johnson",
  "In a world where the sky never changes, \
four young adventurers set out on a perilous journey to uncover the secrets behind the immovable heavens.\
As they navigate through ancient ruins and mystical forests, they must confront their fears and make choices \
that will alter the fate of their world forever",
  352,
  true
);
library.addBook(book1);

var book2 = new Book(
  "Whispers of the Night",
  "Michael Williams",
  "Set in 19th-century London, this gripping mystery follows\
 detective William Thompson as he investigates a series of gruesome murders plaguing the city. As the body count rises and \
 the clues become more cryptic, Thompson must unravel the enigmatic whispers of the night to catch the elusive killer before\
  time runs out.",
  428,
  false
);
library.addBook(book2);

var book3 = new Book(
  "The Quantum Gate",
  "Sarah Parker",
  "When brilliant physicist Dr. Catherine Evans discovers a hidden gateway\
 to alternate dimensions, she opens the door to a world of infinite possibilities and dangers. As governments and corporations vie\
  for control of this revolutionary technology, Catherine must navigate the treacherous waters of power and greed while struggling\
   with the moral implications of her discovery.",
  512,
  true
);
library.addBook(book3);

createTableHeader();
displayBooks(library, tbody);

showDialogButton.addEventListener("click", () => {
  addBookDialog.showModal();
  var inputs = document.querySelectorAll("input");
  var textArea = document.querySelector("textarea");
  addInputEventListers([...inputs, textArea]);
});
cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  addBookDialog.close();
});
readButton.addEventListener("click", (e) => {
  e.target.value = e.target.value === "Yes" ? "No" : "Yes";
});
addBookButton.addEventListener("click", addBookFromUser);

function addBookFromUser(e) {
  var book = getFormData();
  const valid = e.target.parentElement.parentElement.reportValidity();
  if (valid === false) return;
  e.preventDefault();
  library.addBook(book);
  addBook(book);
  document.querySelector("form").reset();
  addBookDialog.close();
}

function getFormData() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const description = document.querySelector("#description").value;
  const read = document.querySelector("#read").value === "Yes" ? true : false;
  var book = new Book(title, author, description, pages, read);

  return book;
}

function validateForm(e) {
  if (e.target.validity.valueMissing)
    e.target.setCustomValidity(`${e.target.name} is required`);
  else e.target.setCustomValidity("");
  e.target.reportValidity();
}
function displayBooks(library) {
  library.books.forEach((book) => addBook(book));
}

function addBook(book) {
  var bookRow = document.createElement("tr");
  bookRow.dataset.title = book["title"];

  bookRow.appendChild(createCell("title", book));
  bookRow.appendChild(createCell("author", book));
  bookRow.appendChild(createCell("description", book));
  bookRow.appendChild(createCell("pages", book));

  var read = document.createElement("td");
  read.appendChild(createReadToggleButton(book));
  bookRow.appendChild(read);

  var deleteTd = document.createElement("td");
  deleteTd.appendChild(createDeleteButton(book));
  bookRow.appendChild(deleteTd);

  tbody.appendChild(bookRow);
}

function createCell(name, book) {
  var cell = document.createElement("td");
  cell.textContent = book[name];

  return cell;
}
function createReadToggleButton(book) {
  var readToggleButton = document.createElement("button");
  readToggleButton.dataset.title = book["title"];
  readToggleButton.dataset.titleRead = book.title;
  readToggleButton.textContent = book.read ? "Yes" : "No";
  readToggleButton.addEventListener("click", toggleRead);

  return readToggleButton;
}

function createDeleteButton(book) {
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "delete";
  deleteButton.dataset.title = book["title"];
  deleteButton.addEventListener("click", deleteBook);

  return deleteButton;
}

function deleteBook(e) {
  var title = e.target.getAttribute("data-title");
  var bookRow = document.querySelector(`tr[data-title='${title}']`);
  if (bookRow.parentNode) {
    bookRow.parentNode.removeChild(bookRow);
  }
  library.deleteBook(title);
}

function toggleRead(e) {
  var title = e.target.getAttribute("data-title");
  var book = library.findBook(title);
  book.haveRead();
  e.target.textContent = book.read ? "Yes" : "No";
}

function createTableHeader() {
  var tableHeader = ["title", "author", "description", "pages", "read", ""];
  tableHeader.forEach((key) => {
    let header = document.createElement("th");
    header.textContent = key;
    header.scope = "col";
    thead.appendChild(header);
  });
}

function addInputEventListers(formInput) {
  formInput.forEach((element) => {
    element.addEventListener("blur", validateForm);
    element.addEventListener("input", validateForm);
  });
}
