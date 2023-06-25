import {Gentleman} from './gentleman';
import {SwampMan} from './swamp-man';
import {Say} from './say';

const gentleman = Gentleman.create('Hello');
const newGentleman = Say.greet(gentleman, 'unknown human');
console.log(newGentleman);

const swampMan = SwampMan.create('mud');
const newSwampMan = Say.greet(swampMan, 'gentleman');
console.log(newSwampMan);

const anyMan: Say = swampMan as Say;
const newAnyMan = Say.greet(anyMan, 'who');
console.log(newAnyMan);
