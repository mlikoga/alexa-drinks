module.exports = class Drink {
  constructor(name, ingredients, isFeminine = true) {
      this.name = name;
      this.ingredients = ingredients;
      this.isFeminine = isFeminine;
  }

  get description() {
      return this.ingredients
                      .join(', ')
                      .replace(/, ([^,]*)$/, ' e $1');
  }

  get definiteArticle() {
      return this.isFeminine ? 'a' : 'o';
  }

  get indefiniteArticle() {
      return this.isFeminine ? 'uma' : 'um';
  }

  get nameWithDefinite() {
      return `${this.definiteArticle} ${this.name}`;
  }

  get nameWithIndefinite() {
      return `${this.indefiniteArticle} ${this.name}`;
  }

  static all() {
      return [
          new Drink('Caipirinha', ['cachaça', 'açúcar', 'limão']),
          new Drink('Cuba libre', ['rum', 'refrigerante de cola', 'uma fatia de limão']),
          new Drink('Dry Martini', ['gin', 'vermute seco'], false),
          new Drink('Margarita', ['tequila', 'licor de laranja', 'suco de limão', 'sal']),
          new Drink('Mojito', ['rum branco', 'limão', 'açúcar', 'hortelã', 'água com gás'], false),
          new Drink('Piña Colada', ['rum ou vodka', 'leite de coco', 'suco de abacaxi', 'leite condensado'], false),
      ];
  }

  static find(name) {
      if (!name)
          return null;

      return Drink.all().find(drink => {
          return drink.name.toLowerCase().includes(name.toLowerCase()) ||
              name.toLowerCase().includes(drink.name.toLowerCase())
          }
      );
  }
}
