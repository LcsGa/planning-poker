import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePath',
})
export class ImagePathPipe implements PipeTransform {
  transform(name: string | undefined, path: string, extension: string): string {
    return `${path.replace(/^\/|\/$/g, '')}/${name ?? ''}.${extension}`;
  }
}
