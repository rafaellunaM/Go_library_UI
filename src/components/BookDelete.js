// src/components/BookDelete.js

import React, { useState } from 'react';

const BookDelete = () => {
  const [bookId, setBookId] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleDeleteBook = (e) => {
    e.preventDefault();
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
    fetch(`${backendUrl}/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao remover o livro');
        }
        return response.json();
      })
      .then(() => {
        setSuccessMessage('Livro removido com sucesso!');
        setError(null);
      })
      .catch(error => setError(error.message));
  };

  return (
    <div>
      <h2>Remover Livros</h2>
      <form onSubmit={handleDeleteBook}>
        <label htmlFor="bookId">ID do Livro:</label>
        <input
          type="text"
          id="bookId"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
        <button type="submit">Remover Livro</button>
      </form>

      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default BookDelete;
