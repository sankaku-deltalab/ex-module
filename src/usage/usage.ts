import {OneOfExStruct} from './one-of-ex-struct';
import {OneOfExStruct2} from './one-of-ex-struct2';
import {Say} from './say';

const cat = OneOfExStruct.create('souseki');
Say.of(cat).say(cat);

const dog = OneOfExStruct2.create('Wan');
Say.of(dog).say(dog);

const dogOrCat: OneOfExStruct.T | OneOfExStruct2.T = cat;
Say.of(dogOrCat).say(dogOrCat);
