import { keyedCoordinates, path } from "./types";

export const locations: keyedCoordinates = {
  _size: [10, 10],
  a: [3, 9],
  b: [4, 9],
  c: [3, 7],
  d: [3, 6],
  e: [8, 6],
  f: [2, 6],
  g: [3, 4],
  h: [3, 0],
};

export const paths: path[] = [
  ['a', 'c', 2, []],
  ['c', 'd', 1, []],
  ['c', 'f', 4, [[1, 7], [1, 6]]],
  ['b', 'd', 4, [[4, 6]]],
  ['b', 'e', 7, [[8, 9]]],
  ['d', 'f', 1, []],
  ['d', 'g', 2, []],
  ['f', 'g', 3, [[2, 4]]],
  ['g', 'h', 4, []],
  ['e', 'h', 10, [[7, 5], [7, 0]]]
];
