import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { 
  BrowserRouter as Router,
  Routes, Route } from "react-router-dom";

import BarreNavigation from './BarreNavigation';
import PageAccueil from './pages/PageAccueil';

function App() {
  return (
    <Router>
      <Container>
        <BarreNavigation />
        <Routes>
          <Route path="/" element = {<PageAccueil />} />
         {/* <Route path="a-propos" element = {<PageAPropos />} />
          <Route path="liste-articles" element = {<PageListeArticles />} />
          <Route path="article/:nom" element = {<PageArticle />} />
          <Route path="article/:nom/ajouter-commentaire" element = {<FormulaireCommentaires />} />
          <Route path="autres-articles" element = {<ListeCommentaires commentaires={commentaires}/>} />
          <Route path="*" element = {<PageErreur404 />} />*/}
        </Routes>
      </Container>
    </Router>

  );
}

export default App;
