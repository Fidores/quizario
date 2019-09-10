import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent implements OnInit {

  constructor() { }

  @Input('name') name: string;
  @Input('path') imgPath: string | ArrayBuffer;

  @ViewChild('imgPreview') imgPreview: ElementRef<HTMLImageElement>;
  @ViewChild('imgInput') imgInput: ElementRef<HTMLInputElement>;

  reader: FileReader = new FileReader();

  faFileImage = faFileImage;

  ngOnInit() {
    console.log(this.imgPath);
    this.imgInput.nativeElement.addEventListener('input', $event => this.reader.readAsDataURL(this.imgInput.nativeElement.files[0]));
    this.reader.addEventListener('load', ($event: any) => this.imgPath = $event.target.result);
  }

  get image() {
    return this.imgInput.nativeElement.files[0];
  }

}
