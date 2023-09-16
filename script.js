var library = [];

function Book(title, author, description, pages, read) {
  this.title = title;
  this.author = author;
  this.description = description;
  this.pages = pages;
  this.read = read;
}

Book.prototype.haveRead = function () {
  this.read = !this.read;
}
function addBookToLibrary(book) {
  library.push(book);
}

function displayBooks(library, booksDisplay) {

  library.forEach(book => {
    let bookRow = document.createElement('tr');
    bookRow.dataset.title = book['title'];

    let title = document.createElement('td');
    title.textContent = book['title'];
    bookRow.appendChild(title);

    let author = document.createElement('td');
    author.textContent = book['author'];
    bookRow.appendChild(author);

    let description = document.createElement('td');
    description.textContent = book['description'];
    bookRow.appendChild(description);

    let pages = document.createElement('td');
    pages.textContent = book['pages'];
    bookRow.appendChild(pages);

    let read = document.createElement('td');
    read.textContent = book.read ? 'Yes' : 'No';
    read.dataset.titleRead = book.title + read.textContent;
    read.appendChild(createReadToggleButton(read, book));
    bookRow.appendChild(read);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.dataset.title = book['title'];
    deleteButton.addEventListener('click', deleteBook);
    bookRow.appendChild(deleteButton);

    booksDisplay.appendChild(bookRow);
  });
}

function deleteBook(e) {
  var title = e.target.getAttribute('data-title');
  var bookRow = document.querySelector(`tr[data-title='${title}']`);
  if (bookRow.parentNode) {
    bookRow.parentNode.removeChild(bookRow);
  }
  library = library.filter(book => book.title != title);
}

function createReadToggleButton(element, book) {
  let readToggleButton = document.createElement('button');
  readToggleButton.dataset.title = book['title'];
  readToggleButton.dataset.titleRead = book.title + element.textContent;
  readToggleButton.textContent = 'read';
  readToggleButton.addEventListener('click', toggleRead)

  return readToggleButton;
}
function toggleRead(e) {
  var title = e.target.getAttribute('data-title');
  var bookRow = document.querySelector(`tr[data-title='${title}']`);
  var book = library.find(book => book.title === title);
  book.haveRead();

  var titleRead = e.target.getAttribute('data-title-Read');
  var read = document.querySelector(`td[data-title-Read='${titleRead}']`);
  read.textContent = book.read ? 'Yes' : 'No';
  read.dataset.titleRead = book.title + read.textContent;
  read.appendChild(createReadToggleButton(read, book));
}

var book1 = new Book('Eternal Skies', 'Emily Johnson', 'In a world where the sky never changes, \
four young adventurers set out on a perilous journey to uncover the secrets behind the immovable heavens.\
As they navigate through ancient ruins and mystical forests, they must confront their fears and make choices \
that will alter the fate of their world forever', 352, true);
addBookToLibrary(book1);

var book2 = new Book('Whispers of the Night', 'Michael Williams', 'Set in 19th-century London, this gripping mystery follows\
 detective William Thompson as he investigates a series of gruesome murders plaguing the city. As the body count rises and \
 the clues become more cryptic, Thompson must unravel the enigmatic whispers of the night to catch the elusive killer before\
  time runs out.', 428, false);
addBookToLibrary(book2);

var book3 = new Book('The Quantum Gate', 'Sarah Parker', 'When brilliant physicist Dr. Catherine Evans discovers a hidden gateway\
 to alternate dimensions, she opens the door to a world of infinite possibilities and dangers. As governments and corporations vie\
  for control of this revolutionary technology, Catherine must navigate the treacherous waters of power and greed while struggling\
   with the moral implications of her discovery.', 512, true);
addBookToLibrary(book3);

var booksDisplay = document.querySelector('table');
var thead = document.querySelector('thead');
var headerRow = document.createElement('tr');

for (key in book1) {
  if (key === 'haveRead')
    continue;
  let header = document.createElement('th');
  header.textContent = key;
  header.scope = 'col';
  headerRow.appendChild(header);
}
booksDisplay.appendChild(headerRow);
displayBooks(library, booksDisplay);

