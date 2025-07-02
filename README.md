# 🦸‍♂️ ComicVine Explorer

Una aplicación web moderna construida con React y TypeScript que permite explorar y buscar cómics utilizando la API de ComicVine.

## ✨ Características

- 🔍 **Búsqueda de cómics** - Busca tus cómics favoritos por nombre
- 📚 **Cómics populares** - Explora los cómics más populares y recientes
- 🎨 **Diseño moderno** - Interfaz responsiva con gradientes y animaciones
- ⚡ **Rápido y eficiente** - Construido con Vite para un desarrollo ágil
- 📱 **Responsivo** - Optimizado para dispositivos móviles y desktop

## 🚀 Tecnologías

- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Build tool ultrarrápido
- **ComicVine API** - Fuente de datos de cómics
- **CSS moderno** - Gradientes, animaciones y grid layout

## 📁 Estructura del proyecto

```
comics/
├── src/
│   ├── api/
│   │   └── comicvine.ts      # API calls y tipos
│   ├── pages/
│   │   └── Home.tsx          # Página principal
│   ├── App.tsx               # Componente raíz
│   ├── App.css               # Estilos principales
│   └── main.tsx              # Punto de entrada
├── package.json
└── README.md
```

## 🛠️ Instalación y configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar API Key
1. Obtén tu API key gratuita de [ComicVine](https://comicvine.gamespot.com/api/)
2. Abre `src/api/comicvine.ts`
3. Reemplaza `'your-api-key-here'` con tu API key real:

```typescript
const API_KEY = 'tu-api-key-aqui';
```

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🔧 Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta el linter de código

## 🎮 Cómo usar

1. **Explorar cómics populares**: Al cargar la página, verás una lista de cómics populares
2. **Buscar cómics**: Usa la barra de búsqueda para encontrar cómics específicos
3. **Ver detalles**: Haz clic en "Ver más en ComicVine" para obtener información completa
4. **Volver a populares**: Usa el botón "← Volver a populares" para resetear la búsqueda

## 🌟 Características técnicas

### API de ComicVine
- Búsqueda de cómics por nombre
- Obtención de cómics populares
- Información detallada incluyendo:
  - Título y descripción
  - Año de inicio
  - Editorial
  - Número de issues
  - Imágenes de portada

### Diseño responsivo
- Grid adaptativo para diferentes tamaños de pantalla
- Optimizado para móviles y tablets
- Animaciones suaves y transiciones

### Manejo de errores
- Validación de API key
- Mensajes de error informativos
- Estados de carga

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Créditos

- Datos de cómics proporcionados por [ComicVine API](https://comicvine.gamespot.com/)
- Iconos de emojis para una interfaz amigable
- Inspiración de diseño de aplicaciones modernas de entretenimiento

---

¡Disfruta explorando el mundo de los cómics! 🚀
