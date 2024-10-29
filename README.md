# projet-SI
## Générer les containers

<ul>
    <li>`docker-compose build`</li>
    <li>`docker-compose up -d`</li>
</ul>

## connecter la base de donnée à pgAdmin4

<ul>
    <li>Créer un nouveau <span style="color:#0ea5e9">Server Group</span></li>
    <li>Register server sur le groupe enregistré précédement
        <ul>
            <li>Dans général lui donner le nom <span style="color:#0ea5e9">symfony</li>
            <li>Dans connection:
                <ul>
                    <li>Host name/adress : localhost</li>
                    <li>port : 5433</li>
                    <li>Maintenance database : symfony</li>
                    <li>Username : symfony</li>
                    <li>Password : symfony</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

## Lien vers le backend Symfony
http://localhost:8080/
## Lien vers React
http://localhost:5173/


## Informations supplémentaires
Une fois les containers lancé les liens sont directement accessibles

React :
<ul>
    <li>Vite</li>
    <li>TSX</li>
    <li>Yarn</li>
    <li>version: 18.3.1</li>
</ul>

Symfony :
<ul>
    <li>version: 6.4</li>
    <li>maker bundle ajouté de base</li>
</ul>

## Pour ajouter des dépendances
Il faut demander à tout le monde pour pouvoir modifier le docker pour les ajouter