import { Component, OnInit } from '@angular/core';

declare var window;

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent implements OnInit {

  mainDiv: HTMLElement;

  dataContaier: HTMLElement;
  contentContainer: HTMLElement;
  divPropertyContainer: HTMLElement;

  row = 'repeat(3 , 1fr)';
  column = 'repeat(3 , 1fr)';
  templateArea = '';

  INPUT_AREA_NAME = 'Area Name';
  INPUT_GRID_TEMPLATE_COLUMN = 'gridTempleteColumns';
  INPUT_GRID_TEMPLATE_ROW = 'gridTempleteRows';
  INPUT_GRID_TEMPLATE_AREAS = 'gridTempleteAreas';

  selectedDiv: HTMLElement;

  counterOfAddedDiv = 0;

  rows = 5;
  columns = 5;
  templateAreaArray = [];

  constructor(
  ) { }

  ngOnInit() {
    this.dataContaier = document.getElementById('data-container');
    this.contentContainer = document.getElementById('content-container');
    this.divPropertyContainer = document.getElementById('divProperty');

    this.generateMainDiv();
    this.setTemplateAreaInArray();
    this.calculateRowsAndColumns();
  }

  generateMainDiv() {
    // console.log('generateMainDiv method calls');
    const div = document.createElement('div');
    div.id = 'mainDiv';
    div.style.height = '100%';
    div.style.border = '1px solid ' + this.getRandomColor();
    div.style.position = 'relative';
    div.style.display = 'grid';
    div.style.gridTemplateColumns = this.column;
    div.style.gridTemplateRows = this.row;
    div.style.gridTemplateAreas = this.templateArea;
    this.mainDiv = div;

    this.contentContainer.appendChild(div);
  }

  calculateRowsAndColumns() {
    // console.log('calculateRowsAndColumns method calls');
    const styles = window.getComputedStyle(this.mainDiv);
    const rowValue = styles.getPropertyValue('grid-template-rows');
    const colValue = styles.getPropertyValue('grid-template-columns');

    let rowVal = 0;
    for (const val of rowValue.split(' ')) {
      const newVal = Number(val.substring(0, val.length - 2));
      if (newVal >= 1) {
        rowVal++;
      }
    }
    this.rows = rowVal + 1;

    let colVal = 0;
    for (const val of colValue.split(' ')) {
      const newVal = Number(val.substring(0, val.length - 2));
      if (newVal >= 1) {
        colVal++;
      }
    }
    this.columns = colVal + 1;

    this.setTemplateAreaInArray();
  }

  addDiv() {
    // console.log('addDiv method calls');
    this.counterOfAddedDiv++;

    const div = document.createElement('div');
    div.className = 'div' + this.counterOfAddedDiv;
    div.id = 'div' + this.counterOfAddedDiv;
    div.style.border = '1px solid ' + this.getRandomColor();
    div.style.gridArea = 'div' + this.counterOfAddedDiv;
    div.textContent = 'div' + this.counterOfAddedDiv;
    div.style.position = 'absolute';

    if (this.counterOfAddedDiv <= ((this.rows - 1) * (this.columns - 1))
      || this.templateArea.includes('.')) {
      div.style.height = '100%';
      div.style.width = '100%';
    }

    div.addEventListener('click', (e) => this.setSelectedDiv(e), false);

    // SET DIV IN MAIN DIV GRID
    this.setDivInMainDiv('div' + this.counterOfAddedDiv);

    // GENERATE COLLAPS MENU
    this.collapsMenu();

    this.mainDiv.appendChild(div);
  }

  setDivInMainDiv(divID) {
    // console.log('setDivInMainDiv method calls');
    let i = 0;
    loop1:
    for (const rows of this.templateAreaArray) {
      i++;
      let j = 0;
      for (const col of rows) {
        j++;
        if (col === '.') {
          const element: any = document.getElementById('ColRow-' + j + '-' + i);
          // console.log('ELEMEN T === >>>', element, i, j);
          element.value = divID;
          this.setTemplateAreaInArray();
          break loop1;
        }
      }
    }
  }

  setSelectedDiv(e) {
    // console.log('setSelectedDiv method calls');
    for (let i = 1; i < this.counterOfAddedDiv + 1; i++) {
      const element = document.getElementById('div' + i);
      if (element) {
        element.style.backgroundImage = 'none';
      }
    }

    const divID = e.target.id;
    const div = document.getElementById(divID);
    div.style.backgroundImage = 'url(assets/images/lines_transperant.png)';
    this.selectedDiv = div;
  }

  removeSelectedDiv() {
    // console.log('removeSelectedDiv method calls', this.selectedDiv.innerText);
    const divValue = this.selectedDiv.innerText;

    this.setTemplateAreaInArray(divValue);
    this.mainDiv.removeChild(this.selectedDiv);

    const cardId = divValue.replace('div', '');
    const card = document.getElementById('card' + cardId);
    this.divPropertyContainer.removeChild(card);

    this.selectedDiv = null;

    if (this.divPropertyContainer.querySelectorAll('div').length === 0) {
      this.counterOfAddedDiv = 0;
    }
  }

  changeMainDivGridRows(e) {
    // console.log('changeMainDivGridRows method calls');
    this.row = e.target.value;
    this.mainDiv.style.gridTemplateRows = this.row;

    this.calculateRowsAndColumns();
  }

  changeMainDivGridColumn(e) {
    // console.log('changeMainDivGridColumn method calls');
    this.column = e.target.value;
    this.mainDiv.style.gridTemplateColumns = this.column;

    this.calculateRowsAndColumns();
  }

  changeMainDivTemplateAreas(event) {
    // console.log('changeTemplateArea method calls');
    this.setTemplateAreaInArray();
  }

  setTemplateAreaInArray(inputValue = '') {
    // console.log('getTemplateAreaString method calls');
    const mainArray = [];
    let sb = '';
    for (let i = 0; i < this.rows; i++) {
      if (i === 0) { continue; }
      const innerArray = [];
      sb = sb + '"';
      for (let j = 0; j < this.columns; j++) {
        if (j === 0) { continue; }
        const element: any = document.getElementById('ColRow-' + j + '-' + i);
        if (element && element.value === inputValue && inputValue) {
          element.value = '';
        }

        if (element && element.value) {
          innerArray.push(element.value);
          sb = sb + (element.value + ' ');
        } else {
          innerArray.push('.');
          sb = sb + ('. ');
        }
      }
      mainArray.push(innerArray);
      sb = sb + ('"');
    }
    this.templateAreaArray = mainArray;
    this.templateArea = sb;
    this.mainDiv.style.gridTemplateAreas = this.templateArea;
    // console.log('aRRAY ==>> ', sb, this.templateAreaArray);
  }

  changeAreaTextInput(e) {
    // console.log('changeAreaTextInput method calls');
    const value = e.target.value;
    const splitValue = (e.target.id).split('-');
    const divID = splitValue[0];
    const buttonID = splitValue[1];

    const div = document.getElementById(divID);
    div.textContent = value ? value : divID;
    div.style.gridArea = value ? value : divID;

    const button = document.getElementById(buttonID);
    button.textContent = value ? value : divID;
  }

  changeGridTemplateAreasInput(e) {
    // console.log('changeGridTemplateAreasInput method calls');
    const value = e.target.value;
    const splitValue = (e.target.id).split('-');
    const divID = splitValue[0];

    const div = document.getElementById(divID);
    div.style.gridTemplateAreas = value;
  }

  collapsMenu() {
    // console.log('collapsMenu method calls');
    const cardDIV = document.createElement('div');
    cardDIV.id = 'card' + this.counterOfAddedDiv;
    cardDIV.style.width = '85%';
    cardDIV.style.margin = '0 auto';
    cardDIV.style.marginTop = '10px';
    cardDIV.className = 'card';

    const button = document.createElement('button');
    button.id = 'button' + this.counterOfAddedDiv;
    button.className = 'card-header';
    button.textContent = 'div' + this.counterOfAddedDiv;
    button.setAttribute('data-toggle', 'collapse');
    button.setAttribute('data-target', '#collapse' + this.counterOfAddedDiv);
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-controls', 'collapse' + this.counterOfAddedDiv);
    button.addEventListener('focus', () => {
      button.style.outline = 'none';
    });

    cardDIV.appendChild(button);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // AREA NAME
    const areaNameLabel = this.generateLabel(this.INPUT_AREA_NAME);
    cardBody.appendChild(areaNameLabel);

    const areaNameInput = this.generateInput();
    cardBody.appendChild(areaNameInput);

    const cardContentDIV = document.createElement('div');
    cardContentDIV.className = 'collapse';
    cardContentDIV.id = 'collapse' + this.counterOfAddedDiv;
    cardContentDIV.setAttribute('data-parent', '#divProperty');
    cardContentDIV.appendChild(cardBody);

    cardDIV.appendChild(cardContentDIV);

    // CLOSE BUTTON
    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn btn-outline-danger';
    closeBtn.id = 'div' + this.counterOfAddedDiv + '-card' + this.counterOfAddedDiv;
    closeBtn.style.borderRadius = '50%';
    closeBtn.style.position = 'absolute';
    closeBtn.style.right = '5px';
    closeBtn.style.padding = '0px 8px 2px';
    closeBtn.style.top = '12px';

    const span = document.createElement('span');
    span.innerHTML = '&times;';
    span.id = 'div' + this.counterOfAddedDiv + '-card' + this.counterOfAddedDiv;
    closeBtn.appendChild(span);

    closeBtn.addEventListener('click', (e: any) => {
      const element = e.target;

      const inputValue =
        (e.target.nodeName) === 'BUTTON' ?
          e.target.parentNode.childNodes[0].childNodes[0].nodeValue :
          e.target.parentNode.parentNode.childNodes[0].childNodes[0].nodeValue;

      this.setTemplateAreaInArray(inputValue);

      if (element.id) {
        this.removeDivFromCard(element.id);
      }
    }, false);

    cardDIV.appendChild(closeBtn);

    this.divPropertyContainer.appendChild(cardDIV);
  }

  generateLabel(labelName) {
    // console.log('generateLabel method calls');
    const areaNameLabel = document.createElement('label');
    areaNameLabel.textContent = labelName;
    areaNameLabel.style.fontSize = '14px';
    areaNameLabel.style.fontWeight = '500';
    areaNameLabel.style.margin = '8px 0px 2px 0px';

    return areaNameLabel;
  }

  generateInput() {
    // console.log('generateInput method calls');
    const inputText = document.createElement('input');
    inputText.id = 'div' + this.counterOfAddedDiv + '-button' + this.counterOfAddedDiv;
    inputText.type = 'text';
    inputText.style.textAlign = 'center';
    inputText.className = 'form-control';

    inputText.addEventListener('input', (e) => this.changeAreaTextInput(e), false);

    return inputText;
  }

  removeDivFromCard(id) {
    // console.log('removeDivFromCard method calls');
    const splitVal = (id).split('-');
    const div = document.getElementById(splitVal[0]);
    const card = document.getElementById(splitVal[1]);

    this.mainDiv.removeChild(div);
    this.divPropertyContainer.removeChild(card);

    if (this.divPropertyContainer.querySelectorAll('div').length === 0) {
      this.counterOfAddedDiv = 0;
    }
  }

  getRandomColor() {
    // console.log('getRandomColor method calls');
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getArray(i: number) {
    return new Array(i);
  }

  generateHtmlCss() {
    // console.log('generateHtmlCss method calls');
    // console.log('MAIN DIV ==>> ', this.mainDiv.childNodes.length);
  }
}
