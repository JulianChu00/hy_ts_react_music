import { memo, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}
const AppFooter = (_props: IProps) => {
  return <h2>AppFooter组件的搭建</h2>
}
export default memo(AppFooter)
