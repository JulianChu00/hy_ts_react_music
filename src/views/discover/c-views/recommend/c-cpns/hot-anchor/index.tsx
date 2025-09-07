import { memo, ReactNode } from 'react'
import { AnchorWrapper } from './style'
import AreaHeaderV2 from '@/components/area-header-v2'
import { hotRadios } from '@/assets/data/local_data'
interface IProps {
  children?: ReactNode
}
const HotAnchor = (_props: IProps) => {
  return (
    <AnchorWrapper>
      <AreaHeaderV2 title="热门主播"></AreaHeaderV2>
      <div className="anchors">
        {hotRadios.map((item: any) => {
          return (
            <div className="item" key={item.picUrl}>
              <a className="image">
                <img src={item.picUrl}></img>
              </a>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="position">{item.position}</div>
              </div>
            </div>
          )
        })}
      </div>
    </AnchorWrapper>
  )
}
export default memo(HotAnchor)
