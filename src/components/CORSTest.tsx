import React, { useState } from 'react';

// Componente de prueba para demostrar CORS
const CORSTest: React.FC = () => {
  const [tmdbResult, setTmdbResult] = useState<string>('');
  const [comicVineResult, setComicVineResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testTMDB = async () => {
    setLoading(true);
    try {
      // Usando un endpoint público de TMDB para la demostración
      // Este endpoint funciona sin API key para mostrar la diferencia de CORS
      const response = await fetch('https://api.themoviedb.org/3/configuration', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTmdbResult(`✅ TMDB: Petición exitosa! CORS permitido. Base URL: ${data.images?.base_url || 'obtenida'}`);
      } else {
        setTmdbResult(`⚠️ TMDB: Error ${response.status} (pero la petición llegó, no hay bloqueo CORS)`);
      }
    } catch (error) {
      setTmdbResult(`❌ TMDB: ${error}`);
    }
  };

  const testComicVine = async () => {
    try {
      // ComicVine será bloqueada por CORS
      const response = await fetch('https://comicvine.gamespot.com/api/volumes/?api_key=demo_key&format=json&limit=1');
      if (response.ok) {
        setComicVineResult('✅ ComicVine: Petición exitosa!');
      } else {
        setComicVineResult(`❌ ComicVine: Error ${response.status}`);
      }
    } catch (error) {
      setComicVineResult(`❌ ComicVine: ${error} (CORS bloqueado)`);
    }
    setLoading(false);
  };

  const runTests = async () => {
    await testTMDB();
    await testComicVine();
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'rgba(0,0,0,0.1)', 
      margin: '20px', 
      borderRadius: '8px',
      fontFamily: 'monospace' 
    }}>
      <h3>🧪 Prueba de CORS: TMDB vs ComicVine</h3>
      
      <button 
        onClick={runTests} 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Probando...' : 'Probar APIs'}
      </button>

      <div style={{ marginTop: '20px' }}>
        <h4>Resultados:</h4>
        <div style={{ 
          backgroundColor: 'rgba(0,0,0,0.1)', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '10px' 
        }}>
          <strong>TMDB:</strong> {tmdbResult || 'No probado aún'}
        </div>
        <div style={{ 
          backgroundColor: 'rgba(0,0,0,0.1)', 
          padding: '10px', 
          borderRadius: '4px' 
        }}>
          <strong>ComicVine:</strong> {comicVineResult || 'No probado aún'}
        </div>
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <h4>📝 Explicación:</h4>
        <ul>
          <li><strong>TMDB</strong> configura headers CORS que permiten peticiones desde navegadores</li>
          <li><strong>ComicVine</strong> NO permite CORS, solo peticiones desde servidores</li>
          <li>Abre DevTools (F12) → Console para ver los detalles técnicos</li>
          <li>
            <strong>Para usar TMDB con datos reales:</strong> 
            <a href="https://www.themoviedb.org/" target="_blank" style={{marginLeft: '10px', color: '#007acc'}}>
              Obtén tu API Key gratis aquí
            </a>
          </li>
        </ul>
        
        <div style={{ 
          backgroundColor: 'rgba(0, 123, 204, 0.1)', 
          padding: '15px', 
          borderRadius: '8px',
          marginTop: '15px',
          border: '1px solid rgba(0, 123, 204, 0.3)'
        }}>
          <h5 style={{margin: '0 0 10px 0', color: '#007bcc'}}>🔑 Cómo obtener API Key de TMDB:</h5>
          <ol style={{margin: '0', paddingLeft: '20px', fontSize: '13px'}}>
            <li>Regístrate en <a href="https://www.themoviedb.org/" target="_blank">themoviedb.org</a></li>
            <li>Ve a Settings → API</li>
            <li>Solicita una Developer API Key</li>
            <li>¡Es gratis e inmediato!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CORSTest;
