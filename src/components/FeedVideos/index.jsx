import VideoPlayer from '../VideoPlayer/index.jsx'
import styles from './styles.module.css'
import {useState, useEffect} from 'react'
import { getVideos } from '../../services/index.js'

/* 
const VIDEOS = [
  {
    id: 1,
    author: 'VladimirCeli',
    description: 'Vamos el futbol como esta la gente asjdhsdjaskdhfjadjncmxzvjadhfga',
    likes: 123,
    shares: 234,
    comments: 353,
    songTitle: 'sonido original -zzeroki',
    albumCover: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/5b9c9e7d428ef8aaa00a9ddf8ab972c1~c5_720x720.jpeg?x-expires=1648141200&amp;x-signature=oB3QvF0Tie9i5GdUvtHioVkLioU%3D',
    src: 'https://v16-webapp.tiktok.com/ea585e90b8d52d4913a037f39e54babe/623c1f39/video/tos/useast2a/tos-useast2a-ve-0068c004/dcef24e2dcd94e30b0c5a903a2ec617e/?a=1988&amp;br=3304&amp;bt=1652&amp;cd=0%7C0%7C1%7C0&amp;ch=0&amp;cr=0&amp;cs=0&amp;cv=1&amp;dr=0&amp;ds=3&amp;er=&amp;ft=XOQ9-30-nz7Th4NtMDXq&amp;l=202203240135120101920611702479EAA3&amp;lr=tiktok_m&amp;mime_type=video_mp4&amp;net=0&amp;pl=0&amp;qs=0&amp;rc=ajV1czU6ZjR2OzMzNzczM0ApaDxkOTk2ZDs5N2lkNDloNWcvZ2EzcjQwX3BgLS1kMTZzc182NGMwXzAuYDRjMjYtLl86Yw%3D%3D&amp;vl=&amp;vr='
  },
  {
    id: 2,
    author: 'VladimirCeli',
    description: 'Vamos el futbol como esta la gente asjdhsdjaskdhfjadjncmxzvjadhfga',
    likes: 123,
    shares: 234,
    comments: 353,
    songTitle: 'sonido original -zzeroki',
    albumCover: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/5b9c9e7d428ef8aaa00a9ddf8ab972c1~c5_720x720.jpeg?x-expires=1648141200&amp;x-signature=oB3QvF0Tie9i5GdUvtHioVkLioU%3D',
    src: 'https://v16-webapp.tiktok.com/b324ba2cc6d31d0534b07ab6b2d96817/623c1f3e/video/tos/useast2a/tos-useast2a-pve-0068/09828b7bec104be282a16a292f8411d6/?a=1988&amp;br=530&amp;bt=265&amp;cd=0%7C0%7C1%7C0&amp;ch=0&amp;cr=0&amp;cs=0&amp;cv=1&amp;dr=0&amp;ds=3&amp;er=&amp;ft=XOQ9-30-nz7Th4NtMDXq&amp;l=202203240135120101920611702479EAA3&amp;lr=tiktok_m&amp;mime_type=video_mp4&amp;net=0&amp;pl=0&amp;qs=0&amp;rc=M3B0dWc6Zm8zOzMzNzczM0ApZmQzaTtnZmRoN2U8PGdoPGdoMTVecjQwZ25gLS1kMTZzczRgNmM0MTU0NWFjMS4vLl46Yw%3D%3D&amp;vl=&amp;vr='
  },
  {
    id: 3,
    author: 'VladimirCeli',
    description: 'Vamos el futbol como esta la gente asjdhsdjaskdhfjadjncmxzvjadhfga',
    likes: 123,
    shares: 234,
    comments: 353,
    songTitle: 'sonido original -zzeroki',
    albumCover: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/5b9c9e7d428ef8aaa00a9ddf8ab972c1~c5_720x720.jpeg?x-expires=1648141200&amp;x-signature=oB3QvF0Tie9i5GdUvtHioVkLioU%3D',
    src: 'https://v16-webapp.tiktok.com/8bbfba20490f3727ea79ca349c943990/623c1fbe/video/tos/useast2a/tos-useast2a-pve-0068/5942628e2c1747a1956c796ff3e1908f/?a=1988&amp;br=1368&amp;bt=684&amp;cd=0%7C0%7C1%7C0&amp;ch=0&amp;cr=0&amp;cs=0&amp;cv=1&amp;dr=0&amp;ds=3&amp;er=&amp;ft=XOQ9-30-nz7ThbNtMDXq&amp;l=20220324013547010191055029137BD967&amp;lr=tiktok_m&amp;mime_type=video_mp4&amp;net=0&amp;pl=0&amp;qs=0&amp;rc=amhuOTY6ZndnOzMzNzczM0ApNzY5NWc4Ojw5Nzo0OmU4ZGdeNDVecjQwY2tgLS1kMTZzczRgNC9iYWNfMWEyLi9fNDA6Yw%3D%3D&amp;vl=&amp;vr='
  }
]
*/
export default function FeedVideos () {
  const [videos, setVideos] = useState([])
  const [error, setError] = useState(null)
  useEffect(() => {
    getVideos().then(([error, videos]) => {
      if (error) return setError(error)
      setVideos(videos)
    })
  }, [])

  if (error) return (
    <span>{error}</span>
  )

  return (
      videos.map(video => {
        const {user = {} } = video
        const {avatar, username} = user
        return (
          <div className={styles.item} key={video.id} >
          <VideoPlayer { ... video} avatar={avatar} username={username} />
          </div>
        )
      })
  )
}
