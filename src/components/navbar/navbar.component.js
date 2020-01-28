import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <ul className="nav nav-pills navbar-dark bg-primary justify-content-center">
        <li className="nav-item">
          <Link to="/" className="btn btn-success my-2 my-sm-0 mx-2">Movements</Link>
        </li>
        <li className="nav-item">
        <Link to="/movements/upload" className="nav-link active">File Upload</Link>
        </li>
      </ul>
    );
  }
}