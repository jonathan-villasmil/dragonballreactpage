import React, { useEffect, useState, useMemo } from 'react'
import { Character } from './components/Character';
import './App.css';

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

interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface DataCharacter {
  items: CharacterData[];
  links: object;
  meta: Meta;
}

const LIMIT = 12;

export const App: React.FC = () => {
  const [allCharacters, setAllCharacters] = useState<DataCharacter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [raceFilter, setRaceFilter] = useState<string>('');
  const [affiliationFilter, setAffiliationFilter] = useState<string>('');

  // Fetch whenever page changes
  useEffect(() => {
    const getCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetch(
          `https://dragonball-api.com/api/characters?page=${page}&limit=${LIMIT}`
        );
        if (!data.ok) {
          throw new Error(`Error ${data.status}: No se pudieron cargar los personajes.`);
        }
        const result = await data.json();
        setAllCharacters(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido.");
      } finally {
        setLoading(false);
      }
    };
    getCharacters();
  }, [page]);

  // Reset filters and go to page 1 when a filter changes
  const handleSearch = (val: string) => { setSearch(val); };
  const handleRace = (val: string) => { setRaceFilter(val); };
  const handleAffiliation = (val: string) => { setAffiliationFilter(val); };

  // Unique options from current page data
  const races = useMemo(() => {
    if (!allCharacters) return [];
    return [...new Set(allCharacters.items.map(c => c.race))].sort();
  }, [allCharacters]);

  const affiliations = useMemo(() => {
    if (!allCharacters) return [];
    return [...new Set(allCharacters.items.map(c => c.affiliation))].sort();
  }, [allCharacters]);

  // Client-side filter on current page
  const filtered = useMemo(() => {
    if (!allCharacters) return [];
    return allCharacters.items.filter(c => {
      const matchName = c.name.toLowerCase().includes(search.toLowerCase());
      const matchRace = raceFilter ? c.race === raceFilter : true;
      const matchAffil = affiliationFilter ? c.affiliation === affiliationFilter : true;
      return matchName && matchRace && matchAffil;
    });
  }, [allCharacters, search, raceFilter, affiliationFilter]);

  const hasFilters = search || raceFilter || affiliationFilter;

  const clearFilters = () => {
    setSearch('');
    setRaceFilter('');
    setAffiliationFilter('');
  };

  const totalPages = allCharacters?.meta.totalPages ?? 1;

  // Generate page numbers to show (sliding window of 5)
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [page, totalPages]);

  if (loading) {
    return (
      <div className="status-screen">
        <span className="status-icon">⚡</span>
        <p className="status-text">Cargando personajes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-screen error">
        <span className="status-icon">💥</span>
        <p className="status-text">{error}</p>
      </div>
    );
  }

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">🐉 Dragon Ball</h1>
        <p className="app-subtitle">Characters Encyclopedia</p>
        <div className="app-divider" />
      </header>

      {/* Search & Filters */}
      <div className="filters-bar">
        <div className="filter-search-wrapper">
          <span className="filter-search-icon">🔍</span>
          <input
            type="text"
            className="filter-input"
            placeholder="Buscar en esta página..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <select className="filter-select" value={raceFilter} onChange={(e) => handleRace(e.target.value)}>
          <option value="">Todas las razas</option>
          {races.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <select className="filter-select" value={affiliationFilter} onChange={(e) => handleAffiliation(e.target.value)}>
          <option value="">Todas las afiliaciones</option>
          {affiliations.map(a => <option key={a} value={a}>{a}</option>)}
        </select>

        {hasFilters && (
          <button className="filter-clear" onClick={clearFilters}>✕ Limpiar</button>
        )}
      </div>

      {/* Results count */}
      <p className="results-count">
        {filtered.length} personaje{filtered.length !== 1 ? 's' : ''} en esta página
        {allCharacters && (
          <span className="results-total"> · {allCharacters.meta.totalItems} en total</span>
        )}
      </p>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div className="status-screen no-results">
          <span className="status-icon" style={{ animation: 'none' }}>🔎</span>
          <p className="status-text">Sin resultados</p>
          <p className="no-results-hint">Prueba con otro nombre o filtro</p>
        </div>
      ) : (
        <main className="characters-grid">
          {filtered.map((character) => (
            <Character key={character.id} character={character} />
          ))}
        </main>
      )}

      {/* Pagination */}
      <nav className="pagination">
        <button
          className="page-btn page-btn--arrow"
          onClick={() => setPage(1)}
          disabled={page === 1}
          title="Primera página"
        >«</button>

        <button
          className="page-btn page-btn--arrow"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          title="Anterior"
        >‹</button>

        {pageNumbers.map(n => (
          <button
            key={n}
            className={`page-btn ${n === page ? 'page-btn--active' : ''}`}
            onClick={() => setPage(n)}
          >
            {n}
          </button>
        ))}

        <button
          className="page-btn page-btn--arrow"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          title="Siguiente"
        >›</button>

        <button
          className="page-btn page-btn--arrow"
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          title="Última página"
        >»</button>
      </nav>
    </>
  );
}
