import { memo, ReactNode } from 'react'
import { NavWrapper } from './style'
import { NavLink } from 'react-router-dom'
import { discoverMenu } from '@/assets/data/local_data'
interface IProps {
  children?: ReactNode
}
const NavBar = (_props: IProps) => {
  return (
    <NavWrapper className="wrap-v1">
      <div className="nav">
        {discoverMenu.map((item) => {
          return (
            <div className="item" key={item.title}>
              <NavLink
                to={item.link}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.title}
              </NavLink>
            </div>
          )
        })}
      </div>
    </NavWrapper>
  )
}
export default memo(NavBar)
