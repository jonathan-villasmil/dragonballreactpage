import React, { useEffect, useState } from 'react'
import { Character } from './components/Character';

interface DataCharacter {
  items: {
    name: string;
    id: number;
    image: string;
    ki: number;
    maxKi: number;
    race: string;
    gender: string;
    description: string;
    affiliation: string;
  }[];
  links: string;
  meta: string;
}

export const App: React.FC = () => {
  const [name, setName] = useState<string>("henry");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [allCharacters, setAllCharacters] = useState<DataCharacter>();

  useEffect(() => {
    const getCharacters = async () => {
      const data = await fetch("https://dragonball-api.com/api/characters?limit=58");
      const result = await data.json();
      console.log(result);
      setAllCharacters(result);
    };
    getCharacters();
  }, []);

  return <div>{
    allCharacters?.items.map((character) => {
      return <Character key={character.id} character={character.name} />;
    })
  }</div>

}
