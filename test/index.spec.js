import Formaggino from '../src';

let library;

// Replace with actual tests
describe('Library.src.js', () => {
  beforeEach(() => library = new Formaggino());

  it('should get the library\'s version', () => {
    expect(library.version).toEqual('1.0.0');
  });

  it('should get the library\'s name', () => {
    const spy = jest.spyOn(library, 'name');
    const name = library.name();

    expect(name).toEqual('Formaggino');

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
