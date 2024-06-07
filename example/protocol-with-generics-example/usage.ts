import {ExEnumerable} from './ex-enumerable';
import {ExList} from './ex-list';
import {ExMap} from './ex-map';

const numList = ExList.create([1, 2]);
const arrayFromList = ExEnumerable.toArray(numList);
console.log(arrayFromList);

const numMap = ExMap.create([
  ['a', 1],
  ['b', 2],
]);
const arrayFromMap = ExEnumerable.toArray<[string, number]>(numMap);
console.log(arrayFromMap);
