export function getNextCycle(currentCycle: number) {
  return currentCycle === 0 || currentCycle === 8 ? 1 : currentCycle + 1;
}

/*
0 -> 1
1 -> 2 
...
8 -> 1
*/
