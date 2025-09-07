import { memo, ReactNode, useState, useEffect } from 'react'
import hyRequest from '@/service'
interface IProps {
  children?: ReactNode
}
const Recommend = (_props: IProps) => {
  const [banners, setBanners] = useState<any[]>([])
  useEffect(() => {
    hyRequest
      .request({
        url: '/banner',
        method: 'get'
      })
      .then((res) => {
        setBanners(res.banners)
      })
  }, [])

  return (
    <div>
      {banners.map((item: any) => {
        return <img key={item.imageUrl} src={item.imageUrl} alt="" />
      })}
    </div>
  )
}
export default memo(Recommend)
