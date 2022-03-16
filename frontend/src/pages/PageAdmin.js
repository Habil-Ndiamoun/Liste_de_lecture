import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import repertoire from '../repertoire';
import { Link } from 'react-router-dom';


function CategorieIndividuelle({categorie}){
    return(
        <tr>
            <th colSpan={2}>{categorie}</th>
        </tr>
    );
}

function LignePieceIndividuelle({piece}){
    return(
        <tr>
            <td>{piece.titre}</td>
            <td>{piece.artiste}</td>
            <td>
                <Link to={`/modifier/${piece.id}`}>
                    <Button variant="success" className="me-2">Modifier</Button>
                </Link>

                <Link to={`/supprimer/${piece.id}`}>
                    <Button variant="danger">Supprimer</Button>
                </Link>
            </td>
        </tr>
    );
}

function Repertoire({repertoire}){
    const contenuTableau = [];
    let derniereCategorieRencontree = null;

    repertoire.forEach(piece => {
        if(piece.categorie !== derniereCategorieRencontree)
        {
            derniereCategorieRencontree = piece.categorie;
            contenuTableau.push(<CategorieIndividuelle key={derniereCategorieRencontree} categorie={derniereCategorieRencontree} />);
        }
        contenuTableau.push(<LignePieceIndividuelle key={piece.titre} piece={piece} />);
    });

    return(
        <Table>
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Artiste</th>
                </tr>
            </thead>

            <tbody>{contenuTableau}</tbody>
        </Table>
    );
}

function PageAdmin(){
    const [pieces, setPieces] = useState([]);

    const chercherDonnees = async() => {
        const resultat = await fetch('/api/pieces');
        const body = await resultat.json();
        setPieces(body);
    };

    useEffect(() => {
        chercherDonnees();
    }, []);

    return(
        <Container>
            <h1>Page de gestion</h1>
            <Link to={`/ajouter`}>
                <Button variant="primary">Ajouter</Button>
            </Link>
            <Row>
                <Repertoire repertoire={repertoire} />
            </Row>
        </Container>

    );
}
export default PageAdmin;