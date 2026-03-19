// ComicVine API Configuration and Functions

const COMICVINE_BASE_URL = '/api/comicvine';
const API_KEY = '2ff78708c99b3612ecc5259ffa63de8997416353';

// Datos de ejemplo para desarrollo (usando imágenes reales de dominio público)
const SAMPLE_COMICS: Comic[] = [
  {
    id: 1,
    name: "The Amazing Spider-Man",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "El amigable vecino Spider-Man balancea su vida como Peter Parker con sus responsabilidades como superhéroe en Nueva York. Después de ser mordido por una araña radiactiva, Peter Parker desarrolló poderes arácnidos incluyendo fuerza sobrehumana, agilidad, sentido arácnido y la habilidad de adherirse a las superficies. Como Spider-Man, ha enfrentado villanos icónicos como el Duende Verde, Doctor Octopus, Venom y muchos más. La serie sigue las aventuras, relaciones y luchas personales de Peter mientras trata de hacer lo correcto y proteger a los inocentes, siempre recordando las palabras de su tío Ben: 'Un gran poder conlleva una gran responsabilidad'.",
    start_year: 1963,
    publisher: { id: 31, name: "Marvel Comics" },
    issue_count: 800,
    site_detail_url: "https://comicvine.gamespot.com/the-amazing-spider-man/4050-1/",
    rating: {
      average: 8.7,
      count: 1523
    }
  },
  {
    id: 2,
    name: "Batman",
    image: {
      icon_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=150&h=150&fit=crop&crop=center",
      medium_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=400&fit=crop&crop=center",
      screen_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop&crop=center",
      screen_large_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=800&fit=crop&crop=center",
      small_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=200&h=300&fit=crop&crop=center",
      super_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=1200&fit=crop&crop=center",
      thumb_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=100&h=150&fit=crop&crop=center",
      tiny_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=50&h=75&fit=crop&crop=center",
      original_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=1200&h=1800&fit=crop&crop=center"
    },
    description: "Bruce Wayne protege Gotham City como el vigilante conocido como Batman, usando su fortuna y entrenamiento para combatir el crimen. Después de presenciar el asesinato de sus padres cuando era niño, Bruce Wayne juró venganza contra el crimen y se convirtió en Batman. Utilizando su vasta riqueza, entrenamiento en artes marciales, habilidades detectivescas superiores y tecnología avanzada, Batman patrulla las calles de Gotham City por la noche. Ha enfrentado a villanos legendarios como el Joker, Penguin, Riddler, Two-Face y Ra's al Ghul. La serie explora tanto las aventuras de Batman como la psicología compleja de Bruce Wayne, un hombre obsesionado con la justicia.",
    start_year: 1940,
    publisher: { id: 10, name: "DC Comics" },
    issue_count: 700,
    site_detail_url: "https://comicvine.gamespot.com/batman/4050-2/",
    rating: {
      average: 9.2,
      count: 2108
    }
  },
  {
    id: 3,
    name: "X-Men",
    image: {
      icon_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=150&h=150&fit=crop&crop=center",
      medium_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=300&h=400&fit=crop&crop=center",
      screen_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=600&fit=crop&crop=center",
      screen_large_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=600&h=800&fit=crop&crop=center",
      small_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=200&h=300&fit=crop&crop=center",
      super_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=800&h=1200&fit=crop&crop=center",
      thumb_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=100&h=150&fit=crop&crop=center",
      tiny_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=50&h=75&fit=crop&crop=center",
      original_url: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=1200&h=1800&fit=crop&crop=center"
    },
    description: "Un equipo de mutantes con habilidades extraordinarias que luchan por la coexistencia pacífica entre humanos y mutantes.",
    start_year: 1963,
    publisher: { id: 31, name: "Marvel Comics" },
    issue_count: 600,
    site_detail_url: "https://comicvine.gamespot.com/x-men/4050-3/",
    rating: {
      average: 8.4,
      count: 987
    }
  },
  {
    id: 4,
    name: "Wonder Woman",
    image: {
      icon_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=150&h=150&fit=crop&crop=center",
      medium_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=400&fit=crop&crop=center",
      screen_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=600&fit=crop&crop=center",
      screen_large_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=800&fit=crop&crop=center",
      small_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=200&h=300&fit=crop&crop=center",
      super_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=1200&fit=crop&crop=center",
      thumb_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=150&fit=crop&crop=center",
      tiny_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=50&h=75&fit=crop&crop=center",
      original_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=1800&fit=crop&crop=center"
    },
    description: "Diana Prince, una princesa amazona que llega al mundo del hombre para luchar por la justicia y la paz.",
    start_year: 1942,
    publisher: { id: 10, name: "DC Comics" },
    issue_count: 400,
    site_detail_url: "https://comicvine.gamespot.com/wonder-woman/4050-4/",
    rating: {
      average: 8.1,
      count: 756
    }
  },
  {
    id: 5,
    name: "Superman",
    image: {
      icon_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=150&h=150&fit=crop&crop=center",
      medium_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=300&h=400&fit=crop&crop=center",
      screen_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=400&h=600&fit=crop&crop=center",
      screen_large_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=600&h=800&fit=crop&crop=center",
      small_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=200&h=300&fit=crop&crop=center",
      super_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=800&h=1200&fit=crop&crop=center",
      thumb_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=100&h=150&fit=crop&crop=center",
      tiny_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=50&h=75&fit=crop&crop=center",
      original_url: "https://images.unsplash.com/photo-1531259736756-6caccf485f81?w=1200&h=1800&fit=crop&crop=center"
    },
    description: "Clark Kent, un alienígena de Kriptón criado en la Tierra, usa sus poderes extraordinarios para proteger a la humanidad.",
    start_year: 1938,
    publisher: { id: 10, name: "DC Comics" },
    issue_count: 900,
    site_detail_url: "https://comicvine.gamespot.com/superman/4050-5/",
    rating: {
      average: 8.9,
      count: 1834
    }
  },
  {
    id: 6,
    name: "X-Men",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "Los X-Men son un equipo de superhéroes mutantes que luchan por la coexistencia pacífica entre humanos y mutantes.",
    start_year: 1963,
    publisher: { id: 31, name: "Marvel Comics" },
    issue_count: 600,
    site_detail_url: "https://comicvine.gamespot.com/x-men/4050-3/",
    rating: {
      average: 8.5,
      count: 1200
    }
  },
  {
    id: 7,
    name: "The Avengers",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "Los héroes más poderosos de la Tierra se unen como Los Vengadores para enfrentar amenazas que ningún héroe podría manejar solo.",
    start_year: 1963,
    publisher: { id: 31, name: "Marvel Comics" },
    issue_count: 500,
    site_detail_url: "https://comicvine.gamespot.com/avengers/4050-4/",
    rating: {
      average: 8.6,
      count: 1456
    }
  },
  {
    id: 8,
    name: "Justice League",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "Los superhéroes más poderosos de DC Comics se unen como la Liga de la Justicia para proteger la Tierra de amenazas cósmicas.",
    start_year: 1960,
    publisher: { id: 10, name: "DC Comics" },
    issue_count: 400,
    site_detail_url: "https://comicvine.gamespot.com/justice-league/4050-5/",
    rating: {
      average: 8.4,
      count: 1234
    }
  },
  {
    id: 9,
    name: "The Flash",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "Barry Allen obtiene super velocidad después de ser alcanzado por un rayo y convertirse en el velocista escarlata conocido como Flash.",
    start_year: 1959,
    publisher: { id: 10, name: "DC Comics" },
    issue_count: 300,
    site_detail_url: "https://comicvine.gamespot.com/flash/4050-6/",
    rating: {
      average: 8.2,
      count: 890
    }
  },
  {
    id: 10,
    name: "Iron Man",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "Tony Stark usa su genio y recursos para crear una armadura tecnológicamente avanzada y convertirse en Iron Man.",
    start_year: 1968,
    publisher: { id: 31, name: "Marvel Comics" },
    issue_count: 400,
    site_detail_url: "https://comicvine.gamespot.com/iron-man/4050-7/",
    rating: {
      average: 8.3,
      count: 1100
    }
  },
  {
    id: 11,
    name: "Thor",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "El Dios del Trueno de Asgard empuña su martillo mágico Mjolnir para proteger tanto Asgard como la Tierra.",
    start_year: 1966,
    publisher: { id: 31, name: "Marvel Comics" },
    issue_count: 350,
    site_detail_url: "https://comicvine.gamespot.com/thor/4050-8/",
    rating: {
      average: 8.1,
      count: 980
    }
  },
  {
    id: 12,
    name: "Captain America",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "Steve Rogers se convierte en el super soldado Captain America durante la Segunda Guerra Mundial y continúa luchando por la justicia.",
    start_year: 1941,
    publisher: { id: 31, name: "Marvel Comics" },
    issue_count: 450,
    site_detail_url: "https://comicvine.gamespot.com/captain-america/4050-9/",
    rating: {
      average: 8.4,
      count: 1345
    }
  },
  {
    id: 13,
    name: "Fantastic Four",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "Reed Richards, Sue Storm, Johnny Storm y Ben Grimm obtienen poderes cósmicos y se convierten en la primera familia de superhéroes.",
    start_year: 1961,
    publisher: { id: 31, name: "Marvel Comics" },
    issue_count: 400,
    site_detail_url: "https://comicvine.gamespot.com/fantastic-four/4050-10/",
    rating: {
      average: 8.2,
      count: 1100
    }
  },
  {
    id: 14,
    name: "Daredevil",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "Matt Murdock perdió la vista pero ganó sentidos sobrehumanos, convirtiéndose en el vigilante conocido como Daredevil en Hell's Kitchen.",
    start_year: 1964,
    publisher: { id: 31, name: "Marvel Comics" },
    issue_count: 350,
    site_detail_url: "https://comicvine.gamespot.com/daredevil/4050-11/",
    rating: {
      average: 8.6,
      count: 890
    }
  },
  {
    id: 15,
    name: "Green Lantern",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "Hal Jordan recibe un anillo de poder de los Guardianes del Universo y se convierte en Green Lantern, protector del sector espacial 2814.",
    start_year: 1959,
    publisher: { id: 10, name: "DC Comics" },
    issue_count: 300,
    site_detail_url: "https://comicvine.gamespot.com/green-lantern/4050-12/",
    rating: {
      average: 8.0,
      count: 756
    }
  },
  {
    id: 16,
    name: "Aquaman",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "Arthur Curry es el Rey de Atlantis con la habilidad de comunicarse con la vida marina y controlar los océanos.",
    start_year: 1962,
    publisher: { id: 10, name: "DC Comics" },
    issue_count: 250,
    site_detail_url: "https://comicvine.gamespot.com/aquaman/4050-13/",
    rating: {
      average: 7.8,
      count: 600
    }
  },
  {
    id: 17,
    name: "The Hulk",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "Bruce Banner se transforma en el increíble Hulk cuando se enfurece, convirtiéndose en uno de los seres más poderosos del universo.",
    start_year: 1962,
    publisher: { id: 31, name: "Marvel Comics" },
    issue_count: 400,
    site_detail_url: "https://comicvine.gamespot.com/hulk/4050-14/",
    rating: {
      average: 8.3,
      count: 1200
    }
  },
  {
    id: 18,
    name: "Teen Titans",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "Un equipo de jóvenes superhéroes incluyendo Robin, Starfire, Raven, Beast Boy y Cyborg protegen Jump City.",
    start_year: 1964,
    publisher: { id: 10, name: "DC Comics" },
    issue_count: 200,
    site_detail_url: "https://comicvine.gamespot.com/teen-titans/4050-15/",
    rating: {
      average: 8.1,
      count: 850
    }
  },
  {
    id: 19,
    name: "Wolverine",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "Logan, conocido como Wolverine, es un mutante con garras de adamantium y factor de curación que lucha junto a los X-Men.",
    start_year: 1982,
    publisher: { id: 31, name: "Marvel Comics" },
    issue_count: 300,
    site_detail_url: "https://comicvine.gamespot.com/wolverine/4050-16/",
    rating: {
      average: 8.5,
      count: 1400
    }
  },
  {
    id: 20,
    name: "Deadpool",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    description: "Wade Wilson es el mercenario conocido como Deadpool, famoso por su humor irreverente y su factor de curación regenerativo.",
    start_year: 1997,
    publisher: { id: 31, name: "Marvel Comics" },
    issue_count: 200,
    site_detail_url: "https://comicvine.gamespot.com/deadpool/4050-17/",
    rating: {
      average: 8.7,
      count: 1600
    }
  },
  // --- NUEVOS COMICS AGREGADOS ---
  {
    id: 1001,
    name: "Spawn",
    image: {
      icon_url: "/images/comics/spawn.jpg",
      medium_url: "/images/comics/spawn.jpg",
      screen_url: "/images/comics/spawn.jpg",
      screen_large_url: "/images/comics/spawn.jpg",
      small_url: "/images/comics/spawn.jpg",
      super_url: "/images/comics/spawn.jpg",
      thumb_url: "/images/comics/spawn.jpg",
      tiny_url: "/images/comics/spawn.jpg",
      original_url: "/images/comics/spawn.jpg"
    },
    description: "Al Simmons, un ex agente de la CIA, regresa del infierno como Spawn, un antihéroe oscuro que lucha entre el bien y el mal.",
    start_year: 1992,
    publisher: { id: 101, name: "Image Comics" },
    issue_count: 350,
    site_detail_url: "https://comicvine.gamespot.com/spawn/4050-1234/",
    rating: { average: 8.5, count: 900 }
  },
  {
    id: 1002,
    name: "Hellboy",
    image: {
      icon_url: "/images/comics/hellboy.jpg",
      medium_url: "/images/comics/hellboy.jpg",
      screen_url: "/images/comics/hellboy.jpg",
      screen_large_url: "/images/comics/hellboy.jpg",
      small_url: "/images/comics/hellboy.jpg",
      super_url: "/images/comics/hellboy.jpg",
      thumb_url: "/images/comics/hellboy.jpg",
      tiny_url: "/images/comics/hellboy.jpg",
      original_url: "/images/comics/hellboy.jpg"
    },
    description: "Hellboy, un demonio invocado por nazis, se convierte en un investigador paranormal que protege a la humanidad de amenazas sobrenaturales.",
    start_year: 1994,
    publisher: { id: 102, name: "Dark Horse Comics" },
    issue_count: 80,
    site_detail_url: "https://comicvine.gamespot.com/hellboy/4050-5678/",
    rating: { average: 8.7, count: 700 }
  },
  {
    id: 1003,
    name: "Watchmen",
    image: {
      icon_url: "/images/comics/watchmen.jpg",
      medium_url: "/images/comics/watchmen.jpg",
      screen_url: "/images/comics/watchmen.jpg",
      screen_large_url: "/images/comics/watchmen.jpg",
      small_url: "/images/comics/watchmen.jpg",
      super_url: "/images/comics/watchmen.jpg",
      thumb_url: "/images/comics/watchmen.jpg",
      tiny_url: "/images/comics/watchmen.jpg",
      original_url: "/images/comics/watchmen.jpg"
    },
    description: "Una historia de superhéroes en un mundo alternativo, explorando temas de poder, moralidad y control social. Obra de Alan Moore y Dave Gibbons.",
    start_year: 1986,
    publisher: { id: 10, name: "DC Comics" },
    issue_count: 12,
    site_detail_url: "https://comicvine.gamespot.com/watchmen/4050-7890/",
    rating: { average: 9.5, count: 1200 }
  },
  {
    id: 1004,
    name: "Sandman",
    image: {
      icon_url: "/images/comics/sandman.jpg",
      medium_url: "/images/comics/sandman.jpg",
      screen_url: "/images/comics/sandman.jpg",
      screen_large_url: "/images/comics/sandman.jpg",
      small_url: "/images/comics/sandman.jpg",
      super_url: "/images/comics/sandman.jpg",
      thumb_url: "/images/comics/sandman.jpg",
      tiny_url: "/images/comics/sandman.jpg",
      original_url: "/images/comics/sandman.jpg"
    },
    description: "La aclamada serie de Neil Gaiman sobre Morfeo, el Señor de los Sueños, y su influencia en el mundo de los mortales y los eternos.",
    start_year: 1989,
    publisher: { id: 103, name: "Vertigo/DC Comics" },
    issue_count: 75,
    site_detail_url: "https://comicvine.gamespot.com/the-sandman/4050-4321/",
    rating: { average: 9.3, count: 950 }
  }
];

