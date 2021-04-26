import { parse } from '@babel/parser'
import Scope from './Scope'
import { Evaluate } from './eval'

// DEMO2: 实现作用域和变量的存取
const str = `
  const a = 1
  {
    let b = 2
    var c = 3
  }
  d = 4
`

const run = (code: string) => {
  const scope = new Scope('global', null); // 声明一个解释器的根级作用域
  const ast = parse(code) as any;
  return Evaluate(ast, scope)
}

const res = run(str)
console.log(res)