import React from "react";
import { Link } from "react-router-dom";

interface CharacterData {
    id: number;
    name: string;
    image: string;
    ki: number;
    maxKi: number;
    race: string;
    gender: string;
    description: string;
    affiliation: string;
}

interface CharacterProps {
    character: CharacterData;
}

export const Character: React.FC<CharacterProps> = ({ character }) => {
    return (
        <Link to={`/character/${character.id}`} className="character-card">
            <div className="character-image-wrapper">
                <img
                    src={character.image}
                    alt={character.name}
                    className="character-image"
                />
            </div>

            <div className="character-info">
                <h2 className="character-name">{character.name}</h2>

                <div className="character-tags">
                    <span className="tag race">{character.race}</span>
                    <span className="tag affiliation">{character.affiliation}</span>
                </div>

                <div className="character-separator" />

                <div className="character-ki">
                    <div className="ki-item">
                        <span className="ki-label">⚡ Ki</span>
                        <span className="ki-value">{character.ki}</span>
                    </div>
                    <div className="ki-item">
                        <span className="ki-label">🔝 Max</span>
                        <span className="ki-value">{character.maxKi}</span>
                    </div>
                </div>

                <p className="character-description">{character.description}</p>
            </div>
        </Link>
    );
}