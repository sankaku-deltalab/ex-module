import {ExEnumerable} from './ex-enumerable';
import {ExList} from './ex-list';
import {ExMap} from './ex-map';

const list1 = ExList.create([1, 2, 3]);
const map1 = ExMap.create({a: 1, b: 2, c: 3});

const fnList1 = (value: number) => value * 2;
const fnMap1 = ([key, value]: [string, number]) => [key, value * 2] as const;

const list1Array = ExEnumerable.map(list1, fnList1); // number[]
const map1Array = ExEnumerable.map(map1, fnMap1); // [string, number][]

console.log(list1Array);
console.log(map1Array);
