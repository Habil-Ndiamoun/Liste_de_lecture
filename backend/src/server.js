import express from 'express';
import { MongoClient} from 'mongodb';
import { ObjectId } from 'mongodb';

const app = express();
app.use(express.json());

//Connection à la base de données
const utiliserDB = async (operations, reponse) => {
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db('repertoire');

        await operations(db);
        client.close();
    }
    catch(erreur){
        reponse.status(500).json({message : 'Erreur de connexion à la BD', erreur});
    }
}; 

//1. GET /api/pieces : retourne la liste de toutes les pièces
app.get('/api/pieces', async(requete, reponse) =>{
    utiliserDB(async(db) =>{
        const pieces = await db.collection('pieces').find({}).toArray();
        reponse.status(200).json(pieces);
    }, reponse);
});

//2. GET /api/pieces/:id : retourne les informations pour une pièce
app.get('/api/pieces/:id', async(requete, reponse) => {
    const idPiece = requete.params.id;

    utiliserDB(async(db) => {
        const infosPiece = await db.collection('pieces').findOne({'_id' : ObjectId(idPiece)});
        reponse.status(200).json(infosPiece);
    }, reponse).catch(
        () => reponse.status(500).send(`Erreur : la pièce d'identifiant ${idPiece} n'existe pas dans la base de données`)
    );
});

//3. POST /api/pieces/ajouter : envoie les informations d’une nouvelle pièce à ajouter en JSON
app.post('/api/pieces/ajouter', async(requete, reponse) => {
    const {titre, artiste, categorie} = requete.body;

    if(titre !== undefined && artiste !== undefined && categorie !== undefined)
    {
        utiliserDB(async(db) => {
            await db.collection('pieces').insertOne({
                titre: titre,
                artiste: artiste,
                categorie: categorie
            });
            reponse.status(200).send("pièce ajoutée!");

        },  reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été ajoutée")
        );
    }
    else
    {
        reponse.status(500).send(`Certains paramètres sont indéfinis :
            titre: ${titre},
            artiste: ${artiste},
            categorie: ${categorie}`
        );
    }
});

//4. PUT /api/pieces/:id/modifier : envoie les informations pour modifier une pièce existante
app.put('/api/pieces/:id/modifier', async(requete, reponse) =>{
    const idPiece = requete.params.id;
    const {titre, artiste, categorie} = requete.body;

    if(titre !== undefined && artiste !== undefined && categorie !== undefined)
    {
        utiliserDB(async (db) => {
            await db.collection('pieces').updateOne(
                {
					'_id' : ObjectId(idPiece)
				},
                {
                    '$set' : {
						titre: titre, 
						artiste: artiste,
                        categorie: categorie
					}
                }
            );
            reponse.status(200).send(`Pièce d'identifiant ${idPiece} modifiée`);
        },  reponse).catch( 
            () => reponse.status(500).send("Erreur: La pièce n'a pas été modifiée") );
    }
    else
    {
        reponse.status(500).send(`Certains paramètres ne sont pas définis : 
            - titre: ${titre},
            - artiste: ${artiste},
            - categorie: ${categorie}`
        );
    }
});

//5.DELETE /api/pieces/:id/supprimer : supprime une pièce du répertoire
app.delete('/api/pieces/:id/supprimer', async(requete, reponse) => {
    const idPiece = requete.params.id;

    utiliserDB(async(db) => {
        const resultat = await db.collection('pieces').deleteOne({'_id' : ObjectId(idPiece)});

        if(resultat.deletedCount === 1)
        {
            reponse.status(200).send(`${resultat.deletedCount} pièce supprimée.`);
        } 
        else
        {
            reponse.status(500).send("La pièce n'a pas été supprimée." );
        }
    }, reponse).catch(
        () => reponse.status(500).send("Erreur : La pièce n'a pas été supprimée")
    );
});

app.listen(8000, () => console.log("Connexion réussie: Écoute le port 8000"));











