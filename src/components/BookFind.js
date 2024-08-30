import React, { useState } from 'react';

const BookFind = () => {
  const [bookId, setBookId] = useState('');
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/books/${bookId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Livro não encontrado ou erro de rede');
        }
        return response.json();
      })
      .then(data => setBook(data))
      .catch(error => setError(error.message));
  };

  return (
    <div>
      <h2>Consultar de Livros</h2>
      <form onSubmit={handleSearch}>
        <label htmlFor="bookId"><strong>ID do Livro:</strong></label>
        <input
          type="text"
          id="bookId"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
        <button type="submit">Buscar Livro</button>
      </form>
      
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      
      {book && (
        <div>
          <h3>Detalhes do Livro:</h3>
          <p><strong>Título:</strong> {book.title}</p>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Preço:</strong> {book.price}</p>
        </div>
      )}
    </div>
  );
};

export default BookFind;
