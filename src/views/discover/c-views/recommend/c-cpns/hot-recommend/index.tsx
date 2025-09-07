import { memo, ReactNode } from 'react'
import { RecommendWrapper } from './style'
import { shallowEqual, useSelector } from 'react-redux'
import AreaHeaderV1 from '@/components/area-header-v1'
import SongMenuItem from '@/components/song-menu-item'
interface IProps {
  children?: ReactNode
}
const HotRecommend = (_props: IProps) => {
  const hotRecommend = useSelector(
    (state: any) => state.recommend.hotRecommend,
    shallowEqual
  )
  return (
    <RecommendWrapper>
      <AreaHeaderV1
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        moreLink="/discover/songs"
      ></AreaHeaderV1>
      <div className="recommend-list">
        {hotRecommend.map((item: any) => {
          return <SongMenuItem key={item.id} itemData={item}></SongMenuItem>
        })}
      </div>
    </RecommendWrapper>
  )
}
export default memo(HotRecommend)
