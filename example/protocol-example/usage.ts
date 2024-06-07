import {Gentleman} from './gentleman';
import {SwampMan} from './swamp-man';
import {Greetable} from './greetable';

const gentleman = Gentleman.create('Hello');
const newGentleman = Greetable.greet(gentleman, 'unknown human');
console.log(newGentleman);

const swampMan = SwampMan.create('mud');
const newSwampMan = Greetable.greet(swampMan, 'gentleman');
console.log(newSwampMan);

const anyMan: Greetable = swampMan as Greetable;
const newAnyMan = Greetable.greet(anyMan, 'who');
console.log(newAnyMan);
