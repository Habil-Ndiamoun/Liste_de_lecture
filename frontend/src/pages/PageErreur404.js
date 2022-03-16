import Alert from 'react-bootstrap/Alert'
import React from "react";


function PageErreur404(){
    return(
        <Alert variant="danger">
            <h1>Erreur 404 : La ressource sollicitée n'existe pas</h1>
        </Alert>
    );
}
export default PageErreur404;