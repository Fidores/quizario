import { Component, ViewChild, ElementRef, Input, Renderer2, forwardRef, OnInit } from '@angular/core';
import { faFileImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fileToBase64 } from 'src/app/helpers/fileToBase64';

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
  @ViewChild('imgPreview', { static: true }) imgPreview: ElementRef<HTMLImageElement>;
  @ViewChild('imgInput', { static: true }) imgInput: ElementRef<HTMLInputElement>;

  reader: FileReader = new FileReader();

  faFileImage = faFileImage;
  faTrash = faTrash;

  change: Function;
  touched: Function;

  writeValue(image: string): void {
    this.renderer.setProperty(this.imgPreview.nativeElement, 'src', image);
  }

  registerOnChange(fn: any): void {
    this.change = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  onTouched() {
    this.touched();
  }

  removeImage() {
    this.imgInput.nativeElement.value = '';   
    this.renderer.setProperty(this.imgPreview.nativeElement, 'src', '');
  }

  ngOnInit() {
    this.reader.addEventListener('load', $event => this.renderer.setProperty(this.imgPreview.nativeElement, 'src', this.reader.result));
  }

  async onChange($event) {
    this.change(await fileToBase64(this.value));
    this.touched();
    this.reader.readAsDataURL(this.value);
  }

  get value(): File {
    return this.imgInput.nativeElement.files[0];
  }

  get hasValue(): boolean {
    return !!this.imgPreview.nativeElement.getAttribute('src');
  }

}
