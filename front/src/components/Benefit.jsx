import MainHeader from '../Main/MainHeader.jsx'
import { useState, useEffect } from 'react'
import '../css/Benefit.css'
import { API } from '../api.js'

function Benefit(){
    const [benefitData, setBenefitData] = useState([])

    //혜택 정보 조회
    useEffect(()=>{
        fetch(`${API}/benefitinfo`)
        .then(response =>response.json())
        .then(data => setBenefitData(data))
    },[])
    
    return(
        <>
            <MainHeader />
            
            {/* 혜택 포스터 */}
            {benefitData.map((item)=>(
                <div key={item.defid}>
                    <img src={`${API}${item.poster_path}`}
                    className="benefit-poster"
                    alt={item.poster_name} />
                </div>
                    )
                )
            }
        </>
    )
}

export default Benefit;