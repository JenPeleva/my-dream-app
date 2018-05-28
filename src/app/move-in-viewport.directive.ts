import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { Inject } from '@angular/core';
import { WindowRefService } from './window-ref.service';

@Directive({
  selector: '[appMoveInViewport]',
  exportAs: 'appMoveInViewport'
})
export class MoveInViewportDirective implements AfterViewInit{
  element: ElementRef;
  elementBoundaries: any;
  parentBoundaries: any;
  isOutsideLeft: boolean;
  isOutsideRight: boolean;
  isOutsideBottom: boolean;
  isOutsideTop: boolean;
  topSpaceAvailable: number;
  leftSpaceAvailable: number
  rightSpaceAvailable: number;
  bottomAvailable: number;

  get isLeftAligned(): boolean {
    return this.element.nativeElement.offsetLeft === 0;
  }

  constructor(private window: WindowRefService, element: ElementRef) {
    this.element = element;
   }

   ngAfterViewInit() {
      const vheight = this.window.nativeWindow.document.documentElement.clientHeight;
      const vwidth = this.window.nativeWindow.document.documentElement.clientWidth;
      this.elementBoundaries = this.element.nativeElement.getBoundingClientRect();
      this.parentBoundaries = this.element.nativeElement.offsetParent.getBoundingClientRect();

      this.checkIfInboundaries(vheight, vwidth);

      if (this.isOutsideLeft || this.isOutsideRight || this.isOutsideBottom || this.isOutsideTop) {
        this.checkAvailableSpacearound(vheight, vwidth);

        const requiredLeftorRightSpace = this.elementBoundaries.width - this.parentBoundaries.width;

        if (this.isOutsideLeft) {
          this.setLeftOrRightPosition(this.rightSpaceAvailable, requiredLeftorRightSpace, '0');
        }

        if (this.isOutsideRight) {
          this.setLeftOrRightPosition(this.leftSpaceAvailable, requiredLeftorRightSpace, 'auto', '0');
        }

        if (this.isOutsideBottom) {
          const requiredTopSpace = this.elementBoundaries.bottom - vheight;
          const topPosition = vheight - this.elementBoundaries.bottom + this.parentBoundaries.height + 'px';
          this.setTopOrBottomPosition(this.topSpaceAvailable, requiredTopSpace, topPosition);
        }

        if (this.isOutsideTop) {
          const requiredBottomSpace = Math.abs(this.elementBoundaries.top);
          this.setTopOrBottomPosition(this.bottomAvailable, requiredBottomSpace, '0');
        }
      }
   }

   checkIfInboundaries(vheight: number, vwidth: number): void {
    this.isOutsideBottom = this.elementBoundaries.bottom > vheight;
    this.isOutsideTop = this.elementBoundaries.top < 0;
    this.isOutsideLeft = this.elementBoundaries.left < 0;
    this.isOutsideRight = this.elementBoundaries.right > vwidth;
  }

  checkAvailableSpacearound(vheight: number, vwidth: number) {
    this.bottomAvailable = vheight - this.parentBoundaries.bottom;
    this.topSpaceAvailable = this.parentBoundaries.top ;
    this.leftSpaceAvailable = this.parentBoundaries.left;
    this.rightSpaceAvailable = vwidth - this.parentBoundaries.right;
  }

  setLeftOrRightPosition(availableSpace: number, requiredSpace: number, leftPosition?: string, rightPosition?: string) {
    if (availableSpace > requiredSpace) {
      if (leftPosition) {
        this.element.nativeElement.style.left = leftPosition;
      }
      if (rightPosition) {
        this.element.nativeElement.style.right = rightPosition;
      }
    } else {
      this.fallbackLeft();
    }
  }

  setTopOrBottomPosition(availableSpace: number, requiredSpace: number, topPosition: string) {
    if (availableSpace > requiredSpace) {
      this.element.nativeElement.style.top = topPosition;
      
      if (this.isLeftAligned) {
        if (this.rightSpaceAvailable > this.elementBoundaries.width) {
          this.element.nativeElement.style.left = this.parentBoundaries.width + 'px';
          this.element.nativeElement.style.right = 'auto';
        } else {
          this.element.nativeElement.style.right = this.parentBoundaries.width + 'px';
          this.element.nativeElement.style.left = 'auto';
        }
      } else {
        if (this.leftSpaceAvailable > this.elementBoundaries.width) {
          this.element.nativeElement.style.right = this.parentBoundaries.width + 'px';
          this.element.nativeElement.style.left = 'auto';
        }
        else if (this.rightSpaceAvailable > this.elementBoundaries.width) {
          this.element.nativeElement.style.left = this.parentBoundaries.width + 'px';
          this.element.nativeElement.style.right = 'auto';
        } else {
          this.fallbackLeft();
        }
        
      }
    } else {
      this.fallbackTop();
    }
  }

  fallbackLeft() {
    //position left: 0 of viewport, relative to parent
    const offsetLeft = this.element.nativeElement.offsetLeft;
    const parentLeft = this.parentBoundaries.left;
    this.element.nativeElement.style.left = -(offsetLeft + parentLeft) + 'px';
  }

  fallbackTop() {
    //position top: 0 of viewport, relative to parent
    const parentTop = this.parentBoundaries.top;
    const offsetTop = this.element.nativeElement.offsetTop;
    this.element.nativeElement.style.top = -(parentTop + offsetTop) + 'px';
  }

}