// Función helper para simular delay de red
const simulateDelay = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Función helper para construir URLs (para uso futuro con backend)
const buildApiUrl = (endpoint: string, params: string = '') => {
  const baseUrl = `${COMICVINE_BASE_URL}${endpoint}?api_key=${API_KEY}&format=json${params}`;
  return baseUrl;
};

export interface Comic {
  id: number;
  name: string;
  image: {
    icon_url: string;
    medium_url: string;
    screen_url: string;
    screen_large_url: string;
    small_url: string;
    super_url: string;
    thumb_url: string;
    tiny_url: string;
    original_url: string;
  };
  description: string;
  start_year: number;
  publisher: {
    id: number;
    name: string;
  };
  issue_count: number;
  site_detail_url: string;
  rating?: {
    average: number;
    count: number;
  };
}

export interface Issue {
  id: number;
  name: string;
  issue_number: string;
  cover_date: string;
  image: {
    icon_url: string;
    medium_url: string;
    screen_url: string;
    screen_large_url: string;
    small_url: string;
    super_url: string;
    thumb_url: string;
    tiny_url: string;
    original_url: string;
  };
  description: string;
  volume: {
    id: number;
    name: string;
  };
  site_detail_url: string;
}

export interface ComicVineResponse<T> {
  error: string;
  limit: number;
  offset: number;
  number_of_page_results: number;
  number_of_total_results: number;
  status_code: number;
  results: T[];
}

