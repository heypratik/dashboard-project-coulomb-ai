import React, { useContext } from 'react'
import {backendData} from '../mapData'
import {Context} from '../lib/Context'
import { Link } from "react-router-dom";

const List = () => {

    const { handleListClick, setMapPage } = useContext(Context)

    return (
    <div className='main-cont'>
        
    <div className='cont'>
    <div className='child'>
            <div className='batteryId child-item title'><p>ID</p></div>
            <div className='date child-item title'><p>Time</p></div>
            <div className='status child-item title'><p>Status</p></div>
            <div className='A child-item title'><p>A</p></div>
            <div className='B child-item title'><p>B</p></div>
            <div className='X child-item title'><p>X</p></div>
            <div className='Y child-item title'><p>Y</p></div>
            </div>
            {backendData.map((data, i) => {
            return <Link className='a-list' key={i} onClick={() => setMapPage(false)} to={'/charts'}><div key={i}  onClick={() => handleListClick(data.batteryId)} className={`child ${i % 2 == 0 ? 'hasBg' : ''}`}>
                    <div className='batteryId child-item'><p>{data.batteryId}</p></div>
                    <div className='date child-item'><p>{data.date}</p></div>
                    <div className='status child-item'><p>{data.status}</p></div>
                    <div className='A child-item'><p>{data.a}</p></div>
                    <div className='B child-item'><p>{data.b}</p></div>
                    <div className='X child-item'><p>{data.x}</p></div>
                    <div className='Y child-item'><p>{data.y}</p></div>
                </div></Link>
            })}
    </div>

    </div>
  )
}

export default List