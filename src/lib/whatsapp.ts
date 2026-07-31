/**
 * URL de wa.me con mensaje prellenado. El asesor sabe de qué propiedad
 * le hablan sin preguntar.
 */
export function whatsappUrl(numero: string, titulo?: string, urlFicha?: string): string {
  // El número debe venir en E.164 sin signos (5214611234567); se limpia por si acaso.
  const limpio = numero.replace(/[^0-9]/g, '');
  if (!titulo) {
    return `https://wa.me/${limpio}?text=${encodeURIComponent('Hola, me gustaría más información')}`;
  }
  const texto = `Hola, me interesa ${titulo}${urlFicha ? ` — ${urlFicha}` : ''}`;
  return `https://wa.me/${limpio}?text=${encodeURIComponent(texto)}`;
}
