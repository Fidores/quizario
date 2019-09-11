import { Component, ViewChild, ElementRef, Input, Renderer2, forwardRef, OnInit } from '@angular/core';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

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

  writeValue(obj: string): void {
    this.renderer.setProperty(this.imgPreview.nativeElement, 'src', environment.backend + obj);
  }

  registerOnChange(fn: any): void {
    this.change = fn;
  }

  registerOnTouched(fn: any): void {}

  ngOnInit() {
    this.reader.addEventListener('load', ($event: any) => this.renderer.setProperty(this.imgPreview.nativeElement, 'src', $event.target.result));
  }

  onChange($event) {
    this.change(this.value);
    this.reader.readAsDataURL(this.value);
  }

  get value() {
    return this.imgInput.nativeElement.files[0];
  }

}
