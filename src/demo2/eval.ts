import * as TYPES from 'babel-types'
import Scope from './Scope'

type VisitorMap<T> = {
  [k in keyof T]: (node: T[k], scope: Scope) => any
}

type MAP_DEMO2 = {
  File: TYPES.File;
  Program: TYPES.Program;
  VariableDeclaration: TYPES.VariableDeclaration;
  VariableDeclarator: TYPES.VariableDeclarator;
  ExpressionStatement: TYPES.ExpressionStatement;
  AssignmentExpression: TYPES.AssignmentExpression;
  NumericLiteral: TYPES.NumericLiteral;
  Identifier: TYPES.Identifier;
  BlockStatement: TYPES.BlockStatement;
}

// 获取每个节点的执行方法
export const Evaluate = (node: TYPES.Node, scope: Scope) => {
  const nodeFunc = Visitor[node.type]
  if (!nodeFunc) throw Error('no support node type')
  
  return nodeFunc(node, scope)
}

// 访问各个类型的节点，在每个节点中定义了不同的访问 | 执行方式
const Visitor: VisitorMap<MAP_DEMO2> = {
  File(node: TYPES.File, scope: Scope) {
    return Evaluate(node.program, scope)
  },
  Program(program: TYPES.Program, scope: Scope) {
    // 返回最后一个有返回值的表达式结果
    let result = undefined
    for (const node of program.body) {
      if (Evaluate(node, scope)) result = Evaluate(node, scope)
    }
    return result
  },
  VariableDeclaration(node: TYPES.VariableDeclaration, scope: Scope) {
    const { kind, declarations } = node // 变量类型和声明内容
    for (const declartor of declarations) {
      const name = (declartor.id as TYPES.Identifier).name // 变量名
      const value = declartor.init ? Evaluate(declartor.init, scope) : undefined // 变量值
      scope.$declare(kind, name, value) // 将变量声明放入对应的作用域中
    }
  },
  VariableDeclarator(node, scope) {
    // 该节点类型已经在 VariableDeclaration 中处理过了
  },
  BlockStatement(node: TYPES.BlockStatement, scope: Scope) {
    const newScope = new Scope('block', scope) // 创建一个块级作用域
    newScope.level = scope.level + 1
    for (const child of node.body) { // 这里只处理变量声明
      Evaluate(child, newScope)
    }
  },
  AssignmentExpression(node: TYPES.AssignmentExpression, scope) {
    // 这里只处理左侧为标识符，右侧为字面量的场景
    if (node.left.type === 'Identifier') {
      const { name } = node.left
      const variable = scope.$find(name)
      const value = (node.right as TYPES.NumericLiteral).value
      if (!variable) { // 变量不存在定义则将该变量设置为 var 类型的变量
        return scope.$declare('var', name, value)
      }
      variable.set(value) 
    }
  },
  ExpressionStatement(node: TYPES.ExpressionStatement, scope: Scope) {
    return Evaluate(node.expression, scope)
  },
  NumericLiteral(node: TYPES.NumericLiteral, scope: Scope) {
    return node.value
  },
  Identifier(node: TYPES.Identifier, scope) {
    if (node.name) {
      return scope.$find(node.name)?.value
    }
    return undefined
  }
}