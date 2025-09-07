import { memo, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}
const Template = (_props: IProps) => {
  return <div>Template</div>
}
export default memo(Template)
