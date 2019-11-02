import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInputComponent } from './image-input.component';
import { By } from '@angular/platform-browser';

describe('ImageInputComponent', () => {
  let component: ImageInputComponent;
  let fixture: ComponentFixture<ImageInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ImageInputComponent
      ],
      imports: [
        FontAwesomeModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should add event listener to file reader', () => {
      const spy = spyOn(component.reader, 'addEventListener').and.callFake((event$, callback) => null);

      component.ngOnInit();

      expect(component.reader.addEventListener).toHaveBeenCalled();
    });

  });

  describe('writeValue', () => {

    it('should set src attribute of the image element', () => {
      const de = fixture.debugElement.query(By.css('.image-input__image'));
      const el: HTMLImageElement = de.nativeElement;

      component.writeValue('data:image/png;base64,testvalue');

      expect(el.src).toBe('data:image/png;base64,testvalue');
    });

  });

  describe('registerOnChange', () => {

    it('should set change property with function received in the argument', () => {
      const change = () => null;
      
      component.registerOnChange(change);

      expect(component.change).toEqual(change);
    });

  });

  describe('registerOnTouched', () => {

    it('should set touched property with function received in the argument', () => {
      const touched = () => null;
      
      component.registerOnTouched(touched);

      expect(component.touched).toEqual(touched);
    });

  });

  describe('onTouched', () => {

    it('should call touched method', () => {
      component.touched = () => null;
      const spy = spyOn(component, 'touched').and.returnValue(null);

      component.onTouched();

      expect(spy).toHaveBeenCalled();
    });

  });

  describe('removeImage', () => {

    it('should set src of the image element to empty string', () => {
      const de = fixture.debugElement.query(By.css('.image-input__image'));
      const el: HTMLImageElement = de.nativeElement;

      el.setAttribute('src', 'data:image/png;base64,testvalue');
      component.removeImage();
      
      expect(el.src).not.toContain('data:image/png;base64,testvalue');
    });

    it('should remove image input value', () => {
      const de = fixture.debugElement.query(By.css('.image-input__input'));
      const el: HTMLInputElement = de.nativeElement;
      const spy = spyOnProperty(el, 'value', 'set');

      component.removeImage();

      expect(spy).toHaveBeenCalledWith('');
    });

  });

  describe('onChange', () => {

    beforeEach(() => {
      component.change = () => null;
      component.touched = () => null;
    })

    it('should call change method', async () => {
      const spy = spyOn(component, 'onChange').and.returnValue(null);

      await component.onChange(new Event('change'));

      expect(spy).toHaveBeenCalled();
    });

    it('should call touched method', async () => {
      const files = { files: [ new Blob(['']) ] } as unknown as HTMLInputElement;
      component.touched = jasmine.createSpy('touched').and.returnValue(null);
      component.imgInput.nativeElement = files;

      await component.onChange(new Event('change'));

      expect(component.touched).toHaveBeenCalled();
    });

    it('should call readAsDataURL method of the file reader', async () => {
      const files = { files: [ new Blob(['']) ] } as unknown as HTMLInputElement;
      const spy = spyOn(component.reader, 'readAsDataURL').and.returnValue('testvalue');
      component.imgInput.nativeElement = files;

      await component.onChange(new Event('change'));

      expect(spy).toHaveBeenCalledWith(files.files[0]);
    });

  });

});
