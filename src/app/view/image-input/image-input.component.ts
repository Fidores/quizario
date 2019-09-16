import { Component, ViewChild, ElementRef, Input, Renderer2, forwardRef, OnInit } from '@angular/core';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageInputComponent),
      multi: true
    }
  ]
})
export class ImageInputComponent implements OnInit, ControlValueAccessor {

  constructor(private readonly renderer: Renderer2) { }

  @Input('name') name: string;
  @ViewChild('imgPreview') imgPreview: ElementRef<HTMLImageElement>;
  @ViewChild('imgInput') imgInput: ElementRef<HTMLInputElement>;

  reader: FileReader = new FileReader();

  faFileImage = faFileImage;

  change;
  touched;

  writeValue(image): void {
    this.renderer.setProperty(this.imgPreview.nativeElement, 'src', image);
  }

  registerOnChange(fn: any): void {
    this.change = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  ngOnInit() {
    this.reader.addEventListener('load', $event => this.renderer.setProperty(this.imgPreview.nativeElement, 'src', this.reader.result));
  }

  async onChange($event) {
    this.change(await this.toBase64(this.imgInput.nativeElement.files[0]));
    this.touched();
    this.reader.readAsDataURL(this.imgInput.nativeElement.files[0]);
  }

  onTouched() {
    this.touched();
  }

  get value() {
    return this.imgInput.nativeElement.files[0];
  }

  toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

}
