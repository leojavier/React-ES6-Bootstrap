const calc = require('./basicComponent')

test('should the result of adding two numbers', () => {
  expect(calc.add(2,3)).toBe(5)

});
test('should return the result of a division', () => {
  expect(calc.divide(3,3)).toBe(1)
});
 