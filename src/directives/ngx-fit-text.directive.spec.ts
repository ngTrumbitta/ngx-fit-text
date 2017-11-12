import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NgxFitTextDirective } from './ngx-fit-text.directive';

describe('NgxFitTextDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElements: DebugElement[];
  let bareH1: DebugElement;
  let nativeElement: HTMLElement;

  const mockFontSizeBig = '60px';
  const mockSizeMin = 11;
  const mockSizeMax = 18;
  const mockDelay = 1000;

  @Component({
    template:
      `
      <header style="width: 200px">
        <h1 [ngStyle]="{ 'font-size': fontSize }" [ngxFitText]>Look at how I resize myself</h1>
      </header>

      <header style="width: 200px">
        <h1 [ngStyle]="{ 'font-size': fontSize }" [ngxFitText]="compressor">
          Look at how I resize myself
        </h1>
      </header>

      <header style="width: 2000px">
        <h1
          [ngStyle]="{ 'font-size': fontSize }"
          [ngxFitText]
          [ngxFitTextMin]="minSize"
          [ngxFitTextMax]="maxSize"
        >
          Look at how I resize myself between 11px and 18px
        </h1>
      </header>

      <header style="width: 20px">
        <h1
          [ngStyle]="{ 'font-size': fontSize }"
          [ngxFitText]
          [ngxFitTextMin]="minSize"
          [ngxFitTextMax]="maxSize"
        >
          Look at how I resize myself between 11px and 18px
        </h1>
      </header>

      <header>
        <h1
          [ngxFitText]
          [ngxFitTextDelay]="delay"
        >
          Look at how I resize myself after 1 second
        </h1>
      </header>
      `
  })
  class TestComponent {
    @Input() fontSize: string;
    @Input() compressor: number;
    @Input() minSize: number;
    @Input() maxSize: number;
    @Input() delay: number;
  }

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ NgxFitTextDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    component = fixture.componentInstance;
    component.fontSize = mockFontSizeBig;
    component.compressor = 0.5;
    component.minSize = mockSizeMin;
    component.maxSize = mockSizeMax;
    component.delay = mockDelay;

    fixture.detectChanges();

    // all elements with an attached NgxFitTextDirective
    debugElements = fixture.debugElement.queryAll(By.directive(NgxFitTextDirective));
    bareH1 = fixture.debugElement.query(By.css('h1:not([ngxFitText])'));
  });

  it('should have four elements with the directive', () => {
    expect(debugElements.length).toBe(5);
  });

  it('should change the font-size of the element to accomodate the parent\'s width', () => {
    nativeElement = debugElements[0].nativeElement;
    const fontSize = window.getComputedStyle(nativeElement).fontSize;

    expect(parseInt(fontSize.split('px')[0], 10)).toBeLessThan(parseInt(mockFontSizeBig.split('px')[0], 10));
  });

  it('should diminish the font-size of the element according to the compressor', () => {
    nativeElement = debugElements[0].nativeElement;
    const nativeElementWithCompressor = debugElements[1].nativeElement;

    const fontSize = window.getComputedStyle(nativeElement).fontSize;
    const fontSizeWithCompressor = window.getComputedStyle(nativeElementWithCompressor).fontSize;

    expect(parseInt(fontSizeWithCompressor.split('px')[0], 10)).toBeLessThanOrEqual(parseInt(fontSize.split('px')[0], 10) / 2);
  });

  it('should respect the minimum and maximum size inputs', () => {
    const nativeElementWide = debugElements[2].nativeElement;
    const nativeElementNarrow = debugElements[3].nativeElement;

    const fontSizeWide = window.getComputedStyle(nativeElementWide).fontSize;
    const fontSizeNarrow = window.getComputedStyle(nativeElementNarrow).fontSize;

    expect(parseInt(fontSizeWide.split('px')[0], 10)).toEqual(mockSizeMax);
    expect(parseInt(fontSizeNarrow.split('px')[0], 10)).toEqual(mockSizeMin);
  });

  it('should change the font-size on window resize after a delay', () => {
    // Help wanted!
  });
});
