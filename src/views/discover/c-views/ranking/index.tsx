import { memo, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}
const Ranking = (_props: IProps) => {
  return <div>Ranking</div>
}
export default memo(Ranking)
