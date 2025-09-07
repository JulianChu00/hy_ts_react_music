import { memo, ReactNode } from 'react'
import { AlbumItemWrapper } from './style'
import { getImageSize } from '@/utils/format'
interface IProps {
  children?: ReactNode
  itemData: any
}
const NewAlbumItem = (_props: IProps) => {
  const { itemData } = _props
  return (
    <AlbumItemWrapper>
      <div className="top">
        <img src={getImageSize(itemData.picUrl, 140)}></img>
        <a className="cover sprite_cover"></a>
      </div>
      <div className="bottom">
        <div className="name">{itemData.name}</div>
        <div className="artist">{itemData.artist.name}</div>
      </div>
    </AlbumItemWrapper>
  )
}
export default memo(NewAlbumItem)
