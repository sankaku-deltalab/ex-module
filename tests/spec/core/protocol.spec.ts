import {Gentleman} from './protocol-examples/gentleman';
import {SwampMan} from './protocol-examples/swamp-man';
import {Say} from './protocol-examples/say';

describe('ExProtocol', () => {
  test('can call implemented function 1', () => {
    const struct = Gentleman.create('hello');
    const [r, newStruct] = Say.greet(struct, 'chaplin');

    expect(r).toBe('hello, Sir chaplin.');
    expect(newStruct).toEqual({
      __exStruct__: Gentleman.__exModule__,
      greet: 'hello',
    });
  });

  test('can call implemented function 2', () => {
    const struct = SwampMan.create('mud');
    const [r, newStruct] = Say.greet(struct, 'chaplin');

    expect(r).toBe('Hello chaplin. Im mud.');
    expect(newStruct).toEqual({
      __exStruct__: SwampMan.__exModule__,
      name: 'chaplin',
    });
  });
});
