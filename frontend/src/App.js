import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { 
  BrowserRouter as Router,
  Routes, Route } from "react-router-dom";

import BarreNavigation from './BarreNavigation';
import PageAccueil from './pages/PageAccueil';
import PageRepertoire from './pages/PageRepertoire';
import PageAdmin from './pages/PageAdmin';
import PageAjouter from './pages/PageAjouter';
import PageModifier from './pages/PageModifier';
import PageSupprimer from './pages/PageSupprimer';


function App() {
  return (
    <Router>
      <Container>
        <BarreNavigation />
        <Routes>
          <Route path="/" element = {<PageAccueil />} />
          <Route path="repertoire" element = {<PageRepertoire />} />
          <Route path="admin" element = {<PageAdmin />} />
          <Route path="ajouter" element = {<PageAjouter />} />
          <Route path="modifier/:id" element = {<PageModifier />} />
          <Route path="supprimer/:id" element = {<PageSupprimer />} />
          {/*<Route path="*" element = {<PageErreur404 />} />*/}
        </Routes>
      </Container>
    </Router>

  );
}

export default App;
