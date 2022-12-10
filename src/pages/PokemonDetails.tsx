import {
  IonBackButton,
  IonBadge,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonProgressBar,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

interface PokemonDetailsProps
  extends RouteComponentProps<{
    id: string;
  }> { }

export interface IPokemonAbility {
  ability: {
    name: string;
  };
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ match }) => {
  const [pokemon, setPokemon] = useState<{
    name: null;
    height: null;
    weight: null;
    base_experience: number;
    abilities: IPokemonAbility[];
  }>({
    name: null,
    height: null,
    weight: null,
    base_experience: 0,
    abilities: []
  });

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${match.params.id}/`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [match.params.id]);



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="Volver"></IonBackButton>
          </IonButtons>
          <IonTitle className="ion-text-capitalize">{pokemon.name}</IonTitle>

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center ion-text-capitalize">
              {pokemon.name}
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonGrid>
              <IonRow className="ion-justify-content-center">
                <img
                  width={'150px'}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${match.params.id}.png`}
                  alt={`Imagen de ${pokemon.name}`}
                ></img>
              </IonRow>
              <IonLabel></IonLabel>
              <IonList>
                <IonItem>
                  <IonLabel>Altura</IonLabel>
                  <IonNote slot="end">{pokemon.height}″</IonNote>
                </IonItem>

                <IonItem>
                  <IonLabel>Peso</IonLabel>
                  <IonNote slot="end">{pokemon.weight} kg</IonNote>
                </IonItem>
              </IonList>
              <IonList lines="none">
                <IonItem>
                  <IonLabel>Experiencia</IonLabel>
                  <IonBadge slot="end">{pokemon.base_experience}%</IonBadge>
                </IonItem>
                <IonItem>
                  <IonProgressBar
                    color={'primary'}
                    value={pokemon.base_experience / 100}
                  ></IonProgressBar>
                </IonItem>
              </IonList>
              <IonRow className="ion-justify-content-center">
                <IonCardSubtitle className="ion-text-center">
                  Habilidades
                </IonCardSubtitle>
              </IonRow>

              <IonRow className="ion-justify-content-center">
                {pokemon.abilities.map((a, index) => (
                  <IonChip color="primary" key={index}>
                    <IonLabel>{a.ability.name}</IonLabel>
                  </IonChip>
                ))}
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PokemonDetails;
