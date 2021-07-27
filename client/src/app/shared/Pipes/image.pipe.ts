import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  imgSrc = 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg';

  transform(image: any): string {

    if (image && (image.includes('http') || image.includes('https'))) {
      return image;
    } else if (image && image !== '') {
      return environment.api_url +"/"+ image;
    }
      return this.imgSrc;
    }
  }


