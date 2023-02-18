export default class Section {
  constructor({ items , renderer }, containerSelector) {
    this.items  = items ;
    this._renderer = renderer;
    this._container = containerSelector;

    // Отрисовка секции
    this.addItems(items);
  }

  addItems(cards) {
    cards.forEach((item) => {
      const element = this._renderer(item);
      this._container.append(element);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
