library = [];

function Book(title, author, description, pages) {
  this.title = title;
  this.author = author;
  this.description = description;
  this.pages = pages;
}

function addBook(book) {
  library.push(book);
}

function displayBooks(library, booksDisplay) {

  for (let i = 0; i < library.length; i++) {
    let book = document.createElement('li');
    book.textContent = library[i].title + ' ' + library[i].author;
    book.dataset.index = i;
    booksDisplay.appendChild(book);
  }
}

let book1 = new Book('Eternal Skies', 'Emily Johnson', 'In a world where the sky never changes, \
four young adventurers set out on a perilous journey to uncover the secrets behind the immovable heavens.\
As they navigate through ancient ruins and mystical forests, they must confront their fears and make choices \
that will alter the fate of their world forever', 352);
addBook(book1);

let book2 = new Book('Whispers of the Night', 'Michael Williams', 'Set in 19th-century London, this gripping mystery follows\
 detective William Thompson as he investigates a series of gruesome murders plaguing the city. As the body count rises and \
 the clues become more cryptic, Thompson must unravel the enigmatic whispers of the night to catch the elusive killer before\
  time runs out.', 428);
addBook(book2);

let book3 = new Book('The Quantum Gate', 'Sarah Parker', 'When brilliant physicist Dr. Catherine Evans discovers a hidden gateway\
 to alternate dimensions, she opens the door to a world of infinite possibilities and dangers. As governments and corporations vie\
  for control of this revolutionary technology, Catherine must navigate the treacherous waters of power and greed while struggling\
   with the moral implications of her discovery.', 512);
addBook(book3);

let booksDisplay = document.querySelector('#booksDisplay');
displayBooks(library, booksDisplay);

