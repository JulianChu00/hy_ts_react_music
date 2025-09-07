import { memo, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}
const Songs = (_props: IProps) => {
  return <div>Songs</div>
}
export default memo(Songs)
