import { HeaderV1Wrapper } from './style'
import { memo, ReactNode } from 'react'
import { Link } from 'react-router-dom'
interface IProps {
  children?: ReactNode
  title?: string
  keywords?: string[]
  moreText?: string
  moreLink?: string
}
const AreaHeaderV1 = (_props: IProps) => {
  const {
    title = '默认标题',
    keywords = [],
    moreText = '更多',
    moreLink = '/'
  } = _props
  return (
    <HeaderV1Wrapper className="sprite_02">
      <div className="left">
        <h3 className="title">{title}</h3>
        <div className="keywords">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <span className="text">{item}</span>
                <span className="divider ">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        {/* <Link to={}>更多</Link> */}
        <Link className="more" to={moreLink}>
          {moreText}
        </Link>
        <i className="icon sprite_02"></i>
      </div>
    </HeaderV1Wrapper>
  )
}
export default memo(AreaHeaderV1)
