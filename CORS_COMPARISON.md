# APIs Populares y sus Políticas CORS

## 🟢 APIs que PERMITEN CORS (Funcionan desde el navegador)

### 🎬 **TMDB (The Movie Database)**
```javascript
// ✅ Funciona directamente
const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY');
```
- **Headers CORS**: `Access-Control-Allow-Origin: *`
- **Imágenes**: CDN público `https://image.tmdb.org/t/p/w500/poster.jpg`
- **Modelo**: Fomentar uso público, apps de terceros
- **Registro**: Gratuito en https://www.themoviedb.org/settings/api

### 🎵 **Spotify Web API**
```javascript
// ✅ Funciona con OAuth desde el navegador
const response = await fetch('https://api.spotify.com/v1/search?q=artist:metallica&type=track', {
  headers: { 'Authorization': 'Bearer ' + token }
});
```
- **Headers CORS**: Permitidos para apps registradas
- **Imágenes**: URLs directas en las respuestas
- **Modelo**: Plataforma de desarrolladores

### 🏛️ **REST Countries**
```javascript
// ✅ Funciona directamente
const response = await fetch('https://restcountries.com/v3.1/all');
```
- **Headers CORS**: Completamente abierto
- **Imágenes**: URLs de banderas incluidas
- **Modelo**: API pública gratuita

### 🌤️ **OpenWeatherMap**
```javascript
// ✅ Funciona directamente
const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY');
```
- **Headers CORS**: Permitidos
- **Imágenes**: Iconos del clima disponibles

## 🔴 APIs que BLOQUEAN CORS (Requieren backend)

### 📚 **ComicVine (GameSpot)**
```javascript
// ❌ Bloqueado por CORS
const response = await fetch('https://comicvine.gamespot.com/api/volumes/');
// TypeError: Failed to fetch
```
- **Sin headers CORS**
- **Imágenes**: URLs reales pero bloqueadas por CORS
- **Modelo**: Dirigir tráfico a su sitio oficial
- **Solución**: Backend proxy

### 📺 **YouTube Data API**
```javascript
// ❌ Bloqueado por CORS (como mencionaste)
const response = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&key=YOUR_KEY');
// Blocked by CORS policy
```
- **Headers CORS**: Restringidos
- **Modelo**: Usar cliente oficial de Google
- **Solución**: Backend o cliente oficial

### 🐦 **Twitter API v2**
```javascript
// ❌ Bloqueado por CORS
const response = await fetch('https://api.twitter.com/2/tweets/search/recent?query=hello');
// Blocked by CORS policy
```

### 🎮 **Steam Web API**
```javascript
// ❌ Bloqueado por CORS
const response = await fetch('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=YOUR_KEY&steamids=76561197960434622');
// Blocked by CORS policy
```

## 🟡 APIs con CORS Limitado

### 🗺️ **Google Maps API**
- **Algunos endpoints**: Permiten CORS para dominios registrados
- **Otros endpoints**: Requieren backend
- **Modelo**: Control granular por dominio

### 💰 **CoinGecko**
```javascript
// ✅ Funciona para algunos endpoints
const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
```
- **Endpoints públicos**: CORS permitido
- **Endpoints premium**: Requieren backend

## ¿Por qué estas diferencias?

### 🟢 **APIs que permiten CORS**
- **Estrategia de negocio**: Fomentar adopción
- **Modelo freemium**: Usuarios gratuitos → premium
- **Ecosistema abierto**: Apps de terceros generan valor
- **Control por API key**: Rate limiting suficiente

### 🔴 **APIs que bloquean CORS**
- **Control estricto**: Dirigir tráfico a sitios oficiales
- **Modelos publicitarios**: Revenue por pageviews
- **Seguridad**: Evitar abuso desde navegadores
- **Políticas corporativas**: Restricciones de marca

## Ejemplos de Headers CORS

### ✅ **TMDB permite todo**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### ❌ **ComicVine sin headers**
```
(Sin headers CORS configurados)
// El navegador bloquea automáticamente
```

### 🟡 **API con restricciones**
```
Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Methods: GET
Access-Control-Allow-Headers: Authorization
```

## Soluciones para APIs bloqueadas

### 1. **Backend Proxy** (Recomendado)
```javascript
// Tu servidor backend
app.get('/api/comics', async (req, res) => {
  const response = await fetch('https://comicvine.gamespot.com/api/volumes/', {
    headers: { 'User-Agent': 'MyApp/1.0' }
  });
  const data = await response.json();
  res.json(data); // Tu backend puede responder al frontend
});
```

### 2. **Proxy CORS público** (Solo desarrollo)
```javascript
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://comicvine.gamespot.com/api/volumes/';
const response = await fetch(proxyUrl + apiUrl + '?api_key=' + key);
```

### 3. **Serverless Functions**
```javascript
// Vercel, Netlify Functions
export default async function handler(req, res) {
  const response = await fetch('https://comicvine.gamespot.com/api/volumes/');
  const data = await response.json();
  res.json(data);
}
```

## Conclusión

- **TMDB es el ejemplo perfecto** de API amigable para frontend
- **ComicVine sigue el modelo restrictivo** como YouTube
- **La diferencia está en las políticas de negocio**, no en la calidad de la API
- **Ambas APIs tienen imágenes de calidad**, pero ComicVine requiere proxy

¡Tu intuición sobre TMDB vs ComicVine es correcta! TMDB facilita el desarrollo frontend, mientras que ComicVine requiere un enfoque backend-first.
