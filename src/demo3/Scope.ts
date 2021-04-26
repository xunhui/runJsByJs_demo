type Kind = 'var' | 'let' | 'const' // 变量类型
type ScopeType = 'global' | 'function' | 'loop' | 'switch' | 'block'

// 变量
export class Variable {
  constructor(
    public kind: Kind,
    public name: string,
    private val: any
  ) {}

  public get value(){
    return this.val
  }

  public set(value: any): void {
    // 不可以对 const 类型的变量进行赋值
    if (this.kind === 'const') {
      throw new TypeError('Assignment to constant variable')
    }
    this.val = value
  }
}

// 作用域类
export default class Scope {
  type: ScopeType
  level: number = 0
  content: { [key: string]: Variable } // 挂载在当前作用域中的变量/方法等
  parentScope: Scope | null // 用于构建作用域链

  constructor(type: ScopeType, parentScope: Scope | null) {
    this.type = type
    this.parentScope = parentScope
    this.content = {}
  }

  // 在作用域链中查找变量
  $find(name: string): Variable {
    if (this.content.hasOwnProperty(name)) {
      return this.content[name]
    } else if (this.parentScope) {
      return this.parentScope.$find(name)
    } else {
      throw new ReferenceError(`${name} is not defined`)
    }
  }

  $declare(kind: Kind, name: string, value: any) {
    return {
      'var': () => this.$var(name, value),
      'let': () => this.$let(name, value),
      'const': () => this.$const(name, value)
    }[kind]()
  }

  $var(name: string, value: any) {
    let scope: Scope = this
    // var 变量存在变量提升，直到遇到函数作用域
    while (scope.parentScope && scope.type !== 'function') {
      scope = scope.parentScope
    }
    scope.content[name] = new Variable('var', name, value)
  }

  $let(name: string, value: any) {
    if (!this.content.hasOwnProperty(name)) {
      this.content[name] = new Variable('let', name, value);
      return true;
    } else {
      throw new SyntaxError(`Identifier ${name} has already been declared`);
    }
  }

  $const(name: string, value: any) {
    if (!this.content.hasOwnProperty(name)) {
      this.content[name] = new Variable('const', name, value);
      return true;
    } else {
      throw new SyntaxError(`Identifier ${name} has already been declared`);
    }
  }
}