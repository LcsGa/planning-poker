import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "svgMask",
})
export class SvgMaskPipe implements PipeTransform {
  transform(svgPath: string): string {
    return `url(${svgPath}) no-repeat center / contain`;
  }
}
