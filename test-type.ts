interface IFnCall {
  <T>(fn: () => T, age: T): T
}
const foo: IFnCall = function (fn, age) {
  return age
}
foo<number>(() => 1, 18)
