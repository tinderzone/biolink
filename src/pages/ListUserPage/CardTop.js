import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeProfile } from '../../redux/Actions/UserAction'
import checkAuth from '../../utils/CheckAuth'
import { openNotification } from '../../utils/Notification'

export default function CardTop({ item }) {

    const [like, setLike] = useState(false)
    const dispatch = useDispatch()

    const handleLike = () => {
        if(checkAuth.getToken() === null){
            openNotification('error', 'Vui lòng đăng nhập để sử dụng chức năng này.',)
        }else{
            dispatch(likeProfile(like, item.username))
        }
    }

    return (
        <div  className='card-top text-black transition-all hover:text-black rounded-xl overflow-hidden hover:scale-105 duration-300 shadow-xl'>
            <NavLink to={`/profile/${item?.username}`}>
            <img src={`${item?.image}`} alt={item?.name} className='card-img' />
            <div className='card-body rounded-md z-20 relative'>
                <h2 className='font-bold text-2xl m-0 pb-2 w-full border-b border-gray-300 text-right'>
                    {item?.name}
                </h2>
                <p className='text-base text-right py-3'>
                    {item?.bio}
                </p>
            </div>
            </NavLink>
            <div className='card-footer'>
                <img src='/assets/Imgs/anh_lap_lanh.jpg' className='object-contain' />
                <div className='over-lay'></div>
                <div className='emote rounded-lg transition-all duration-300' onClick={handleLike}>
                    {like ?
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="30" height="30" viewBox="0 0 100 100" onClick={() => { setLike(!like) }}>
                            <g stroke='none' strokeWidth='0' strokeDasharray='none' strokeLinecap='butt' strokeLinejoin='miter' strokeMiterlimit='0' fillRule='nozero' fill='#e63757' >
                                <path d="M 42.901 85.549 c 1.059 1.383 3.138 1.383 4.197 0 c 7.061 -9.223 28.773 -25.692 33.475 -30.82 c 12.568 -12.568 12.568 -32.946 0 -45.514 h 0 c -8.961 -8.961 -26.859 -7.239 -34.145 3.1 c -0.699 0.992 -2.158 0.992 -2.857 0 C 36.286 1.975 18.387 0.253 9.426 9.214 h 0 c -12.568 12.568 -12.568 32.946 0 45.514 C 14.128 59.857 35.84 76.325 42.901 85.549 z" strokeLinecap="round" />
                            </g>
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="30" height="30" viewBox="0 0 100 100" onClick={() => { setLike(!like) }}>
                            <g stroke='none' strokeWidth='0' strokeDasharray='none' strokeLinecap='butt' strokeLinejoin='miter' strokeMiterlimit='0' fillRule='nozero' fill='#e63757' >
                                <path d="M 64.44 12.016 c 5.225 0 10.136 2.035 13.831 5.729 c 7.626 7.626 7.626 20.035 0 27.662 l -19.44 19.44 L 45 78.677 L 31.169 64.846 l -19.44 -19.44 c -7.626 -7.626 -7.626 -20.035 0 -27.662 c 3.694 -3.694 8.606 -5.729 13.831 -5.729 c 5.225 0 10.136 2.035 13.831 5.729 l 1.367 1.367 L 45 23.354 l 4.242 -4.242 l 1.367 -1.367 C 54.304 14.05 59.216 12.016 64.44 12.016 M 64.44 6.016 c -6.541 0 -13.083 2.495 -18.073 7.486 L 45 14.869 l 0 0 l 0 0 l -1.367 -1.367 C 38.642 8.511 32.101 6.016 25.56 6.016 S 12.477 8.511 7.486 13.502 c -9.982 9.982 -9.982 26.165 0 36.147 l 19.44 19.44 c 0 0 0 0 0.001 0 L 45 87.163 l 18.073 -18.073 c 0 0 0 0 0 0 l 19.44 -19.44 c 9.982 -9.982 9.982 -26.165 0 -36.147 C 77.523 8.511 70.982 6.016 64.44 6.016 L 64.44 6.016 z" strokeLinecap="round" />
                            </g>
                        </svg>
                    }
                    <p>{item.totalLike}</p>
                </div>
            </div>
        </div>
    )
}