// Función para buscar cómics por nombre
export const searchComics = async (query: string, limit: number = 10): Promise<ComicVineResponse<Comic>> => {
  try {
    console.log('🔍 Buscando cómics...', query);
    
    // Intentar ComicVine API
    try {
      console.log('📚 Intentando ComicVine API...');
      const url = buildApiUrl('/volumes/', `&filter=name:${encodeURIComponent(query)}&limit=${limit}&field_list=id,name,image,description,start_year,publisher,count_of_issues,site_detail_url`);
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.status_code === 1 && data.results) {
          console.log('✅ ComicVine API funcionó!', data);
          
          // Mapear los datos de la API real al formato esperado
          const mappedResults = data.results.map((volume: any) => ({
            id: volume.id,
            name: volume.name,
            image: volume.image || {
              icon_url: `https://via.placeholder.com/150x150/34495e/ffffff?text=COMIC`,
              medium_url: `https://via.placeholder.com/300x400/34495e/ffffff?text=Comic+Magazine`,
              screen_url: `https://via.placeholder.com/400x600/34495e/ffffff?text=Comic+Magazine`,
              screen_large_url: `https://via.placeholder.com/600x800/34495e/ffffff?text=Comic+Magazine`,
              small_url: `https://via.placeholder.com/200x300/34495e/ffffff?text=COMIC`,
              super_url: `https://via.placeholder.com/800x1200/34495e/ffffff?text=Comic+Magazine`,
              thumb_url: `https://via.placeholder.com/100x150/34495e/ffffff?text=COM`,
              tiny_url: `https://via.placeholder.com/50x75/34495e/ffffff?text=C`,
              original_url: `https://via.placeholder.com/1200x1800/34495e/ffffff?text=Comic+Magazine`
            },
            description: volume.description || "Información no disponible",
            start_year: volume.start_year || 2000,
            publisher: volume.publisher || { id: 0, name: "Desconocido" },
            issue_count: volume.count_of_issues || 0,
            site_detail_url: volume.site_detail_url || "",
            rating: {
              average: Math.floor(Math.random() * 3) + 7 + Math.random(),
              count: Math.floor(Math.random() * 2000) + 500
            }
          }));
          
          return {
            error: data.error,
            limit: data.limit,
            offset: data.offset,
            number_of_page_results: data.number_of_page_results,
            number_of_total_results: data.number_of_total_results,
            status_code: data.status_code,
            results: mappedResults
          };
        }
      }
    } catch (corsError) {
      console.warn('❌ ComicVine API también falló por CORS:', corsError);
    }
    
    // 3. Fallback final: usar datos de ejemplo
    console.log('📋 Usando datos de ejemplo como último recurso...');
    await simulateDelay(500);
    const filteredComics = SAMPLE_COMICS.filter(comic => 
      comic.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, limit);
    
    return {
      error: "OK",
      limit: limit,
      offset: 0,
      number_of_page_results: filteredComics.length,
      number_of_total_results: filteredComics.length,
      status_code: 1,
      results: filteredComics
    };
  } catch (error) {
    console.error('Error buscando cómics:', error);
    throw error;
  }
};

