// src/components/BookForm.js

import React, { useState } from 'react';

const BookForm = () => {
  const [bookid, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFetchBookBook = (e) =>{
    e.preventDefault();

    fetch(`http://localhost:8080/books`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Livro não encontrado ou erro de rede');
      }
      return response.json();
    })
    .then(data => {
      setBookId(data.bookid);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { bookid, title, author, quantity, category, price, availability };
    fetch(`http://localhost:8080/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao atualizar o livro');
        }
        return response.json();
      })
      .then(() => {
        setSuccessMessage('Livro adicionado com sucesso!');
        setError(null);
      })
      .catch(error => setError(error.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="bookid">ID do Livro:</label>
        <input
          type="text"
          id="bookid"
          value={bookid}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
      </div>
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
        <label htmlFor="availability">Disponibilidade:</label>
        <select
          id="availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value === 'true')}
        >
          <option value={true}>Disponível</option>
          <option value={false}>Indisponível</option>
        </select>
      </div>
      <button type="submit">Adicionar Livro</button>
    </form>
  );
};

export default BookForm;
