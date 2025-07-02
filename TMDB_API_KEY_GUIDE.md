# 🔑 Cómo Obtener tu API Key de TMDB (GRATIS)

## Paso a Paso

### 1. **Registrarse en TMDB**
- Ve a: https://www.themoviedb.org/
- Haz clic en **"Join TMDB"** (esquina superior derecha)
- Llena el formulario de registro:
  - Username
  - Password
  - Email
  - Confirma tu email

### 2. **Acceder a la Configuración**
- Inicia sesión en tu cuenta
- Haz clic en tu avatar (esquina superior derecha)
- Selecciona **"Settings"**

### 3. **Solicitar API Key**
- En el menú lateral, haz clic en **"API"**
- Haz clic en **"Create"** o **"Request an API Key"**
- Selecciona **"Developer"** (no Commercial)

### 4. **Llenar el Formulario**
```
Application Name: Mi App de Cómics
Application URL: http://localhost:5173
Application Summary: Aplicación de prueba para aprender desarrollo web
```

### 5. **¡Listo!**
- Recibirás tu API key **inmediatamente**
- Se ve algo así: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

## Configurar en tu Proyecto

### 1. **Crear archivo .env**
```bash
# En la raíz del proyecto
VITE_TMDB_API_KEY=tu_api_key_aqui
```

### 2. **Actualizar tmdb-example.ts**
```typescript
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'tu_api_key_aqui';
```

### 3. **Reiniciar el servidor**
```bash
npm run dev
```

## Límites de TMDB (MUY GENEROSOS)

- ✅ **40 requests por 10 segundos**
- ✅ **1000 requests por día**
- ✅ **Completamente gratis**
- ✅ **Imágenes ilimitadas**
- ✅ **Sin caducidad**

## Endpoints Populares

### Sin API Key (Solo configuración)
```javascript
// ✅ Funciona sin key
fetch('https://api.themoviedb.org/3/configuration')
```

### Con API Key (Datos completos)
```javascript
// Películas populares
fetch('https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY')

// Buscar películas
fetch('https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=batman')

// Detalles de película
fetch('https://api.themoviedb.org/3/movie/550?api_key=YOUR_KEY')
```

## Ejemplo de Uso Real

```typescript
// Con tu API key real
const getPopularMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES`
  );
  const data = await response.json();
  
  return data.results.map(movie => ({
    id: movie.id,
    title: movie.title,
    image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    description: movie.overview,
    rating: movie.vote_average,
    year: new Date(movie.release_date).getFullYear()
  }));
};
```

## Comparación con ComicVine

| Aspecto | TMDB | ComicVine |
|---------|------|-----------|
| **Registro** | ✅ Gratuito, inmediato | ✅ Gratuito |
| **CORS** | ✅ Permitido | ❌ Bloqueado |
| **Imágenes** | ✅ CDN público | ✅ Pero bloqueadas por CORS |
| **Límites** | 1000/día | 1000/hora |
| **Uso en Frontend** | ✅ Directo | ❌ Requiere proxy |

## ¿Por qué TMDB es tan Abierto?

1. **Estrategia de crecimiento**: Más desarrolladores = Más datos
2. **Modelo colaborativo**: Los usuarios enriquecen la base de datos
3. **Sin competencia directa**: No tienen un sitio web principal que proteger
4. **Patrocinadores**: Se financian con partnerships, no con tráfico web

## Próximos Pasos

1. **Obtén tu API key** (5 minutos)
2. **Prueba los endpoints** en tu app
3. **Compara con ComicVine** (verás la diferencia CORS)
4. **Decide si integrar TMDB** para películas de superhéroes

¡TMDB es perfecto para demostrar cómo **deberían** funcionar las APIs modernas!
