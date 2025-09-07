import { memo, ReactNode, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './c-cpns/nav-bar'
interface IProps {
  children?: ReactNode
}
const Discover = (_props: IProps) => {
  return (
    <div>
      <div style={{ width: '100%', backgroundColor: '#c20c0c' }}>
        <NavBar></NavBar>
      </div>
      <Suspense fallback={<div>loading...</div>}>
        <Outlet></Outlet>
      </Suspense>
    </div>
  )
}
export default memo(Discover)
