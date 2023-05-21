import {Gentleman} from './modules/gentleman';
import {SwampMan} from './modules/swamp-man';
import {Say} from './protocols/say';

const gentleman = Gentleman.create('Hello');
const newGentleman = Say.greet(gentleman, 'unknown human');

const swampMan = SwampMan.create('mud');
const newSwampMan = Say.greet(swampMan, 'gentleman');

const anyMan: Say.T = swampMan as Say.T;
const newAnyMan = Say.greet(anyMan, 'who');
