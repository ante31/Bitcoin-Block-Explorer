import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import {Header} from "./components/header/Header";
import {Footer} from "./components/footer/Footer";
import HomePage from './Homepage';
import { useEffect, useState } from 'react';


function App() {
  const [message, setMessage] = useState('');

  return (
      <div className="d-flex flex-column site-container">
        <Header />
        <div>
          <h2>{message}</h2>
          <Container>
            <Routes>
            <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </div>
        <Footer />
      </div>
  );
}

export default App;
