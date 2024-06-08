import {Gentleman} from './protocol-examples/gentleman';
import {SwampMan} from './protocol-examples/swamp-man';
import {Sayable} from './protocol-examples/sayable';

describe('ExProtocol', () => {
  test('can call implemented function 1', () => {
    const struct = Gentleman.create('id0', 'hello');
    const [r, newStruct] = Sayable.greet(struct, 'chaplin');

    expect(r).toBe('hello, Sir chaplin.');
    expect(newStruct).toEqual({
      __exStruct__: Gentleman.__exModule__,
      id: 'id0',
      greet: 'hello',
    });
  });

  test('can call implemented function 2', () => {
    const struct = SwampMan.create('id0', 1, 'mud');
    const [r, newStruct] = Sayable.greet(struct, 'chaplin');

    expect(r).toBe('Hello chaplin. Im mud.');
    expect(newStruct).toEqual({
      __exStruct__: SwampMan.__exModule__,
      originalId: 'id0',
      copiedCount: 2,
      name: 'chaplin',
    });
  });
});
