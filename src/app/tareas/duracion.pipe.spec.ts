import { DuracionPipe } from './duracion.pipe';

describe('DuracionPipe', () => {
  const pipe = new DuracionPipe();

  it.each([
    [45, '45 min'],
    [0, '0 min'],
    [60, '1 h'],
    [90, '1 h 30 min'],
    [125, '2 h 5 min'],
  ])('%i minutos se escriben «%s»', (minutos, texto) => {
    expect(pipe.transform(minutos)).toBe(texto);
  });

  it.each([[-5], [Number.NaN], [null], [undefined]])('con %p escribe una raya', (valor) => {
    expect(pipe.transform(valor)).toBe('—');
  });
});
