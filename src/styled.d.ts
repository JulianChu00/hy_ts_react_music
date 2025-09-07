import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string
      secondary: string
    }
    size: {
      // 你以后要扩展可以加这里
    }
    mixin: {
      wrapv1: string
    }
  }
}
