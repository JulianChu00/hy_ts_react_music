import { memo, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
  name: string
  age: number
  height?: number
}
const Download = (props: IProps) => {
  return (
    <div>
      <div>Discover</div>
      <div>{props.name}</div>
      <div>{props.age}</div>
      <div>{props.height}</div>
      {props.children}
    </div>
  )
}
export default memo(Download)