// Función para obtener detalles de un cómic específico
export const getComicDetails = async (comicId: number): Promise<Comic> => {
  try {
    const url = buildApiUrl(`/volume/4050-${comicId}/`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error obteniendo detalles del cómic:', error);
    throw error;
  }
};

// Función para obtener issues de un cómic
export const getComicIssues = async (comicId: number, limit: number = 20): Promise<ComicVineResponse<Issue>> => {
  try {
    const url = `${COMICVINE_BASE_URL}/issues/?api_key=${API_KEY}&format=json&filter=volume:${comicId}&limit=${limit}&sort=issue_number:asc`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo issues del cómic:', error);
    throw error;
  }
};

// Función para buscar issues por nombre
export const searchIssues = async (query: string, limit: number = 10): Promise<ComicVineResponse<Issue>> => {
  try {
    const url = `${COMICVINE_BASE_URL}/issues/?api_key=${API_KEY}&format=json&filter=name:${encodeURIComponent(query)}&limit=${limit}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error buscando issues:', error);
    throw error;
  }
};

// Función para obtener cómics populares
export const getPopularComics = async (limit: number = 20): Promise<ComicVineResponse<Comic>> => {
  try {
    console.log('🔥 Obteniendo cómics populares...');
    
    // Intentar ComicVine API
    try {
      console.log('📚 Intentando ComicVine API para populares...');
      const url = buildApiUrl('/volumes/', `&limit=${limit}&sort=date_last_updated:desc&field_list=id,name,image,description,start_year,publisher,count_of_issues,site_detail_url`);
      
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        if (data.status_code === 1 && data.results) {
          console.log('✅ ComicVine API populares funcionó!', data);
          
          // Mapear los datos de la API real al formato esperado
          const mappedResults = data.results.map((volume: any) => ({
            id: volume.id,
            name: volume.name,
            image: volume.image || {
              icon_url: `https://via.placeholder.com/150x150/34495e/ffffff?text=COMIC`,
              medium_url: `https://via.placeholder.com/300x400/34495e/ffffff?text=Comic+Magazine`,
              screen_url: `https://via.placeholder.com/400x600/34495e/ffffff?text=Comic+Magazine`,
              screen_large_url: `https://via.placeholder.com/600x800/34495e/ffffff?text=Comic+Magazine`,
              small_url: `https://via.placeholder.com/200x300/34495e/ffffff?text=COMIC`,
              super_url: `https://via.placeholder.com/800x1200/34495e/ffffff?text=Comic+Magazine`,
              thumb_url: `https://via.placeholder.com/100x150/34495e/ffffff?text=COM`,
              tiny_url: `https://via.placeholder.com/50x75/34495e/ffffff?text=C`,
              original_url: `https://via.placeholder.com/1200x1800/34495e/ffffff?text=Comic+Magazine`
            },
            description: volume.description || "Información no disponible",
            start_year: volume.start_year || 2000,
            publisher: volume.publisher || { id: 0, name: "Desconocido" },
            issue_count: volume.count_of_issues || 0,
            site_detail_url: volume.site_detail_url || "",
            rating: {
              average: Math.floor(Math.random() * 3) + 7 + Math.random(),
              count: Math.floor(Math.random() * 2000) + 500
            }
          }));
          
          return {
            error: data.error,
            limit: data.limit,
            offset: data.offset,
            number_of_page_results: data.number_of_page_results,
            number_of_total_results: data.number_of_total_results,
            status_code: data.status_code,
            results: mappedResults
          };
        }
      }
    } catch (corsError) {
      console.warn('❌ ComicVine API populares también falló por CORS:', corsError);
    }
    
    // 3. Fallback final: usar datos de ejemplo
    console.log('📋 Usando datos de ejemplo para populares como último recurso...');
    await simulateDelay(600);
    
    const popularComics = SAMPLE_COMICS.slice(0, limit);
    
    return {
      error: "OK",
      limit: limit,
      offset: 0,
      number_of_page_results: popularComics.length,
      number_of_total_results: popularComics.length,
      status_code: 1,
      results: popularComics
    };
  } catch (error) {
    console.error('Error obteniendo cómics populares:', error);
    throw error;
  }
};

export interface Character {
  id: number;
  name: string;
  real_name?: string;
  image: {
    icon_url: string;
    medium_url: string;
    screen_url: string;
    screen_large_url: string;
    small_url: string;
    super_url: string;
    thumb_url: string;
    tiny_url: string;
    original_url: string;
  };
  description: string;
  publisher: {
    id: number;
    name: string;
  };
  powers?: string[];
  first_appeared_in_issue?: {
    id: number;
    name: string;
    issue_number: string;
  };
  origin?: string;
  site_detail_url: string;
  rating?: {
    average: number;
    count: number;
  };
}

