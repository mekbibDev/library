var library = [];

function Book(title, author, description, pages,read) {
  this.title = title;
  this.author = author;
  this.description = description;
  this.pages = pages;
  this.read = read;
}

Book.prototype.haveRead = function(){
  this.read = !this.read;
}
function addBookToLibrary(book) {
  library.push(book);
}

function displayBooks(library, booksDisplay) {

  for (let i = 0; i < library.length; i++) {
    let book = library[i];
    let bookElement = document.createElement('li');
    let info = document.createElement('p');
    info.textContent = `${book.title} ${book.author}. ${book.read ? 'Have read' : 'Havent read'}`;
    bookElement.dataset.index = i;

    let deleteButton = document.createElement('button');
    deleteButton.dataset.index = i;
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click',deleteBook);

    let readToggleButton = document.createElement('button');
    readToggleButton.dataset.index = i;
    readToggleButton.textContent = 'read';
    readToggleButton.addEventListener('click',toggleRead)

    bookElement.appendChild(info);
    bookElement.appendChild(readToggleButton);
    bookElement.appendChild(deleteButton);
    booksDisplay.appendChild(bookElement);
  }
}

function deleteBook(e){
  var index = e.target.getAttribute('data-index');
  library.splice(index,1);
  while (booksDisplay.firstChild) {
    booksDisplay.removeChild(booksDisplay.firstChild);
  }
  displayBooks(library,booksDisplay);
}

function toggleRead(e){
  var index = e.target.getAttribute('data-index');
  var bookElement = document.querySelector(`[data-index='${index}']`);
  var book = library[index];
  book.haveRead();

  bookElement.querySelector('p').textContent = `${book.title} ${book.author}. ${book.read ? 'Have read' : 'haven\'t read'}`;
}

var book1 = new Book('Eternal Skies', 'Emily Johnson', 'In a world where the sky never changes, \
four young adventurers set out on a perilous journey to uncover the secrets behind the immovable heavens.\
As they navigate through ancient ruins and mystical forests, they must confront their fears and make choices \
that will alter the fate of their world forever', 352,true);
addBookToLibrary(book1);

var book2 = new Book('Whispers of the Night', 'Michael Williams', 'Set in 19th-century London, this gripping mystery follows\
 detective William Thompson as he investigates a series of gruesome murders plaguing the city. As the body count rises and \
 the clues become more cryptic, Thompson must unravel the enigmatic whispers of the night to catch the elusive killer before\
  time runs out.', 428,false);
addBookToLibrary(book2);

var book3 = new Book('The Quantum Gate', 'Sarah Parker', 'When brilliant physicist Dr. Catherine Evans discovers a hidden gateway\
 to alternate dimensions, she opens the door to a world of infinite possibilities and dangers. As governments and corporations vie\
  for control of this revolutionary technology, Catherine must navigate the treacherous waters of power and greed while struggling\
   with the moral implications of her discovery.', 512,true);
addBookToLibrary(book3);

var booksDisplay = document.querySelector('#booksDisplay');
displayBooks(library, booksDisplay);

