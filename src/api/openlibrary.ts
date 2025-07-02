// Open Library API - FUNCIONA SIN CORS y SIN API KEY
const OPENLIBRARY_BASE_URL = 'https://openlibrary.org';
const OPENLIBRARY_COVERS_URL = 'https://covers.openlibrary.org/b/id';

export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  publisher?: string[];
  isbn?: string[];
  subject?: string[];
  language?: string[];
}

export interface OpenLibraryResponse {
  numFound: number;
  start: number;
  docs: OpenLibraryBook[];
}

export interface ComicBook {
  id: string;
  title: string;
  author: string;
  year: number;
  publisher: string;
  cover_url: string;
  isbn?: string;
  subjects: string[];
}

// Función para buscar cómics y novelas gráficas
export const searchComicBooks = async (query: string = 'comic'): Promise<ComicBook[]> => {
  try {
    const searchTerms = `${query} comic OR graphic novel OR superhero OR batman OR superman OR spider-man OR marvel OR dc`;
    const url = `${OPENLIBRARY_BASE_URL}/search.json?q=${encodeURIComponent(searchTerms)}&limit=20&fields=key,title,author_name,cover_i,first_publish_year,publisher,isbn,subject`;
    
    console.log('📚 Buscando libros de cómics en Open Library...');
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data: OpenLibraryResponse = await response.json();
    console.log('✅ Open Library funcionó perfectamente!', data);
    
    // Filtrar y mapear solo libros relacionados con cómics
    const comicBooks = data.docs
      .filter(book => {
        const title = book.title?.toLowerCase() || '';
        const subjects = book.subject?.join(' ').toLowerCase() || '';
        const isComic = title.includes('comic') || 
                       title.includes('graphic') || 
                       subjects.includes('comic') || 
                       subjects.includes('graphic novel') ||
                       subjects.includes('superhero') ||
                       ['batman', 'superman', 'spider-man', 'marvel', 'dc', 'x-men', 'avengers'].some(hero => 
                         title.includes(hero) || subjects.includes(hero)
                       );
        return isComic && book.cover_i; // Solo libros con portada
      })
      .map(book => ({
        id: book.key,
        title: book.title,
        author: book.author_name?.[0] || 'Autor desconocido',
        year: book.first_publish_year || 0,
        publisher: book.publisher?.[0] || 'Editorial desconocida',
        cover_url: book.cover_i 
          ? `${OPENLIBRARY_COVERS_URL}/${book.cover_i}-L.jpg`
          : '',
        isbn: book.isbn?.[0],
        subjects: book.subject?.slice(0, 5) || []
      }))
      .slice(0, 12); // Máximo 12 libros
    
    return comicBooks;
  } catch (error) {
    console.error('❌ Error buscando en Open Library:', error);
    throw error;
  }
};

// Función para obtener cómics populares
export const getPopularComicBooks = async (): Promise<ComicBook[]> => {
  try {
    console.log('📚 Obteniendo cómics populares de Open Library...');
    
    // Buscar por términos populares de superhéroes
    const popularTerms = ['batman comic', 'superman comic', 'spider-man comic', 'marvel comic', 'dc comic', 'graphic novel superhero'];
    const randomTerm = popularTerms[Math.floor(Math.random() * popularTerms.length)];
    
    return await searchComicBooks(randomTerm);
  } catch (error) {
    console.error('❌ Error obteniendo cómics populares:', error);
    throw error;
  }
};

// Función helper para construir URLs de portadas
export const getOpenLibraryCoverUrl = (coverId: number, size: 'S' | 'M' | 'L' = 'L'): string => {
  return `${OPENLIBRARY_COVERS_URL}/${coverId}-${size}.jpg`;
};

/* 
VENTAJAS DE OPEN LIBRARY:

✅ Sin API Key necesaria
✅ CORS completamente habilitado
✅ Imágenes reales de portadas de libros
✅ Metadata rica (autor, editorial, año, ISBN)
✅ Contenido relacionado con cómics
✅ Sin límites restrictivos
✅ Base de datos masiva

EJEMPLO DE RESPUESTA:
{
  "title": "Batman: The Dark Knight Returns",
  "author_name": ["Frank Miller"],
  "first_publish_year": 1986,
  "publisher": ["DC Comics"],
  "cover_i": 8739161,
  "subject": ["Comics & graphic novels", "Superheroes", "Batman (Fictitious character)"]
}

URL de portada resultante:
https://covers.openlibrary.org/b/id/8739161-L.jpg
*/
