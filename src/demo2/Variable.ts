export type Kind = 'var' | 'let' | 'const' // 变量类型

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