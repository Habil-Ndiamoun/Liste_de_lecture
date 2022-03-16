import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useParams } from 'react-router-dom';


function PageSupprimer(){
    const [piece, setPiece] = useState({});
    const {id} = useParams();

    async function chercherDonnees(id)
    {
        const resultat = await fetch(`/api/pieces/${id}`);
        const body = await resultat.json();

        setPiece(body);
    }

    useEffect(() => {
        chercherDonnees();
    }, [piece.id])

    return(
        <Container>
            <Row>
                <Col>
                    <h3 style={{color:'red'}}>Voulez-vous supprimer la pièce ci-dessous?</h3>
                    <ul>
                        <li>Titre: {piece.titre}</li>
                        <li>Artiste: {piece.artiste}</li>
                        <li>Categorie: {piece.categorie}</li>
                    </ul>

                    <Link style={{textDecoration: 'none', color: 'white'}} to="/admin">
                        <button type="button" onClick={() => 
                            fetch(`/api/pieces/supprimer/${id}`, {method: 'DELETE', headers:{'Content-Type': 'application/json'}})
                            .then(function (reponse) {
                                console.log(reponse)
                                return reponse.json();
                            }).catch(function (error){
                                console.log(error)
                            })
                        
                        } className="btn btn-primary">Supprimer</button>&nbsp;
                    </Link>
                    <Link to="/admin">
                        <button type="button" className="btn btn-danger">Annuler</button>
                    </Link>         
                </Col>
            </Row>
        </Container>
    );
}
export default PageSupprimer;