# ComicVine API - Imágenes y CORS

## ¿Por qué no vemos las imágenes reales de ComicVine?

### La API SÍ proporciona imágenes

La API de ComicVine **SÍ incluye imágenes reales** en sus respuestas. Cada cómic y personaje viene con un objeto `image` completo:

```json
{
  "id": 796,
  "name": "Batman",
  "image": {
    "icon_url": "https://comicvine.gamespot.com/a/uploads/square_avatar/6/67663/5206439-796.jpg",
    "medium_url": "https://comicvine.gamespot.com/a/uploads/scale_medium/6/67663/5206439-796.jpg",
    "screen_url": "https://comicvine.gamespot.com/a/uploads/screen_medium/6/67663/5206439-796.jpg",
    "screen_large_url": "https://comicvine.gamespot.com/a/uploads/screen_kubrick/6/67663/5206439-796.jpg",
    "small_url": "https://comicvine.gamespot.com/a/uploads/scale_small/6/67663/5206439-796.jpg",
    "super_url": "https://comicvine.gamespot.com/a/uploads/scale_large/6/67663/5206439-796.jpg",
    "thumb_url": "https://comicvine.gamespot.com/a/uploads/square_mini/6/67663/5206439-796.jpg",
    "tiny_url": "https://comicvine.gamespot.com/a/uploads/square_mini/6/67663/5206439-796.jpg",
    "original_url": "https://comicvine.gamespot.com/a/uploads/original/6/67663/5206439-796.jpg"
  }
}
```

### El problema: CORS (Cross-Origin Resource Sharing)

**CORS** es una política de seguridad del navegador que impide que una página web haga peticiones a un dominio diferente al suyo, a menos que el servidor de destino lo permita explícitamente.

- **Nuestro frontend**: `http://localhost:5173` (Vite dev server)
- **API de ComicVine**: `https://comicvine.gamespot.com/api/`

ComicVine **no permite** peticiones directas desde navegadores web por razones de seguridad y para controlar el uso de su API.

### ¿Cómo funciona nuestro código?

En `src/api/comicvine.ts`, implementamos una estrategia de **fallback**:

1. **Intentamos** la llamada real a ComicVine
2. Si **CORS bloquea** la petición, usamos datos de ejemplo
3. Para imágenes de personajes, usamos **Superhero API** como alternativa

```typescript
try {
  // Intentar API real
  const response = await fetch(comicVineUrl);
  if (response.ok) {
    const data = await response.json();
    return data; // ¡Imágenes reales de ComicVine!
  }
} catch (corsError) {
  // CORS bloqueó, usar datos de ejemplo
  return sampleData;
}
```

## Soluciones para usar la API real

### 1. Backend Proxy (Recomendado)
Crear un servidor backend que haga las peticiones a ComicVine:

```javascript
// server.js (Node.js + Express)
app.get('/api/comics', async (req, res) => {
  const response = await fetch(`https://comicvine.gamespot.com/api/volumes/?api_key=${API_KEY}`);
  const data = await response.json();
  res.json(data); // Incluye imágenes reales
});
```

### 2. Proxy CORS público (Solo desarrollo)
```javascript
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://comicvine.gamespot.com/api/volumes/';
fetch(proxyUrl + apiUrl + '?api_key=' + API_KEY)
```

### 3. Extensión del navegador (Solo desarrollo)
- Instalar "CORS Unblock" o similar
- ⚠️ Solo para desarrollo, nunca en producción

### 4. Configurar servidor local con proxy
```javascript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://comicvine.gamespot.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('User-Agent', 'MyComicApp/1.0');
          });
        }
      }
    }
  }
});
```

## ¿Qué imágenes estamos usando ahora?

### Cómics
- **Placeholder**: Imágenes genéricas de Unsplash
- **Motivo**: Necesitaríamos un proxy para obtener las imágenes reales

### Personajes
- **Superhero API**: CDN público con imágenes reales de superhéroes
- **URLs**: `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-batman.jpg`

## Verificar en el navegador

1. Abre las **DevTools** (F12)
2. Ve a la pestaña **Console**
3. Verás mensajes como:
   ```
   Intentando llamada real a ComicVine API...
   ❌ CORS bloqueó la API real: TypeError: Failed to fetch
   📋 Usando datos de ejemplo debido a CORS...
   ```

## Resumen

- ✅ **ComicVine SÍ tiene imágenes** reales de alta calidad
- ❌ **CORS bloquea** las peticiones directas desde el navegador  
- 🔄 **Nuestro código intenta** la API real primero, luego usa fallback
- 🖼️ **Para personajes** usamos imágenes reales de Superhero API
- 🚀 **Solución definitiva**: Implementar un backend proxy

¡El código está preparado para usar las imágenes reales tan pronto como tengamos un backend o proxy configurado!
