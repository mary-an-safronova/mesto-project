export default class Section {
  constructor({ items , renderer }, container) {
    this.items  = items ;
    this._renderer = renderer;
    this._container = container;

    // Отрисовка секции
    this.addItems(items);
  }

  addItems(cards) {
    cards.forEach(
      (item) => {
        const element = this._renderer(item);
        this._container.append(element);
      }
    );
  }

  addItem(item) {
    const element = this._renderer(item);
    this._container.prepend(element);
  }
}
