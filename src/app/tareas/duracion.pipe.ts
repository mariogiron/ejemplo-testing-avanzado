import { Pipe, PipeTransform } from '@angular/core';

/** Minutos, escritos como se leen: 90 → «1 h 30 min». */
@Pipe({ name: 'duracion' })
export class DuracionPipe implements PipeTransform {
  transform(minutos: number | null | undefined): string {
    // ✍️ A mano: hoy hace lo mismo que hacía la plantilla. Primero, los tests en rojo;
    // después, el código que los pone en verde.
    return `${minutos} min`;
  }
}
