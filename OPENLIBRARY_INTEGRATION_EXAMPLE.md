// DEMOSTRACIÓN: Cómo agregar Open Library a tu dropdown

/*
En tu Home.tsx, podrías agregar:

1. Import:
import { getPopularComicBooks } from '../api/openlibrary';
import type { ComicBook } from '../api/openlibrary';

2. Estado:
const [books, setBooks] = useState<ComicBook[]>([]);

3. Función de carga:
const loadComicBooks = async () => {
  try {
    setLoading(true);
    const response = await getPopularComicBooks();
    setBooks(response);
  } catch (err) {
    setError('Error al cargar libros');
  } finally {
    setLoading(false);
  }
};

4. En handleWikiItemClick:
} else if (item === 'books') {
  loadComicBooks();
}

5. En el dropdown JSX:
<button onClick={() => handleWikiItemClick('books')}>
  📚 Books
</button>

6. Sección de renderizado:
) : currentView === 'books' ? (
  <section className="books-section">
    {loading ? (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando libros...</p>
      </div>
    ) : books.length > 0 ? (
      <>
        <div className="section-header">
          <h2>
            📚 Novelas Gráficas y Cómics
            <span className="count">({books.length} libros)</span>
          </h2>
        </div>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image">
                <img
                  src={book.cover_url}
                  alt={book.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/300x400/1a1a1a/f5c518?text=Book+Cover';
                  }}
                />
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">por {book.author}</p>
                <p className="book-publisher">{book.publisher}</p>
                {book.year > 0 && (
                  <p className="book-year">{book.year}</p>
                )}
                {book.subjects.length > 0 && (
                  <div className="book-subjects">
                    {book.subjects.slice(0, 3).map((subject, index) => (
                      <span key={index} className="subject-tag">
                        {subject}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    ) : !loading && (
      <div className="no-results">
        <h2>No se encontraron libros</h2>
        <p>Intenta recargar la página</p>
      </div>
    )}
  </section>
*/

// ESTILOS CSS que necesitarías agregar:

const bookStyles = `
/* ===== BOOKS SECTION ===== */
.books-section {
  padding: 40px;
  width: 100%;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.book-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.book-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 30px rgba(245, 197, 24, 0.3);
  border-color: rgba(245, 197, 24, 0.5);
}

.book-image {
  height: 350px;
  overflow: hidden;
}

.book-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.book-card:hover .book-image img {
  transform: scale(1.05);
}

.book-info {
  padding: 20px;
}

.book-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-author {
  color: #f5c518;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 0.95rem;
}

.book-publisher {
  color: #cccccc;
  font-size: 0.9rem;
  margin-bottom: 6px;
}

.book-year {
  color: #999;
  font-size: 0.85rem;
  margin-bottom: 12px;
}

.book-subjects {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.subject-tag {
  background: rgba(245, 197, 24, 0.2);
  color: #f5c518;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  border: 1px solid rgba(245, 197, 24, 0.3);
}

@media (max-width: 768px) {
  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .book-image {
    height: 300px;
  }
}
`;

export { bookStyles };

/*
RESULTADO ESPERADO:

Al hacer clic en Wiki → Books verías:
- ✅ Portadas REALES de novelas gráficas
- ✅ "Batman: The Dark Knight Returns" por Frank Miller
- ✅ "Watchmen" por Alan Moore  
- ✅ "V for Vendetta" por Alan Moore
- ✅ "Superman: Red Son" por Mark Millar
- ✅ Imágenes cargando sin problemas de CORS
- ✅ Metadata real (autor, editorial, año)

¡Es la demostración perfecta de cómo SÍ deberían funcionar las APIs!
*/
