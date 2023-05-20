import {ExampleModule} from './modules/example-module';
import {OneOfExStruct} from './modules/one-of-ex-struct';
import {OneOfExStruct2} from './modules/one-of-ex-struct2';
import {Saiable, Say} from './protocols/say';

console.log(ExampleModule.greet('Me'));

const cat = OneOfExStruct.create('souseki');
console.log(Say.of(cat).say(cat));

const dog = OneOfExStruct2.create('Wan');
console.log(Say.of(dog).say(dog));

const dogOrCat: Saiable = cat;
console.log(Say.of(dogOrCat).say(dogOrCat));
