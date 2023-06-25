import {Enumerable} from './enumerable';
import {ExList} from './ex-list';
import {ExMap} from './ex-map';

const numList = ExList.create([1, 2]);
const arrayFromList = Enumerable.toArray(numList);
console.log(arrayFromList);

const numMap = ExMap.create([
  ['a', 1],
  ['b', 2],
]);
const arrayFromMap = Enumerable.toArray<[string, number]>(numMap);
console.log(arrayFromMap);
