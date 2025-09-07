import { memo, ReactNode } from 'react'
import { RankingWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { useSelector } from 'react-redux'
import TopRankingItem from '../top-ranking-item'
interface IProps {
  children?: ReactNode
}
const TopRanking = (_props: IProps) => {
  const rankings = useSelector((state: any) => state.recommend.rankings)
  return (
    <RankingWrapper>
      <AreaHeaderV1 title="榜单" moreLink="/discover/ranking"></AreaHeaderV1>
      <div className="content">
        {rankings.map((item: any) => {
          return <TopRankingItem key={item.id} itemData={item}></TopRankingItem>
        })}
      </div>
    </RankingWrapper>
  )
}
export default memo(TopRanking)
