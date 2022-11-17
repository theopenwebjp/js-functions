import {
  dataInArray,
  cleverSlice
} from '../../../src/utility.js'

export default function() {
  return [
    dataInArray('a', [1, 2, 'a']),
    cleverSlice([1, 2, 3, 4, 5], 1, 3)
  ]
}
