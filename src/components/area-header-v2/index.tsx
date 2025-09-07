import { memo, ReactNode } from 'react'
import { HeaderV2Wrapper } from './style'
interface IProps {
  children?: ReactNode
  title?: string
  moreText?: string
  moreLink?: string
}
const AreaHeaderV2 = (_props: IProps) => {
  const { title = '默认标题', moreText, moreLink } = _props
  return (
    <HeaderV2Wrapper>
      <h3 className="title">{title}</h3>
      {moreText && moreLink && (
        <a href={moreLink} className="sprite_02">
          {moreText}
        </a>
      )}
    </HeaderV2Wrapper>
  )
}
export default memo(AreaHeaderV2)
