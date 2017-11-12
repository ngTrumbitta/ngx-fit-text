/** @format */

// Ported from https://github.com/patrickmarabeas/ng-FitText.js/blob/master/src/ng-FitText.js

import {
  AfterViewInit,
  Directive,
  Renderer2,
  ElementRef,
  Input,
  HostListener,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[ngxFitText]',
})
export class NgxFitTextDirective implements AfterViewInit, OnInit {
  @Input() ngxFitText? = 1; // compressor
  @Input() ngxFitTextMin?: number | 'inherit' = 0;
  @Input() ngxFitTextMax?: number | 'inherit' = Number.POSITIVE_INFINITY;
  @Input() ngxFitTextDelay? = 100;

  private parent: HTMLElement;
  private element: HTMLElement;
  private computed: CSSStyleDeclaration;
  private newlines: number;
  private minFontSize: number;
  private maxFontSize: number;
  private lineHeight: string;
  private display: string;
  private calcSize = 10;
  private resizeTimeout: number;

  constructor(private renderer2: Renderer2, private elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
    this.parent = this.element.parentElement;

    this.computed = window.getComputedStyle(this.element);
    this.newlines =
      this.element.childElementCount > 0 ? this.element.childElementCount : 1;
    this.lineHeight = this.computed['line-height'];
    this.display = this.computed['display'];
  }

  @HostListener('window:resize')
  onWindowResize() {
    // debounce resize, wait for resize to finish before doing stuff
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(
      (() => {
        this.resize();
      }).bind(this),
      this.ngxFitTextDelay
    );
  }

  ngOnInit() {
    this.minFontSize =
    this.ngxFitTextMin === 'inherit'
      ? this.computed['font-size']
      : this.ngxFitTextMin;

    this.maxFontSize =
    this.ngxFitTextMax === 'inherit'
      ? this.computed['font-size']
      : this.ngxFitTextMax;
  }

  ngAfterViewInit() {
    this.resize();
  }

  private resize() {
    // Don't calculate for elements with no width or height
    if (this.element.offsetHeight * this.element.offsetWidth !== 0) {
      // Set standard values for calculation
      this.setStyle('fontSize', this.calcSize + 'px');
      this.setStyle('lineHeight', '1');
      this.setStyle('display', 'inline-block');

      // Set usage values
      this.setStyle('fontSize', this.calculate() + 'px');
      this.setStyle('lineHeight', this.lineHeight);
      this.setStyle('display', this.display);
    }
  }

  private calculate() {
    const ratio =
      (this.calcSize * this.newlines) / this.element.offsetWidth / this.newlines;

    return Math.max(
      Math.min(
        (this.parent.offsetWidth -
          (parseFloat(getComputedStyle(this.parent).paddingLeft) +
            parseFloat(getComputedStyle(this.parent).paddingRight)) -
          6) *
          ratio *
          this.ngxFitText,
        this.maxFontSize
      ),
      this.minFontSize
    );
  }

  private setStyle(property: string, value: string) {
    this.renderer2.setStyle(this.element, property, value);
  }
}
