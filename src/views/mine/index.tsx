import { memo, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}
const Mine = (_props: IProps) => {
  return <div>Mine</div>
}
export default memo(Mine)
