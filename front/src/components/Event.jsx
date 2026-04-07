import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import "../css/Event.css"
import { API } from '../api.js'

function Event(){
    const [eventData, setEventData] = useState([])

    //이벤트 정보 조회
    useEffect(()=>{
        fetch(`${API}/eventinfo`)
        .then(response=>response.json())
        .then(data=>setEventData(data))
    },[])

    return(
        <>
            <MainHeader />

        {/* 이벤트 포스터 */}
        {eventData.map((item)=>(
            <div key={item.defid}>
                <img src={`${API}${item.poster_path}`}
                className="event-poster"
                alt={item.poster_name} />
            </div>  
        ))}
        </>
    )
}

export default Event;