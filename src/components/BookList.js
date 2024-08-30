import React, { useEffect, useState } from 'react';

const BooksList = () => {

  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/books')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setBooks(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div>
      <h2>Lista de Livros</h2>
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      <ul>
        {books.length > 0 ? (
          books.map(book => (
            <li key={book.id}>
              Id: {book.bookid} {book.title} Autor: {book.author} Categoria: {book.category} Quantidade: {book.quantity} Preço: {book.price}
            </li>
          ))
        ) : (
          <p>Nenhum livro encontrado.</p>
        )}
      </ul>
    </div>
  );
};

export default BooksList;
