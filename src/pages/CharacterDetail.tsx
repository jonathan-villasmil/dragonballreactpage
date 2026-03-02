import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CharacterData } from '../types';
import '../App.css';

export const CharacterDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [character, setCharacter] = useState<CharacterData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const res = await fetch(`https://dragonball-api.com/api/characters/${id}`);
                if (!res.ok) throw new Error(`Error ${res.status}: personaje no encontrado.`);
                const data = await res.json();
                setCharacter(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido.');
            } finally {
                setLoading(false);
            }
        };
        fetchCharacter();
    }, [id]);

    if (loading) {
        return (
            <div className="status-screen">
                <span className="status-icon">⚡</span>
                <p className="status-text">Cargando...</p>
            </div>
        );
    }

    if (error || !character) {
        return (
            <div className="status-screen error">
                <span className="status-icon">💥</span>
                <p className="status-text">{error}</p>
                <button className="detail-back-btn" onClick={() => navigate('/')}>← Volver</button>
            </div>
        );
    }

    return (
        <div className="detail-page">
            {/* Back button */}
            <button className="detail-back-btn" onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <div className="detail-hero">
                {/* Left: Image */}
                <div className="detail-image-wrapper">
                    <img src={character.image} alt={character.name} className="detail-image" />
                </div>

                {/* Right: Info */}
                <div className="detail-info">
                    <h1 className="detail-name">{character.name}</h1>

                    <div className="detail-tags">
                        <span className="tag race">{character.race}</span>
                        <span className="tag affiliation">{character.affiliation}</span>
                        <span className="tag gender">{character.gender}</span>
                    </div>

                    <div className="detail-stats">
                        <div className="detail-stat">
                            <span className="stat-label">⚡ Ki</span>
                            <span className="stat-value">{character.ki}</span>
                        </div>
                        <div className="detail-stat">
                            <span className="stat-label">🔝 Max Ki</span>
                            <span className="stat-value">{character.maxKi}</span>
                        </div>
                    </div>

                    <div className="detail-separator" />

                    <p className="detail-description">{character.description}</p>

                    {/* Origin Planet */}
                    {character.originPlanet && (
                        <div className="detail-planet">
                            <h3 className="detail-section-title">🌍 Planeta de Origen</h3>
                            <div className="planet-card">
                                {character.originPlanet.image && (
                                    <img
                                        src={character.originPlanet.image}
                                        alt={character.originPlanet.name}
                                        className="planet-image"
                                    />
                                )}
                                <div>
                                    <p className="planet-name">{character.originPlanet.name}</p>
                                    <p className="planet-desc">{character.originPlanet.description}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Transformations */}
            {character.transformations && character.transformations.length > 0 && (
                <section className="detail-transformations">
                    <h2 className="detail-section-title">✨ Transformaciones</h2>
                    <div className="transformations-grid">
                        {character.transformations.map(t => (
                            <div key={t.id} className="transformation-card">
                                <img src={t.image} alt={t.name} className="transformation-image" />
                                <p className="transformation-name">{t.name}</p>
                                <p className="transformation-ki">⚡ {t.ki}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