// Datos de ejemplo para personajes
const SAMPLE_CHARACTERS: Character[] = [
  {
    id: 1,
    name: "Spider-Man",
    real_name: "Peter Parker",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/620-spider-man.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/620-spider-man.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/620-spider-man.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/620-spider-man.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/620-spider-man.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/620-spider-man.jpg"
    },
    description: "Después de ser mordido por una araña radiactiva, Peter Parker desarrolló poderes arácnidos y se convirtió en el amigable vecino Spider-Man.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Fuerza sobrehumana", "Agilidad", "Sentido arácnido", "Adherencia a superficies", "Lanzatelarañas"],
    origin: "Mordido por araña radiactiva",
    site_detail_url: "https://comicvine.gamespot.com/spider-man/4005-1443/",
    rating: { average: 9.1, count: 2456 }
  },
  {
    id: 2,
    name: "Batman",
    real_name: "Bruce Wayne",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/70-batman.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/70-batman.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/70-batman.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/70-batman.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/70-batman.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/70-batman.jpg"
    },
    description: "Bruce Wayne se convirtió en Batman después de presenciar el asesinato de sus padres, dedicando su vida a combatir el crimen en Gotham City.",
    publisher: { id: 10, name: "DC Comics" },
    powers: ["Intelecto genial", "Artes marciales", "Tecnología avanzada", "Habilidades detectivescas", "Recursos ilimitados"],
    origin: "Testigo del asesinato de sus padres",
    site_detail_url: "https://comicvine.gamespot.com/batman/4005-1699/",
    rating: { average: 9.3, count: 3021 }
  },
  {
    id: 3,
    name: "Wonder Woman",
    real_name: "Diana Prince",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/720-wonder-woman.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/720-wonder-woman.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/720-wonder-woman.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/720-wonder-woman.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/720-wonder-woman.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/720-wonder-woman.jpg"
    },
    description: "Princesa amazona de Themyscira que llegó al mundo del hombre para luchar por la justicia, la paz y el amor.",
    publisher: { id: 10, name: "DC Comics" },
    powers: ["Fuerza divina", "Vuelo", "Lazo de la verdad", "Brazaletes deflectores", "Velocidad sobrehumana"],
    origin: "Princesa amazona creada por los dioses",
    site_detail_url: "https://comicvine.gamespot.com/wonder-woman/4005-2048/",
    rating: { average: 8.8, count: 1789 }
  },
  {
    id: 4,
    name: "Iron Man",
    real_name: "Tony Stark",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/346-iron-man.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/346-iron-man.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/346-iron-man.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/346-iron-man.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/346-iron-man.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man.jpg"
    },
    description: "Genio millonario que creó una armadura tecnológicamente avanzada para convertirse en Iron Man después de ser capturado por terroristas.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Armadura de alta tecnología", "Vuelo", "Rayos repulsores", "Genio en ingeniería", "Recursos ilimitados"],
    origin: "Creó armadura para escapar del cautiverio",
    site_detail_url: "https://comicvine.gamespot.com/iron-man/4005-1455/",
    rating: { average: 8.6, count: 1534 }
  },
  {
    id: 5,
    name: "Captain America",
    real_name: "Steve Rogers",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/149-captain-america.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/149-captain-america.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/149-captain-america.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/149-captain-america.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/149-captain-america.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america.jpg"
    },
    description: "Un soldado de la Segunda Guerra Mundial transformado por el suero del supersoldado en el Primer Vengador de América.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Fuerza sobrehumana", "Agilidad aumentada", "Escudo de vibranium", "Liderazgo", "Resistencia mejorada"],
    origin: "Suero del supersoldado",
    site_detail_url: "https://comicvine.gamespot.com/captain-america/4005-1442/",
    rating: { average: 8.7, count: 1923 }
  },
  {
    id: 6,
    name: "The Flash",
    real_name: "Barry Allen",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/263-flash.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/263-flash.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/263-flash.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/263-flash.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/263-flash.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/263-flash.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/263-flash.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/263-flash.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/263-flash.jpg"
    },
    description: "Científico forense que obtuvo súper velocidad tras ser alcanzado por un rayo en su laboratorio lleno de químicos.",
    publisher: { id: 10, name: "DC Comics" },
    powers: ["Súper velocidad", "Viaje en el tiempo", "Fuerza de velocidad", "Reflejos aumentados", "Curación acelerada"],
    origin: "Rayo y químicos en el laboratorio",
    site_detail_url: "https://comicvine.gamespot.com/flash/4005-1916/",
    rating: { average: 8.4, count: 1456 }
  },
  {
    id: 7,
    name: "Wolverine",
    real_name: "James Howlett (Logan)",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/717-wolverine.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/717-wolverine.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/717-wolverine.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/717-wolverine.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/717-wolverine.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/717-wolverine.jpg"
    },
    description: "Mutante con factor curativo, garras de adamantium retráctiles y sentidos animalescos mejorados.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Factor curativo", "Garras de adamantium", "Sentidos mejorados", "Esqueleto de adamantium", "Longevidad"],
    origin: "Mutante con experimentos del programa Arma X",
    site_detail_url: "https://comicvine.gamespot.com/wolverine/4005-1440/",
    rating: { average: 9.0, count: 2789 }
  },
  {
    id: 8,
    name: "Superman",
    real_name: "Clark Kent (Kal-El)",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/644-superman.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/644-superman.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/644-superman.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/644-superman.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/644-superman.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/644-superman.jpg"
    },
    description: "El último hijo de Krypton que se convirtió en el protector más poderoso de la Tierra.",
    publisher: { id: 10, name: "DC Comics" },
    powers: ["Vuelo", "Fuerza sobrehumana", "Visión de calor", "Visión de rayos X", "Súper velocidad", "Invulnerabilidad"],
    origin: "Último superviviente de Krypton",
    site_detail_url: "https://comicvine.gamespot.com/superman/4005-1807/",
    rating: { average: 9.2, count: 3456 }
  },
  {
    id: 9,
    name: "Green Lantern",
    real_name: "Hal Jordan",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/313-green-lantern.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/313-green-lantern.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/313-green-lantern.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/313-green-lantern.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/313-green-lantern.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/313-green-lantern.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/313-green-lantern.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/313-green-lantern.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/313-green-lantern.jpg"
    },
    description: "Piloto de pruebas que se convirtió en miembro del Cuerpo de Linternas Verdes del sector espacial 2814.",
    publisher: { id: 10, name: "DC Comics" },
    powers: ["Anillo de poder", "Vuelo", "Construcciones de energía", "Traducción universal", "Protección espacial"],
    origin: "Elegido por anillo de Linterna Verde",
    site_detail_url: "https://comicvine.gamespot.com/green-lantern/4005-1565/",
    rating: { average: 8.3, count: 1234 }
  },
  {
    id: 10,
    name: "Thor",
    real_name: "Thor Odinson",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/659-thor.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/659-thor.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/659-thor.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/659-thor.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/659-thor.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/659-thor.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/659-thor.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/659-thor.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/659-thor.jpg"
    },
    description: "Dios asgardiano del trueno que empuña el martillo místico Mjolnir y protege tanto Asgard como Midgard.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Mjolnir", "Control del trueno", "Fuerza divina", "Vuelo", "Longevidad", "Resistencia mágica"],
    origin: "Dios asgardiano",
    site_detail_url: "https://comicvine.gamespot.com/thor/4005-1737/",
    rating: { average: 8.9, count: 2103 }
  },
  {
    id: 11,
    name: "Hulk",
    real_name: "Bruce Banner",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/332-hulk.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/332-hulk.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/332-hulk.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/332-hulk.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/332-hulk.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk.jpg"
    },
    description: "Científico que se transforma en un gigante verde de fuerza ilimitada cuando se enfurece.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Fuerza ilimitada", "Factor curativo", "Resistencia", "Saltos enormes", "Inmunidad a enfermedades"],
    origin: "Radiación gamma",
    site_detail_url: "https://comicvine.gamespot.com/hulk/4005-2267/",
    rating: { average: 8.8, count: 2567 }
  },
  {
    id: 12,
    name: "Deadpool",
    real_name: "Wade Wilson",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/213-deadpool.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/213-deadpool.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/213-deadpool.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/213-deadpool.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/213-deadpool.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/213-deadpool.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/213-deadpool.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/213-deadpool.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/213-deadpool.jpg"
    },
    description: "Mercenario con factor curativo acelerado, habilidades de combate excepcionales y tendencia a romper la cuarta pared.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Factor curativo", "Habilidades de combate", "Inmortalidad", "Teleportación", "Romper cuarta pared"],
    origin: "Experimento del programa Arma X",
    site_detail_url: "https://comicvine.gamespot.com/deadpool/4005-7606/",
    rating: { average: 8.7, count: 1876 }
  },
  {
    id: 13,
    name: "Black Widow",
    real_name: "Natasha Romanoff",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/107-black-widow.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/107-black-widow.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/107-black-widow.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/107-black-widow.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/107-black-widow.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/107-black-widow.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/107-black-widow.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/107-black-widow.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/107-black-widow.jpg"
    },
    description: "Ex-espía rusa entrenada en la Habitación Roja que se convirtió en una de los Vengadores más letales.",
    publisher: { id: 31, name: "Marvel Comics" },
    powers: ["Artes marciales", "Espionaje", "Acrobacia", "Viudas mordidas", "Entrenamiento militar"],
    origin: "Programa de espías de la Habitación Roja",
    site_detail_url: "https://comicvine.gamespot.com/black-widow/4005-3103/",
    rating: { average: 8.2, count: 1345 }
  },
  {
    id: 14,
    name: "Aquaman",
    real_name: "Arthur Curry",
    image: {
      icon_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/52-aquaman.jpg",
      medium_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/52-aquaman.jpg",
      screen_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/52-aquaman.jpg",
      screen_large_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/52-aquaman.jpg",
      small_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/52-aquaman.jpg",
      super_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/52-aquaman.jpg",
      thumb_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/52-aquaman.jpg",
      tiny_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/52-aquaman.jpg",
      original_url: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/52-aquaman.jpg"
    },
    description: "Rey de Atlantis con la habilidad de comunicarse con la vida marina y controlar los océanos.",
    publisher: { id: 10, name: "DC Comics" },
    powers: ["Comunicación marina", "Fuerza sobrehumana", "Nado súper rápido", "Resistencia presión", "Tridente de Poseidón"],
    origin: "Hijo del faro keeper y reina atlante",
    site_detail_url: "https://comicvine.gamespot.com/aquaman/4005-1386/",
    rating: { average: 7.8, count: 987 }
  }
];

// ===== LOCATIONS INTERFACES AND DATA =====

export interface Location {
  id: number;
  name: string;
  description: string;
  image?: {
    icon_url: string;
    medium_url: string;
    screen_url: string;
    screen_large_url: string;
    small_url: string;
    super_url: string;
    thumb_url: string;
    tiny_url: string;
    original_url: string;
  };
  publisher?: {
    id: number;
    name: string;
  };
  site_detail_url: string;
  first_appeared_in_issue?: {
    id: number;
    name: string;
    issue_number: string;
  };
  start_year?: number;
}

