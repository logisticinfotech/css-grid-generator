import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  mainDiv: HTMLElement;
  htmlContainer: HTMLElement;

  constructor() { }

  ngOnInit() {
    $('#myModal').on('show.bs.modal', () => {
      this.mainDiv = document.getElementById('mainDiv');
      this.htmlContainer = document.getElementById('htmlContainer');
      // this.generateHTML();
      this.generateCSS();
    });

    $('#myModal').on('hide.bs.modal', () => {
      this.htmlContainer.innerHTML = '';
    });
  }




  generateCSS() {
    // console.log('generateCSS method calls');
    this.htmlContainer.innerHTML = '';
    const mainSpan = document.createElement('span');

    const mainDivStyleArray = this.mainDiv.getAttribute('style').split(';');
    mainSpan.appendChild(this.generateCssClass('parent', mainDivStyleArray, true));

    const length = this.mainDiv.childNodes.length;

    for (let i = 0; i < length; i++) {
      const element: any = this.mainDiv.childNodes[i];
      const array = element.getAttribute('style').split('; ');
      mainSpan.appendChild(this.generateCssClass(this.mainDiv.childNodes[i].textContent, array, false));
    }

    this.htmlContainer.appendChild(mainSpan);
  }

  generateCssClass(className, styleArray, isMainDiv) {
    const span = document.createElement('span');
    span.appendChild(this.createSpanForClassName('.' + className));
    span.appendChild(this.createCurlyBracketStart());
    span.appendChild(this.createNewLine());

    for (const style of styleArray) {
      if ((!style.includes('border') && isMainDiv && style.length > 0)
        || (!isMainDiv && style.includes('grid-area'))) {
        const splitValue = style.split(': ');
        span.appendChild(this.createStyleAttributeName(splitValue[0]));
        span.appendChild(this.createStyleAttributeValue(splitValue[1]));
        span.appendChild(this.createNewLine());
      }
    }

    span.appendChild(this.createCurlyBracketEnd());
    span.appendChild(this.createNewLine());
    return span;
  }

  createSpanForClassName(cName) {
    const className = document.createElement('span');
    className.style.color = '#C1FF01';
    className.innerHTML = cName + ' ';
    return className;
  }

  createStyleAttributeName(aName) {
    const attributeName = document.createElement('span');
    attributeName.style.color = '#01BEFF';
    attributeName.style.marginLeft = '30px';
    attributeName.innerHTML = aName + ':';
    return attributeName;
  }

  createStyleAttributeValue(aValue) {
    const attributeValue = document.createElement('span');
    attributeValue.style.color = '#78CEEA';
    attributeValue.innerHTML = ' ' + aValue + ';';
    return attributeValue;
  }

  createCurlyBracketStart() {
    const attributeValue = document.createElement('span');
    attributeValue.style.color = '#78CEEA';
    attributeValue.innerHTML = '{';
    return attributeValue;
  }

  createCurlyBracketEnd() {
    const attributeValue = document.createElement('span');
    attributeValue.style.color = '#78CEEA';
    attributeValue.innerHTML = '}';
    return attributeValue;
  }




  generateHTML() {
    // console.log('generateHTML method calls');
    this.htmlContainer.innerHTML = '';

    const length = this.mainDiv.childNodes.length;

    const mainSpanStart = document.createElement('span');
    mainSpanStart.appendChild(this.createLeftBracket());
    mainSpanStart.appendChild(this.createDiv());
    mainSpanStart.appendChild(this.createClassName('parent'));
    mainSpanStart.appendChild(this.createRightBracket());

    this.htmlContainer.appendChild(mainSpanStart);
    this.htmlContainer.appendChild(this.createNewLine());

    const outerSpan = document.createElement('span');
    for (let i = 0; i < length; i++) {
      const innerSpan = this.generateDIV(this.mainDiv.childNodes[i].textContent);
      outerSpan.appendChild(innerSpan);
      outerSpan.appendChild(this.createNewLine());
    }
    this.htmlContainer.appendChild(outerSpan);

    const mainSpanEnd = document.createElement('span');
    mainSpanEnd.appendChild(this.createLeftBracket());
    mainSpanEnd.appendChild(this.createBackSlash());
    mainSpanEnd.appendChild(this.createDiv());
    mainSpanEnd.appendChild(this.createRightBracket());

    this.htmlContainer.appendChild(mainSpanEnd);
  }

  generateDIV(className) {
    const mainSpan = document.createElement('span');
    mainSpan.style.marginLeft = '30px';

    mainSpan.appendChild(this.createLeftBracket());
    mainSpan.appendChild(this.createDiv());
    mainSpan.appendChild(this.createClassName(className));
    mainSpan.appendChild(this.createRightBracket());

    mainSpan.appendChild(this.createLeftBracket());
    mainSpan.appendChild(this.createBackSlash());
    mainSpan.appendChild(this.createDiv());
    mainSpan.appendChild(this.createRightBracket());

    return mainSpan;
  }

  createLeftBracket() {
    const leftBracket = document.createElement('span');
    leftBracket.style.color = '#717272';
    leftBracket.innerHTML = '&lt;';
    return leftBracket;
  }

  createRightBracket() {
    const rightBracket = document.createElement('span');
    rightBracket.style.color = '#717272';
    rightBracket.innerHTML = '&gt; ';
    return rightBracket;
  }

  createDiv() {
    const divSpan = document.createElement('span');
    divSpan.innerHTML = 'div';
    divSpan.style.color = '#0E86E5';
    return divSpan;
  }

  createBackSlash() {
    const backSlash = document.createElement('span');
    backSlash.innerHTML = '/';
    backSlash.style.color = '#717272';
    return backSlash;
  }

  createClassName(className) {
    const classNameSpan = document.createElement('span');
    classNameSpan.innerHTML = ` class="${className}"`;
    classNameSpan.style.color = '#78CEEA';
    return classNameSpan;
  }

  createNewLine() {
    return document.createElement('br');
  }
}
