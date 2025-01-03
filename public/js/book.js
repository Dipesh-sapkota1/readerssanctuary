export const searchAndRender = () => {
    document.querySelectorAll('.addBook').forEach(button => {
        button.addEventListener('click', (e) => {
          const bookCard = e.target.closest('#book-card');
          const book = {
            title: bookCard.querySelector('#bookName').textContent,
            bookCover: bookCard.querySelector('#bookFace').src,
            author: bookCard.querySelector('#writer').textContent.trim(),
            publishedDate: bookCard.querySelector('#publishedDate').textContent.trim()
          };
          console.log('Add Book button clicked for', book);
          addBook(book);  
        });
      });
      const addBook = async (book) => {
        try {
          const response = await axios.post('/books/add', book);
          if (response.status === 200) {
            window.location.href = '/home';
          }else{
            window.location.href = '/auth/login';
          }
        } catch (error) {
          console.error('Error adding book:', error);
        }
  };
};


 export const  deleteBook = async(bookId) => {

    try {
      const response = await fetch(`/books/delete/${bookId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
         window.location.href = '/books/booklist';
      
      } else {
       console.log(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }