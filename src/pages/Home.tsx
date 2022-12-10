import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useEffect, useState } from 'react';
import './Home.css';

export interface IPokemonsResult {
  success: boolean;
  message: string;
}


const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);

  const [apiError, setapiError] = useState(false);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/`)
      .then((res) => res.json())
      .then((data) => {
        // Si la llamada a la API funciona correctamente,
        // actualizamos el estado "pokemons" con la "data"
        // que nos devuelve la API
        setPokemons(data.results);
      })
      .catch((error) => {
        // Si ocurre un error en la llamada a la API,
        // lo mostramos en la consola
        console.log(error);
        setapiError(true);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokemons</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!apiError ? (
          <IonList>
            {pokemons.map((pokemon) => {
              const pokemonID = pokemon.url.split('/')[6];
              return (
                <IonItem routerLink={`/pokemons/${pokemonID}`} key={pokemonID}>
                  <IonAvatar>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png`}
                      alt={`Imagen de ${pokemon.name}`}
                    ></img>
                  </IonAvatar>
                  <IonLabel>
                    <h2>{pokemon.name}</h2>
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        ) : (
          <IonText color={'danger'}>
            Error. No se pudieron obtener los pokemons
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
