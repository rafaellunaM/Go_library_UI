// src/components/EditBook.js

import React, { useState } from 'react';

const EditBook = () => {
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [availability, setAvailability] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFetchBook = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/books/${bookId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Livro não encontrado ou erro de rede');
        }
        return response.json();
      })
      .then(data => {
        setTitle(data.title);
        setAuthor(data.author);
        setQuantity(data.quantity)
        setCategory(data.category)
        setPrice(data.price)
        setAvailability(data.availability)
        setError(null);
      })
      .catch(error => setError(error.message));
  };

  const handleUpdateBook = (e) => {
    e.preventDefault();

    const updatedBook = { bookid: bookId, title, author, quantity, category, price, availability };

    fetch(`http://localhost:8080/books/{bookid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao atualizar o livro');
        }
        return response.json();
      })
      .then(() => {
        setSuccessMessage('Livro atualizado com sucesso!');
        setError(null);
      })
      .catch(error => setError(error.message));
  };

  return (
    <div>
      <h2>Editar Livros</h2>
      <form onSubmit={handleFetchBook}>
        <label htmlFor="bookId">ID do Livro:</label>
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
      
      {bookId && (
        <form onSubmit={handleUpdateBook}>
          <div>
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="author">Autor:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantidade:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="category">Categoria:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Preço:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="availability">Preço:</label>
            <input
              type="text"
              id="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              required
            />
          </div>
          <button type="submit">Atualizar Livro</button>
        </form>
      )}

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default EditBook;
