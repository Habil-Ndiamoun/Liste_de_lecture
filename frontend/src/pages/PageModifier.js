import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


function PageModifier(){
    const [titrePiece, setTitrePiece] = useState("");
    const [artistePiece, setArtistePiece] = useState("");
    const [categoriePiece, setCategoriePiece] = useState("");

    const [piece, setPiece] = useState({});
    const {id : id} = useParams();

    const optionsRequete = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({titre: titrePiece, artiste: artistePiece, categorie: categoriePiece})
    }


    async function chercherDonnees(id)
    {
        const resultat = await fetch(`/api/pieces/${id}`);
        const piece = await resultat.json();

        setPiece(piece);
        setTitrePiece(piece.titre);
        setArtistePiece(piece.artiste);
        setCategoriePiece(piece.categorie);
    }

    useEffect(() =>{
        chercherDonnees();
    }, [piece.id]);

    function handleChange(e){
        if(e.target.id === "titre")
        {
            setTitrePiece(e.target.value);
        }
        else if(e.target.id === "artiste")
        {
            setArtistePiece(e.target.value);
        }
        else if(e.target.id === "categorie")
        {
            setCategoriePiece(e.target.value);
        }
    }

    return(
        <div className="container col-xl-10">
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-xl-10 mx-auto col-lg-5">
                    <div className="p-4 p-md-5 border rounded-3 bg-light">
                        <div className="mb-3">
                            <h1 className="text-center">Modifier une pièce</h1>
                        </div>
                        
                        <form>
                            <div className="form-group">
                                <label for="titre">Titre</label>
                                <input type="text" onChange={handleChange} className="form-control" id="titre" name="titre" placeholder="Entrer le titre"/>
                            </div>
                            <div className="form-group">
                                <label for="artiste">Artiste</label>
                                <input type="text" onChange={handleChange} className="form-control" id="artiste" name="artiste" placeholder="Entrer l'artiste"/>
                            </div>
                            <div className="form-group">
                                <label for="categorie">Catégorie</label>
                                <input type="text" onChange={handleChange} className="form-control" id="categorie" name="categorie" placeholder="Entrer la catégorie"/>
                            </div><p></p>
                            
                            <Link style={{textDecoration: 'none', color: 'white'}} to="/admin">
                                <button type="button" onClick={() => 
                                    fetch(`/api/pieces/modifier/${id}`, optionsRequete)
                                    .then(function (reponse){
                                        console.log(reponse);
                                        return reponse.json();
                                    }).catch(function(error){
                                        console.log(error)
                                    }) 
                                }
                                className="btn btn-primary">Submit</button>&nbsp;
                            </Link>

                            <Link to="/admin">
                                <button type="button" className="btn btn-danger">Annuler</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PageModifier;