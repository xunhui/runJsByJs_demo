// import * as TYPES from 'babel-types'
// import Scope from './scope'

// type VisitorMap<T> = {
//   [k in keyof T]: (node: T[k], scope: Scope) => any
// }

// type MAP_DEMO2 = {
//   File: TYPES.File;
//   Program: TYPES.Program;
//   FunctionDeclaration: TYPES.FunctionDeclaration;
//   BlockStatement: TYPES.BlockStatement;
//   IfStatement: TYPES.IfStatement;
//   ReturnStatement: TYPES.ReturnStatement;
//   CallExpression: TYPES.CallExpression;
//   NumericLiteral: TYPES.NumericLiteral;
//   Identifier: TYPES.Identifier;
// }

// // 获取每个节点的执行方法
// export const Evaluate = (node: TYPES.Node, scope: Scope) => {
//   const nodeFunc = Visitor[node.type]
//   if (!nodeFunc) throw Error('no support node type')

//   return nodeFunc(node, scope)
// }

// function createFunction(node: TYPES.FunctionDeclaration, scope: Scope) {
//   return function (...args: any) {
//       const { params, body } = node
//       const newScope = new Scope('function', scope)

//       params.forEach((param, index) => {
//           if (param.type === 'Identifier') {
//               newScope.$let(param.name, args[index])
//           } else {
//               throw new Error(`type "${param.type}" params is not supported`)
//           }
//       })

//       return Evaluate(body, newScope)
//   }   
// }

// // 访问各个类型的节点，在每个节点中定义了不同的访问 | 执行方式
// const Visitor: VisitorMap<MAP_DEMO2> = {
//   File(node: TYPES.File, scope: Scope) {
//     return Evaluate(node.program, scope)
//   },
//   Program(program: TYPES.Program, scope: Scope) {
//     // 返回最后一个表达式的结果
//     const last = program.body.length
//     for (let i = 0; i < last; i++) {
//       if (i === last - 1) {
//         return Evaluate(program.body[i], scope)
//       }
//       Evaluate(program.body[i], scope)
//     }
//   },
//   FunctionDeclaration(node: TYPES.FunctionDeclaration, scope: Scope) {
//     scope.$const(node.id.name, createFunction(node, scope))
//   },
//   IfStatement(node: TYPES.IfStatement, scope) {

//   },
//   ReturnStatement(node: TYPES.ReturnStatement, scope) {

//   },
//   CallExpression(node: TYPES.CallExpression, scope: Scope) {
//   },
//   BlockStatement(node: TYPES.BlockStatement, scope: Scope) {
//     const newScope = new Scope('block', scope) // 创建一个块级作用域
//     newScope.level = scope.level + 1
//     for (const child of node.body) { // 这里只处理变量声明
//       Evaluate(child, newScope)
//     }
//   },
//   NumericLiteral(node: TYPES.NumericLiteral, scope: Scope) {
//     return node.value
//   },
//   Identifier(node: TYPES.Identifier, scope) {
//     if (node.name) {
//       return scope.$find(node.name)?.value
//     }
//     return undefined
//   }
// }

// const Visitor = {
//   Program(node: ES.Program, scope: Scope) {
//       let result: any
//       node.body.forEach(child => {
//           result = visit(child, scope)
//       })
//       return result
//   },
//   ExpressionStatement(node: ES.ExpressionStatement, scope: Scope) {
//       return visit(node.expression, scope)
//   },
//   CallExpression(node: ES.CallExpression, scope: Scope) {
//       const { callee } = node
//       let result: any

//       if (callee.type === 'Identifier') {
//           const name = callee.name
//           const params = node.arguments.map(param => visit(param, scope))
//           callstack.push({})
//           result = scope.get(name).value(...params)
//           callstack.pop()
//       } else {
//           throw new Error(`type "${callee.type}" callee is not supported`)
//       }

//       return result
//   },
//   ReturnStatement(node: ES.ReturnStatement, scope: Scope) {
//       callstack.current && (callstack.current.return = true)
//       return visit(node.argument, scope)
//   },
//   FunctionDeclaration(node: ES.FunctionDeclaration, scope: Scope) {
//       scope.$const(node.id.name, createFunction(node, scope))
//   },
//   FunctionExpression(node: ES.FunctionExpression, scope: Scope) {
//       return createFunction(node, scope)
//   },
//   VariableDeclaration(node: ES.VariableDeclaration, scope: Scope) {
//       state.kind = node.kind
//       node.declarations.forEach(child => visit(child, scope))
//   },
// }