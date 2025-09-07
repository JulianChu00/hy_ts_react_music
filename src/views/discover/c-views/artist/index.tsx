import { memo, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}
const Artist = (_props: IProps) => {
  return <div>Artist</div>
}
export default memo(Artist)
