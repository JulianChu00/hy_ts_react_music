import { memo, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}
const Home = (_props: IProps) => {
  return <div>Home</div>
}
export default memo(Home)
