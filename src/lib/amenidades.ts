/**
 * Las amenidades en Directus son texto libre (tags). Aquí se mapea
 * cada texto a un icono del sistema por palabras clave; lo que no
 * coincida cae en un check genérico.
 */

const REGLAS: [RegExp, string][] = [
  [/alberca|piscina|pool/, 'alberca'],
  [/jard|arbol|área verde|area verde|parque/, 'jardin'],
  [/segur|vigilan|caseta|privada|circuito/, 'seguridad'],
  [/gym|gimnasio/, 'gym'],
  [/mascota|pet /, 'mascotas'],
  [/amueblad|mueble/, 'amueblado'],
  [/terraza|roof|asador|balc/, 'terraza'],
  [/bodega/, 'bodega'],
  [/cocina/, 'cocina'],
  [/club|salón|salon|evento/, 'club'],
  [/wifi|internet|fibra/, 'wifi'],
];

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

export function iconoAmenidad(amenidad: string): string {
  const n = normalizar(amenidad);
  for (const [regla, icono] of REGLAS) {
    if (regla.test(n)) return icono;
  }
  return 'check';
}
