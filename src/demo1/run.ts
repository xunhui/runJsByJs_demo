import { parse } from '@babel/parser'
import { Evaluate } from './eval'

// DEMO1: 实现二元表达式的运算
const str = `
  'hello' + 'world'
`

const run = (code: string) => {
  const ast = parse(code);
  return Evaluate(ast as any)
}

const res = run(str)
console.log(res)