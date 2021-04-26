import * as TYPES from 'babel-types'

type VisitorMap<T> = {
  [k in keyof T]: (node: T[k], scope?: any) => any
}

type MAP_DEMO1 = {
  File: TYPES.File;
  Program: TYPES.Program;
  BinaryExpression: TYPES.BinaryExpression;
  StringLiteral: TYPES.StringLiteral;
  ExpressionStatement: TYPES.ExpressionStatement;
  NumericLiteral: TYPES.NumericLiteral;
}

// 获取每个节点的执行方法
export const Evaluate = (node: TYPES.Node) => {
  const nodeFunc = Visitor[node.type]
  if (!nodeFunc) throw Error('no support node type')
  
  return nodeFunc(node)
}

// 访问各个类型的节点，在每个节点中定义了不同的访问 | 执行方式
const Visitor: VisitorMap<MAP_DEMO1> = {
  File(node: TYPES.File) {
    return Evaluate(node.program)
  },
  Program(program: TYPES.Program) {
    // 返回最后一个有返回值的表达式结果
    let result = undefined
    for (const node of program.body) {
      if (Evaluate(node)) result = Evaluate(node)
    }
    return result
  },
  ExpressionStatement(node: TYPES.ExpressionStatement) {
    return Evaluate(node.expression)
  },
  BinaryExpression(node: TYPES.BinaryExpression) {
    const { left, right } = node
    return {
      "==": (a, b) => a == b,
      "!=": (a, b) => a != b,
      "===": (a, b) => a === b,
      "!==": (a, b) => a !== b,
      "<": (a, b) => a < b,
      "<=": (a, b) => a <= b,
      ">": (a, b) => a > b,
      ">=": (a, b) => a >= b,
      "<<": (a, b) => a << b,
      ">>": (a, b) => a >> b,
      ">>>": (a, b) => a >>> b,
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
      "%": (a, b) => a % b,
      "|": (a, b) => a | b,
      "^": (a, b) => a ^ b,
      "&": (a, b) => a & b,
      "in": (a, b) => a in b,
      "instanceof": (a, b) => a instanceof b
    }[node.operator](Evaluate(left), Evaluate(right))
  },
  StringLiteral(node: TYPES.StringLiteral) {
    return node.value
  },
  NumericLiteral(node: TYPES.NumericLiteral) {
    return node.value
  }
}