// Datos de ejemplo para ubicaciones icónicas
const SAMPLE_LOCATIONS: Location[] = [
  {
    id: 1,
    name: "Gotham City",
    description: "La ciudad hogar de Batman, conocida por su arquitectura gótica y su alta tasa de criminalidad. Una metrópoli oscura donde los vigilantes y villanos luchan en las sombras de sus rascacielos.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=150&h=150&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 10, name: "DC Comics" },
    site_detail_url: "https://comicvine.gamespot.com/gotham-city/4020-41168/",
    start_year: 1940
  },
  {
    id: 2,
    name: "Metropolis",
    description: "La brillante ciudad natal de Superman, símbolo de esperanza y progreso. Una metrópoli futurista donde Clark Kent trabaja como reportero en el Daily Planet.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=150&h=150&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 10, name: "DC Comics" },
    site_detail_url: "https://comicvine.gamespot.com/metropolis/4020-41170/",
    start_year: 1938
  },
  {
    id: 3,
    name: "New York City",
    description: "La ciudad que nunca duerme, hogar de muchos superhéroes de Marvel incluyendo Spider-Man, los Avengers y los X-Men. El epicentro de muchas batallas épicas.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1546436836-07a91091f160?w=150&h=150&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1546436836-07a91091f160?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1546436836-07a91091f160?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1546436836-07a91091f160?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1546436836-07a91091f160?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1546436836-07a91091f160?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1546436836-07a91091f160?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1546436836-07a91091f160?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1546436836-07a91091f160?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 31, name: "Marvel Comics" },
    site_detail_url: "https://comicvine.gamespot.com/new-york-city/4020-40809/",
    start_year: 1963
  },
  {
    id: 4,
    name: "Asgard",
    description: "El reino mítico de los dioses nórdicos, hogar de Thor y Odin. Una ciudad dorada que flota en el espacio, conectada a los otros nueve reinos por Yggdrasil.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 31, name: "Marvel Comics" },
    site_detail_url: "https://comicvine.gamespot.com/asgard/4020-56655/",
    start_year: 1962
  },
  {
    id: 5,
    name: "Atlantis",
    description: "El reino submarino gobernado por Aquaman. Una civilización avanzada bajo los océanos con tecnología única y arquitectura acuática impresionante.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=150&h=150&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 10, name: "DC Comics" },
    site_detail_url: "https://comicvine.gamespot.com/atlantis/4020-56094/",
    start_year: 1941
  },
  {
    id: 6,
    name: "Wakanda",
    description: "La nación africana más avanzada tecnológicamente, rica en vibranium y hogar de Black Panther. Un reino oculto que combina tradición ancestral con tecnología futurista.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=150&h=150&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 31, name: "Marvel Comics" },
    site_detail_url: "https://comicvine.gamespot.com/wakanda/4020-56656/",
    start_year: 1966
  }
];

// Función para obtener locations populares
export const getPopularLocations = async (page: number = 1, useSampleData: boolean = true): Promise<{ results: Location[]; total: number; page: number }> => {
  if (useSampleData) {
    // Simular paginación con datos de ejemplo
    const itemsPerPage = 6;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      results: SAMPLE_LOCATIONS.slice(startIndex, endIndex),
      total: SAMPLE_LOCATIONS.length,
      page: page
    };
  }

  try {
    const response = await fetch(
      `${COMICVINE_BASE_URL}/locations/?api_key=${API_KEY}&format=json&sort=name&limit=12&offset=${(page - 1) * 12}`,
      { mode: 'cors' }
    );
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      results: data.results || [],
      total: data.number_of_total_results || 0,
      page: page
    };
  } catch (error) {
    console.warn('Error fetching from ComicVine API, using sample data:', error);
    // Fallback a datos de ejemplo
    const itemsPerPage = 6;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      results: SAMPLE_LOCATIONS.slice(startIndex, endIndex),
      total: SAMPLE_LOCATIONS.length,
      page: page
    };
  }
};

// ===== SERIES INTERFACES AND DATA =====

export interface Series {
  id: number;
  name: string;
  description: string;
  image?: {
    icon_url: string;
    medium_url: string;
    screen_url: string;
    screen_large_url: string;
    small_url: string;
    super_url: string;
    thumb_url: string;
    tiny_url: string;
    original_url: string;
  };
  publisher?: {
    id: number;
    name: string;
  };
  site_detail_url: string;
  start_year?: number;
  count_of_issues?: number;
  count_of_volumes?: number;
}

