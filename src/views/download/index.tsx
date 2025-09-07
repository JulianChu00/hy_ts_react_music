import { memo, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}
const Download = (_props: IProps) => {
  return <div>Download</div>
}
export default memo(Download)
