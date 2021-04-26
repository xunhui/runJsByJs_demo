// import { parse } from '@babel/parser'
// import Scope from './scope'
// import { Evaluate } from './eval'

// // DEMO3: 实现函数执行和调用栈
// const str = `
//   function fib(n) {
//     if (n < 2) return n 

//     return fib(n - 1) + fib(n - 2)
//   }
//   fib(5)
// `

// const run = (code: string) => {
//   const scope = new Scope('global', null); // 声明一个解释器的根级作用域
//   const ast = parse(code) as any;
//   return Evaluate(ast, scope)
// }

// const res = run(str)
// console.log(res)

// TODO 有bug..