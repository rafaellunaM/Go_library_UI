import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Administração dos livros</h1>
      <hr />
      <div className="links">
        <NavLink to="/" className="link" activeClassName="active" exact>
          Lista de livros
        </NavLink>
        <NavLink to="/add" className="link" activeClassName="active">
          Adicionar livros
        </NavLink>
        <NavLink to="/delete" className="link" activeClassName="active">
          Remover livros
        </NavLink>
        <NavLink to="/find" className="link" activeClassName="active">
          Buscar livros
        </NavLink>
        <NavLink to="/edit" className="link" activeClassName="active">
          editar livros
        </NavLink>
      </div>
    </header>
  );
};

export default Header;