// Solución súper simple - URLs directas que funcionan
const characterImages: { [key: string]: string } = {
  // Marvel
  'Thor': 'https://i.imgur.com/5K7XzQs.jpg',
  'Iron Man': 'https://i.imgur.com/bLjVMqr.jpg',
  'Tony Stark': 'https://i.imgur.com/bLjVMqr.jpg',
  'Spider-Man': 'https://i.imgur.com/dRhJqBT.jpg',
  'Peter Parker': 'https://i.imgur.com/dRhJqBT.jpg',
  'Captain America': 'https://i.imgur.com/NqwJKzv.jpg',
  'Steve Rogers': 'https://i.imgur.com/NqwJKzv.jpg',
  'Hulk': 'https://i.imgur.com/BvXyj8j.jpg',
  'Bruce Banner': 'https://i.imgur.com/BvXyj8j.jpg',
  'Black Widow': 'https://i.imgur.com/wKZXlbY.jpg',
  'Natasha Romanoff': 'https://i.imgur.com/wKZXlbY.jpg',
  
  // DC
  'Batman': 'https://i.imgur.com/5rBdUOc.jpg',
  'Bruce Wayne': 'https://i.imgur.com/5rBdUOc.jpg',
  'Superman': 'https://i.imgur.com/H7LzqGU.jpg',
  'Clark Kent': 'https://i.imgur.com/H7LzqGU.jpg',
  'Wonder Woman': 'https://i.imgur.com/kSoGFYV.jpg',
  'Diana Prince': 'https://i.imgur.com/kSoGFYV.jpg',
  'Aquaman': 'https://i.imgur.com/7J5g4Hf.jpg',
  'Arthur Curry': 'https://i.imgur.com/7J5g4Hf.jpg',
  'Green Lantern': 'https://i.imgur.com/xB9j4Qr.jpg',
  'Hal Jordan': 'https://i.imgur.com/xB9j4Qr.jpg',
  'Flash': 'https://i.imgur.com/yGv8Hq3.jpg',
  'Barry Allen': 'https://i.imgur.com/yGv8Hq3.jpg',
};

// Imagen por defecto
const DEFAULT_IMAGE = 'https://i.imgur.com/dRhJqBT.jpg';

// Función simple - busca por nombre y devuelve URL
export function getCharacterImage(characterName: string): string {
  // Buscar exacto
  if (characterImages[characterName]) {
    return characterImages[characterName];
  }
  
  // Buscar sin importar mayúsculas/minúsculas
  const lowerName = characterName.toLowerCase();
  for (const [name, url] of Object.entries(characterImages)) {
    if (name.toLowerCase() === lowerName) {
      return url;
    }
  }
  
  // Si no encuentra, devolver imagen por defecto
  return DEFAULT_IMAGE;
}

// Función para personajes con nombre y nombre real
export function getCharacterImageFromObject(character: { name: string; real_name?: string }): string {
  // Intentar con el nombre
  let image = getCharacterImage(character.name);
  if (image !== DEFAULT_IMAGE) {
    return image;
  }
  
  // Si no funciona, intentar con el nombre real
  if (character.real_name) {
    image = getCharacterImage(character.real_name);
    if (image !== DEFAULT_IMAGE) {
      return image;
    }
  }
  
  // Si nada funciona, devolver la imagen por defecto
  return DEFAULT_IMAGE;
}
