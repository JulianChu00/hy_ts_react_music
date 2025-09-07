import { memo, ReactNode, useRef, useState } from 'react'
import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from './style'
import { shallowEqual, useSelector } from 'react-redux'
import { Carousel } from 'antd'
import type { CarouselRef } from 'antd/es/carousel'
import classNames from 'classnames'
interface IProps {
  children?: ReactNode
}
const TopBanner = (_props: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const bannerRef = useRef<CarouselRef>(null)
  const banners = useSelector(
    (state: any) => state.recommend.banners,
    shallowEqual
  )
  const handlePreClick = () => {
    console.log('pre')
    bannerRef.current?.prev()
  }
  const handleNextClick = () => {
    console.log('next')
    bannerRef.current?.next()
  }
  const [bgImageUrl, setBgImageUrl] = useState<string>('')
  const handleAfterChange = (current: number) => {
    setCurrentIndex(current)
    const url = banners[current]?.imageUrl + '?imageView&blur=40x20'
    if (url) {
      setBgImageUrl(url)
    }
    const next = (current + 1) % banners.length
    const nextUrl = banners[next]?.imageUrl + '?imageView&blur=40x20'
    if (nextUrl) {
      const img = new Image()
      img.src = nextUrl
    }
  }

  const handleBeforeChange = () => {
    setCurrentIndex(-1)
  }
  // let bgImageUrl
  // if (currentIndex > 0) {
  //   bgImageUrl = banners[currentIndex]?.imageUrl
  // }
  // if (bgImageUrl) {
  //   bgImageUrl = bgImageUrl + '?imageView&blur=40x20'
  // }
  // console.log('bgImageUrl', bgImageUrl)

  return (
    <BannerWrapper
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundPosition: 'center',
        backgroundSize: '6000px',
        transition: 'background-image 0.6s ease-in-out'
      }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            autoplay
            autoplaySpeed={2500}
            fade
            infinite
            dots={false}
            afterChange={(current: number) => handleAfterChange(current)}
            beforeChange={handleBeforeChange}
            ref={bannerRef}
          >
            {banners.map((item: any) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          <ul className="dots">
            {banners.map((item: any, index: number) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: currentIndex === index
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={handlePreClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}
export default memo(TopBanner)
