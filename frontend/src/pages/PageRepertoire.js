import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import repertoire from '../repertoire';


function LignePiece({piece}){
    return(
        <tr>
            <td>{piece.titre}</td>
            <td>{piece.artiste}</td>
        </tr>
    );
}

function LigneCategorie({categorie}){
    return(
        <tr>
            <th colSpan={2}>{categorie}</th>
        </tr>
    );
}

function Repertoire({repertoire}){
    const contenuTableau = [];
    let derniereCategorie = null;

    repertoire.forEach(piece => {
        if(piece.categorie !== derniereCategorie)
        {
            derniereCategorie = piece.categorie
            contenuTableau.push(<LigneCategorie key={derniereCategorie} categorie={derniereCategorie} />)
        }
        contenuTableau.push(<LignePiece key={piece.titre} piece ={piece} />)
    })

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

function PageRepertoire (){
    const [pieces, setPieces] = useState([]);

    /*async function chercherDonnees() 
    {
        const resultat = await fetch('/api/pieces');
        const body = await resultat.json();
        setPieces(body);
    }*/

    //Ou
    const chercherDonnees = async() => {
        const resultat = await fetch('/api/pieces')
        const body = await resultat.json();
        setPieces(body);
    };

    useEffect(() => {
        chercherDonnees();
    }, [pieces]);

    return(
        <Container>
            <Alert  variant="primary">
                <h1>Répertoire</h1>
            </Alert>

            <Row>
                <Repertoire repertoire={repertoire} />
            </Row>
        </Container>
    );
}

export default PageRepertoire ;