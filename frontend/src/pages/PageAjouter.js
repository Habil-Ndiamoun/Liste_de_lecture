import React from "react";


function PageAjouter(){
    return(
        <div class="container col-xl-10">
            <div class="row align-items-center g-lg-5 py-5">
                <div class="col-xl-10 mx-auto col-lg-5">
                    <div class="p-4 p-md-5 border rounded-3 bg-light">
                        <div class="mb-3">
                            <p class="text-center"><h1>Ajouter une nouvelle pièce</h1></p>
                        </div>
                        
                        <form>
                            <div class="form-group">
                                <label for="titre">Titre</label>
                                <input type="text" class="form-control" id="titre" name="titre" placeholder="Entrer le titre"/>
                            </div>
                            <div class="form-group">
                                <label for="artiste">Artiste</label>
                                <input type="text" class="form-control" id="artiste" name="artiste" placeholder="Enter l'artiste"/>
                            </div>
                            <div class="form-group">
                                <label for="categorie">Catégorie</label>
                                <input type="text" class="form-control" id="categorie" name="categorie" placeholder="Enter la catégorie"/>
                            </div><p></p>

                            <button type="button" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PageAjouter;