import { memo, ReactNode, useRef } from 'react'
import { useSelector } from 'react-redux'
import { AlbumWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { Carousel } from 'antd'
import type { CarouselRef } from 'antd/es/carousel'
import NewAlbumItem from '@/components/new-album-item'
interface IProps {
  children?: ReactNode
}
const NewAlbum = (_props: IProps) => {
  const bannerRef = useRef<CarouselRef>(null)
  const newAlbums = useSelector((state: any) => state.recommend.newAlbums)
  const handlePreClick = () => {
    bannerRef.current?.prev()
    console.log('pre')
    console.log(newAlbums)
  }
  const handleNextClick = () => {
    bannerRef.current?.next()
    console.log('next')
  }
  return (
    <AlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album"></AreaHeaderV1>
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={handlePreClick}
        ></button>
        <div className="banner">
          <Carousel arrows ref={bannerRef} dots={false} speed={1000}>
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {newAlbums
                      .slice(item * 5, (item + 1) * 5)
                      .map((album: any) => {
                        return (
                          <NewAlbumItem
                            key={album.id}
                            itemData={album}
                          ></NewAlbumItem>
                        )
                      })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right"
          onClick={handleNextClick}
        ></button>
      </div>
    </AlbumWrapper>
  )
}
export default memo(NewAlbum)
