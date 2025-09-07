import { memo, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}
const Album = (_props: IProps) => {
  return <div>Album</div>
}
export default memo(Album)
