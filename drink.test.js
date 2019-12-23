const Drink = require('./drink.js');

describe('#find', () => {
  test('finds drink by name', () => {
    expect(Drink.find('Caipirinha')).toBeTruthy();
  });

  test('finds drink by lowercase name', () => {
    expect(Drink.find('caipirinha')).toBeTruthy();
  });
});

describe('#description', () => {
  const drink = new Drink('Caipirinha', ['cachaça', 'açúcar', 'limão']);

  test('return list of ingredients', () => {
    expect(drink.description).toMatch(/cachaça, açúcar e limão/);
  });
});

describe('#nameWith', () => {
  const drinkF = new Drink('Cerveja', ['cerveja'], true);
  const drinkM = new Drink('Vinho', ['vinho'], false);

  describe('#nameWithDefinite', () => {
    test('return a for feminine', () => {
      expect(drinkF.nameWithDefinite).toMatch(/a cerveja/i);
    });

    test('return o for masculine', () => {
      expect(drinkM.nameWithDefinite).toMatch(/o vinho/i);
    });
  });

  describe('#nameWithIndefinite', () => {
    test('return uma for feminine', () => {
      expect(drinkF.nameWithIndefinite).toMatch(/uma cerveja/i);
    });

    test('return um for masculine', () => {
      expect(drinkM.nameWithIndefinite).toMatch(/um vinho/i);
    });
  });
});