// Datos de ejemplo para series populares
const SAMPLE_SERIES: Series[] = [
  {
    id: 1,
    name: "Batman",
    description: "La serie de Batman incluye todas las publicaciones del Caballero Oscuro desde 1939. Siguiendo las aventuras de Bruce Wayne como Batman, protector de Gotham City, enfrentando villanos icónicos como Joker, Penguin, Riddler y muchos más a lo largo de diferentes eras y continuidades.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=150&h=150&fit=crop&crop=center",
      medium_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=400&fit=crop&crop=center",
      screen_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop&crop=center",
      screen_large_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=800&fit=crop&crop=center",
      small_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=200&h=300&fit=crop&crop=center",
      super_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=1200&fit=crop&crop=center",
      thumb_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=100&h=150&fit=crop&crop=center",
      tiny_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=50&h=75&fit=crop&crop=center",
      original_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=1200&h=1800&fit=crop&crop=center"
    },
    publisher: { id: 10, name: "DC Comics" },
    site_detail_url: "https://comicvine.gamespot.com/batman/4050-796/",
    start_year: 1939,
    count_of_issues: 881,
    count_of_volumes: 15
  },
  {
    id: 2,
    name: "The Amazing Spider-Man",
    description: "La serie principal de Spider-Man que sigue las aventuras de Peter Parker desde 1963. Explora su doble vida como fotógrafo y superhéroe, sus relaciones, y sus enfrentamientos contra villanos como Green Goblin, Doctor Octopus, Venom y Sandman.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 31, name: "Marvel Comics" },
    site_detail_url: "https://comicvine.gamespot.com/the-amazing-spider-man/4050-2127/",
    start_year: 1963,
    count_of_issues: 801,
    count_of_volumes: 5
  },
  {
    id: 3,
    name: "Superman",
    description: "La serie emblemática del Hombre de Acero desde 1938. Sigue las aventuras de Clark Kent/Kal-El como Superman, protegiendo Metropolis y la Tierra de amenazas tanto terrestres como extraterrestres, incluyendo Lex Luthor, Doomsday y Brainiac.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1594736797933-d0b020ccfb0d?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1594736797933-d0b020ccfb0d?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1594736797933-d0b020ccfb0d?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1594736797933-d0b020ccfb0d?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1594736797933-d0b020ccfb0d?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1594736797933-d0b020ccfb0d?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1594736797933-d0b020ccfb0d?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1594736797933-d0b020ccfb0d?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1594736797933-d0b020ccfb0d?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 10, name: "DC Comics" },
    site_detail_url: "https://comicvine.gamespot.com/superman/4050-368/",
    start_year: 1938,
    count_of_issues: 714,
    count_of_volumes: 12
  },
  {
    id: 4,
    name: "X-Men",
    description: "La serie que presenta a los mutantes más famosos del universo Marvel. Sigue las aventuras del Profesor Charles Xavier y su escuela para jóvenes dotados, explorando temas de discriminación, aceptación y la lucha por la coexistencia pacífica entre humanos y mutantes.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 31, name: "Marvel Comics" },
    site_detail_url: "https://comicvine.gamespot.com/x-men/4050-18077/",
    start_year: 1963,
    count_of_issues: 544,
    count_of_volumes: 8
  },
  {
    id: 5,
    name: "Wonder Woman",
    description: "La serie de la Princesa Amazona desde 1941. Sigue las aventuras de Diana de Themyscira como Wonder Woman, embajadora de paz y guerrera, protegiendo tanto el mundo de los mortales como Themyscira de amenazas míticas y modernas.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 10, name: "DC Comics" },
    site_detail_url: "https://comicvine.gamespot.com/wonder-woman/4050-368/",
    start_year: 1941,
    count_of_issues: 329,
    count_of_volumes: 7
  },
  {
    id: 6,
    name: "The Avengers",
    description: "La serie de Los Vengadores de Marvel, reuniendo a los héroes más poderosos de la Tierra. Desde su formación en 1963, este equipo ha enfrentado amenazas que ningún héroe podría manejar solo, incluyendo invasiones extraterrestres, villanos cósmicos y crisis multiversales.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1608889135638-8ed31095eb8e?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1608889135638-8ed31095eb8e?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1608889135638-8ed31095eb8e?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1608889135638-8ed31095eb8e?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1608889135638-8ed31095eb8e?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1608889135638-8ed31095eb8e?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1608889135638-8ed31095eb8e?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1608889135638-8ed31095eb8e?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1608889135638-8ed31095eb8e?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 31, name: "Marvel Comics" },
    site_detail_url: "https://comicvine.gamespot.com/the-avengers/4050-2128/",
    start_year: 1963,
    count_of_issues: 402,
    count_of_volumes: 9
  },
  {
    id: 7,
    name: "The Fantastic Four",
    description: "La primera familia de superhéroes de Marvel. Reed Richards, Sue Storm, Johnny Storm y Ben Grimm obtuvieron poderes cósmicos en una misión espacial y se convirtieron en los Fantastic Four, explorando dimensiones alternativas y enfrentando amenazas cósmicas como Galactus y Doctor Doom.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 31, name: "Marvel Comics" },
    site_detail_url: "https://comicvine.gamespot.com/fantastic-four/4050-2123/",
    start_year: 1961,
    count_of_issues: 588,
    count_of_volumes: 6
  },
  {
    id: 8,
    name: "Justice League",
    description: "Los héroes más poderosos del universo DC unidos para proteger la Tierra. Superman, Batman, Wonder Woman, Flash, Green Lantern, Aquaman y Cyborg forman el equipo de superhéroes más formidable, enfrentando amenazas que ningún héroe podría enfrentar solo.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1531259683007-016a943acd2e?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1531259683007-016a943acd2e?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1531259683007-016a943acd2e?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1531259683007-016a943acd2e?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1531259683007-016a943acd2e?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1531259683007-016a943acd2e?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1531259683007-016a943acd2e?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1531259683007-016a943acd2e?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1531259683007-016a943acd2e?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 10, name: "DC Comics" },
    site_detail_url: "https://comicvine.gamespot.com/justice-league/4050-2127/",
    start_year: 1960,
    count_of_issues: 261,
    count_of_volumes: 4
  },
  {
    id: 9,
    name: "The Flash",
    description: "El hombre más rápido del mundo. Desde Jay Garrick hasta Barry Allen y Wally West, The Flash ha protegido Central City y el mundo usando la Speed Force, enfrentando villanos como Reverse-Flash, Captain Cold y los Rogues mientras explora el multiverso.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1470093851219-69951fcbb533?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1470093851219-69951fcbb533?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1470093851219-69951fcbb533?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1470093851219-69951fcbb533?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1470093851219-69951fcbb533?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1470093851219-69951fcbb533?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1470093851219-69951fcbb533?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1470093851219-69951fcbb533?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1470093851219-69951fcbb533?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 10, name: "DC Comics" },
    site_detail_url: "https://comicvine.gamespot.com/the-flash/4050-2129/",
    start_year: 1940,
    count_of_issues: 800,
    count_of_volumes: 5
  },
  {
    id: 10,
    name: "Green Lantern",
    description: "Los guardianes del universo armados con los anillos de poder más poderosos. Desde Hal Jordan hasta John Stewart, Guy Gardner y Kyle Rayner, los Green Lanterns protegen el espacio como miembros del Green Lantern Corps, enfrentando amenazas cósmicas.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 10, name: "DC Comics" },
    site_detail_url: "https://comicvine.gamespot.com/green-lantern/4050-2130/",
    start_year: 1940,
    count_of_issues: 182,
    count_of_volumes: 3
  },
  {
    id: 11,
    name: "Teen Titans",
    description: "Los jóvenes héroes más talentosos del universo DC. Robin, Starfire, Raven, Beast Boy y Cyborg forman este equipo de adolescentes superhéroes que enfrentan amenazas tanto terrestres como dimensionales mientras lidian con los desafíos de crecer.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 10, name: "DC Comics" },
    site_detail_url: "https://comicvine.gamespot.com/teen-titans/4050-2131/",
    start_year: 1966,
    count_of_issues: 43,
    count_of_volumes: 6
  },
  {
    id: 12,
    name: "Guardians of the Galaxy",
    description: "Los protectores cósmicos más improbables del universo Marvel. Star-Lord, Gamora, Drax, Rocket Raccoon y Groot forman este equipo disfuncional pero efectivo que protege la galaxia de amenazas cósmicas mientras lidian con sus propios pasados problemáticos.",
    image: {
      icon_url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=150&h=200&fit=crop",
      medium_url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&h=400&fit=crop",
      screen_url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=600&fit=crop",
      screen_large_url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=600&h=800&fit=crop",
      small_url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=200&h=300&fit=crop",
      super_url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=1200&fit=crop",
      thumb_url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=100&h=150&fit=crop",
      tiny_url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=50&h=75&fit=crop",
      original_url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1200&h=1800&fit=crop"
    },
    publisher: { id: 31, name: "Marvel Comics" },
    site_detail_url: "https://comicvine.gamespot.com/guardians-of-the-galaxy/4050-2132/",
    start_year: 1969,
    count_of_issues: 62,
    count_of_volumes: 4
  }
];

