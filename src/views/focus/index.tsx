import { memo, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}
const Focus = (_props: IProps) => {
  return <div>Focus</div>
}
export default memo(Focus)
