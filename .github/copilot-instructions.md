<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# ComicVine React App - Copilot Instructions

Este es un proyecto de React con TypeScript que utiliza la API de ComicVine para mostrar información sobre cómics.

## Tecnologías principales:
- React 18 con TypeScript
- Vite como build tool
- API de ComicVine para datos de cómics
- CSS moderno con gradientes y animaciones

## Estructura del proyecto:
- `src/api/comicvine.ts` - Funciones para interactuar con la API de ComicVine
- `src/pages/Home.tsx` - Componente principal que muestra la lista de cómics
- `src/App.tsx` - Componente raíz de la aplicación
- `src/App.css` - Estilos principales con diseño moderno

## Patrones de código:
- Usar tipos TypeScript para todas las interfaces de datos
- Importar tipos con `import type { }` cuando sea necesario
- Manejar errores de API de forma graceful
- Usar hooks de React (useState, useEffect) para el manejo de estado
- Implementar loading states y error handling

## API de ComicVine:
- Requiere API key para funcionar
- Endpoints principales: volumes (cómics), issues, search
- Manejar respuestas con paginación y límites
- Filtrar contenido HTML de las descripciones

## Estilos:
- Diseño responsivo mobile-first
- Gradientes y sombras para efectos modernos
- Animaciones suaves en hover y transiciones
- Grid layout para la galería de cómics
- Paleta de colores: púrpura (#667eea) y rosa (#764ba2)

Al trabajar en este proyecto, mantén consistencia con estos patrones y tecnologías.
