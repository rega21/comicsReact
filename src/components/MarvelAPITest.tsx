import React, { useState } from 'react';
import { testMarvelConnection, searchMarvelComics } from '../api/marvel';

const MarvelAPITest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const runConnectionTest = async () => {
    setIsLoading(true);
    setTestResult('Probando conexión a Marvel API...');
    
    try {
      const result = await testMarvelConnection();
      if (result.success) {
        setTestResult(`✅ Conexión exitosa! Total de cómics disponibles: ${result.total}`);
        
        // Probar búsqueda de cómics
        try {
          const comics = await searchMarvelComics('spider-man', 5);
          setTestResult(prev => prev + `\n✅ Búsqueda exitosa! Encontrados ${comics.length} cómics de Spider-Man`);
        } catch (searchError) {
          setTestResult(prev => prev + `\n❌ Error en búsqueda: ${searchError}`);
        }
      } else {
        setTestResult(`❌ Error de conexión: ${result.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: '2px solid #667eea',
      borderRadius: '10px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      <h3>Marvel API - Diagnóstico de Conexión</h3>
      <button 
        onClick={runConnectionTest}
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          marginBottom: '15px'
        }}
      >
        {isLoading ? 'Probando...' : 'Probar Conexión Marvel API'}
      </button>
      
      {testResult && (
        <pre style={{ 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          color: 'white', 
          padding: '15px', 
          borderRadius: '5px',
          whiteSpace: 'pre-wrap',
          fontSize: '14px'
        }}>
          {testResult}
        </pre>
      )}
      
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#ccc' }}>
        <strong>✅ Configuración recomendada para Marvel Developer:</strong>
        <ul>
          <li><strong>Authorized Referrer:</strong> *.localhost</li>
          <li><strong>URL actual:</strong> {window.location.origin}</li>
        </ul>
        <p style={{ marginTop: '10px' }}>
          Ve a <a href="https://developer.marvel.com/account" target="_blank" style={{color: '#667eea'}}>Marvel Developer Account</a> para configurar los referrers.
        </p>
      </div>
    </div>
  );
};

export default MarvelAPITest;