// Función para buscar series por nombre
export const searchSeries = async (query: string, limit: number = 10): Promise<ComicVineResponse<Series>> => {
  try {
    console.log('🔍 Buscando series...', query);
    
    // Intentar ComicVine API
    try {
      console.log('📚 Intentando ComicVine API...');
      const url = buildApiUrl('/volumes/', `&filter=name:${encodeURIComponent(query)}&limit=${limit}&field_list=id,name,image,description,start_year,publisher,count_of_issues,site_detail_url`);
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.status_code === 1 && data.results) {
          console.log('✅ ComicVine API funcionó!', data);
          
          // Mapear los datos de la API real al formato esperado
          const mappedResults = data.results.map((volume: any) => ({
            id: volume.id,
            name: volume.name,
            image: volume.image || {
              icon_url: `https://via.placeholder.com/150x150/34495e/ffffff?text=SERIE`,
              medium_url: `https://via.placeholder.com/300x400/34495e/ffffff?text=Serie+Magazine`,
              screen_url: `https://via.placeholder.com/400x600/34495e/ffffff?text=Serie+Magazine`,
              screen_large_url: `https://via.placeholder.com/600x800/34495e/ffffff?text=Serie+Magazine`,
              small_url: `https://via.placeholder.com/200x300/34495e/ffffff?text=SERIE`,
              super_url: `https://via.placeholder.com/800x1200/34495e/ffffff?text=Serie+Magazine`,
              thumb_url: `https://via.placeholder.com/100x150/34495e/ffffff?text=SER`,
              tiny_url: `https://via.placeholder.com/50x75/34495e/ffffff?text=S`,
              original_url: `https://via.placeholder.com/1200x1800/34495e/ffffff?text=Serie+Magazine`
            },
            description: volume.description || "Información no disponible",
            start_year: volume.start_year || 2000,
            publisher: volume.publisher || { id: 0, name: "Desconocido" },
            issue_count: volume.count_of_issues || 0,
            site_detail_url: volume.site_detail_url || "",
            rating: {
              average: Math.floor(Math.random() * 3) + 7 + Math.random(),
              count: Math.floor(Math.random() * 2000) + 500
            }
          }));
          
          return {
            error: data.error,
            limit: data.limit,
            offset: data.offset,
            number_of_page_results: data.number_of_page_results,
            number_of_total_results: data.number_of_total_results,
            status_code: data.status_code,
            results: mappedResults
          };
        }
      }
    } catch (corsError) {
      console.warn('❌ ComicVine API también falló por CORS:', corsError);
    }
    
    // 3. Fallback final: usar datos de ejemplo
    console.log('📋 Usando datos de ejemplo como último recurso...');
    await simulateDelay(500);
    const filteredSeries = SAMPLE_SERIES.filter(series => 
      series.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, limit);
    
    return {
      error: "OK",
      limit: limit,
      offset: 0,
      number_of_page_results: filteredSeries.length,
      number_of_total_results: filteredSeries.length,
      status_code: 1,
      results: filteredSeries
    };
  } catch (error) {
    console.error('Error buscando series:', error);
    throw error;
  }
};

// Función para obtener detalles de una serie específica
export const getSeriesDetails = async (seriesId: number): Promise<Series> => {
  try {
    const url = buildApiUrl(`/volume/4050-${seriesId}/`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error obteniendo detalles de la serie:', error);
    throw error;
  }
};

// Función para obtener issues de una serie
export const getSeriesIssues = async (seriesId: number, limit: number = 20): Promise<ComicVineResponse<Issue>> => {
  try {
    const url = `${COMICVINE_BASE_URL}/issues/?api_key=${API_KEY}&format=json&filter=volume:${seriesId}&limit=${limit}&sort=issue_number:asc`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo issues de la serie:', error);
    throw error;
  }
};

// Función para buscar issues por nombre en series
export const searchSeriesIssues = async (query: string, limit: number = 10): Promise<ComicVineResponse<Issue>> => {
  try {
    const url = `${COMICVINE_BASE_URL}/issues/?api_key=${API_KEY}&format=json&filter=name:${encodeURIComponent(query)}&limit=${limit}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error buscando issues en series:', error);
    throw error;
  }
};

// Función para obtener series populares
export const getPopularSeries = async (page: number = 1, useSampleData: boolean = true): Promise<{ results: Series[]; total: number; page: number }> => {
  if (useSampleData) {
    // Simular paginación con datos de ejemplo
    const itemsPerPage = 6;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      results: SAMPLE_SERIES.slice(startIndex, endIndex),
      total: SAMPLE_SERIES.length,
      page: page
    };
  }

  try {
    const response = await fetch(
      `${COMICVINE_BASE_URL}/volumes/?api_key=${API_KEY}&format=json&sort=name&limit=12&offset=${(page - 1) * 12}`,
      { mode: 'cors' }
    );
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      results: data.results || [],
      total: data.number_of_total_results || 0,
      page: page
    };
  } catch (error) {
    console.warn('Error fetching from ComicVine API, using sample data:', error);
    // Fallback a datos de ejemplo
    const itemsPerPage = 6;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      results: SAMPLE_SERIES.slice(startIndex, endIndex),
      total: SAMPLE_SERIES.length,
      page: page
    };
  }
};

// Función para obtener characters populares
export const getPopularCharacters = async (page: number = 1, useSampleData: boolean = true): Promise<{ results: Character[]; total: number; page: number }> => {
  if (useSampleData) {
    // Simular paginación con datos de ejemplo
    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      results: SAMPLE_CHARACTERS.slice(startIndex, endIndex),
      total: SAMPLE_CHARACTERS.length,
      page: page
    };
  }

  try {
    const response = await fetch(
      `${COMICVINE_BASE_URL}/characters/?api_key=${API_KEY}&format=json&sort=name&limit=12&offset=${(page - 1) * 12}`,
      { mode: 'cors' }
    );
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      results: data.results || [],
      total: data.number_of_total_results || 0,
      page: page
    };
  } catch (error) {
    console.warn('Error fetching from ComicVine API, using sample data:', error);
    // Fallback a datos de ejemplo
    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      results: SAMPLE_CHARACTERS.slice(startIndex, endIndex),
      total: SAMPLE_CHARACTERS.length,
      page: page
    };
  }
};

/*
 * EXPLICACIÓN DE LA API REAL DE COMICVINE:
 * 
 * La API de ComicVine SÍ proporciona imágenes reales de alta calidad:
 * 
 * Ejemplo de respuesta real de un volumen (cómic):
 * {
 *   "id": 796,
 *   "name": "Batman",
 *   "start_year": 1940,
 *   "image": {
 *     "icon_url": "https://comicvine.gamespot.com/a/uploads/square_avatar/6/67663/5206439-796.jpg",
 *     "medium_url": "https://comicvine.gamespot.com/a/uploads/scale_medium/6/67663/5206439-796.jpg",
 *     "screen_url": "https://comicvine.gamespot.com/a/uploads/screen_medium/6/67663/5206439-796.jpg",
 *     "screen_large_url": "https://comicvine.gamespot.com/a/uploads/screen_kubrick/6/67663/5206439-796.jpg",
 *     "small_url": "https://comicvine.gamespot.com/a/uploads/scale_small/6/67663/5206439-796.jpg",
 *     "super_url": "https://comicvine.gamespot.com/a/uploads/scale_large/6/67663/5206439-796.jpg",
 *     "thumb_url": "https://comicvine.gamespot.com/a/uploads/square_mini/6/67663/5206439-796.jpg",
 *     "tiny_url": "https://comicvine.gamespot.com/a/uploads/square_mini/6/67663/5206439-796.jpg",
 *     "original_url": "https://comicvine.gamespot.com/a/uploads/original/6/67663/5206439-796.jpg"
 *   },
 *   "description": "<p>Batman is a superhero...</p>",
 *   "publisher": {
 *     "id": 10,
 *     "name": "DC Comics"
 *   },
 *   "count_of_issues": 881
 * }
 * 
 * El problema en nuestro frontend es CORS (Cross-Origin Resource Sharing).
 * ComicVine no permite peticiones directas desde navegadores debido a su política CORS.
 * 
 * SOLUCIONES PARA USAR LA API REAL:
 * 1. Crear un backend proxy que haga las peticiones a ComicVine
 * 2. Usar un proxy CORS público (no recomendado para producción)
 * 3. Usar extensiones del navegador que desactiven CORS (solo para desarrollo)
 * 
 * En este código, intentamos la llamada real primero, y si falla por CORS,
 * usamos datos de ejemplo con imágenes alternativas.
 */
