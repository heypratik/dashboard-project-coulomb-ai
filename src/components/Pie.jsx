import React, {useState, useContext} from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import {backendData} from '../mapData'
import {GiPlainCircle} from 'react-icons/gi'
import {Context} from '../lib/Context'
import {BsCalendarMinus, BsCalendarCheck} from 'react-icons/bs'
import { DateRange } from "react-date-range";


const Pie = () => {

  const { selectedList, showChildChart, setShowChildChart, handlePieRange, setShowPieCalendar, PiechartStartDate, showPieCalendar, startDate, endDate, handleSelect } = useContext(Context)
  const selectedBatteryChart = backendData.filter(eachData => eachData.batteryId === selectedList)
  let dateFilter = selectedBatteryChart[0].issues.filter(item => item.date >= PiechartStartDate[0] && item.date <= PiechartStartDate[1])

  console.log(dateFilter)

  const [childChart, setChildChart] = useState(selectedBatteryChart[0].issues[2].subIssues)

  const [colors, setColors] = useState(['#4472c4', '#ed7d31', '#a5a5a5', '#ffc000', '#77f55e'])

  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <div className='pie-chart'>
    <div className='pie-chart-one'>
    <button className='date-lineChart' onClick={() => setShowPieCalendar(prevState => ! prevState)}><BsCalendarMinus className='btn-icon' />Change Dates</button>
    {showPieCalendar && <div className='calendar calendar-pie'>
    <DateRange ranges={[selectionRange]} onChange={handleSelect} />
    <button className='date-lineChart set-range' onClick={(e) => handlePieRange(e)}><BsCalendarCheck className='btn-icon' />Set Range</button>
    </div>
    }
{dateFilter[0] &&  <PieChart
    onClick={(event, index) => {
      setShowChildChart(true)
      setChildChart(selectedBatteryChart[0].issues[index].subIssues)
      console.log('CLICK', { event, index });
}}
    animate 
    label={({ dataEntry }) => `${dataEntry.value}%`}
    labelStyle={{
          ...defaultLabelStyle,
      }}
    style={{ height: '300px' }}
    segmentsShift={(index) => (index === 0 ? 0.5 : 0.5)}
    data= {dateFilter.map((item, i) => (
    {title: item.x, value: item.y, color: colors[i]}
))}
/>}

{!dateFilter[0] && <h4 className='no-data-pie'><b>No Data</b> (Select Between 25th Sept 22 - 29th Sept 22 for development data)</h4>}

<div className='pie-title'>
  <p className='pie-desc'>Battery ID: {selectedList}</p>
  {dateFilter.map((item, i) => (
    <p className='pie-desc' key={i}><GiPlainCircle className='color-icon' style={{color: colors[i]}}/>{item.x}</p>
  ))}</div></div>

{showChildChart && dateFilter[0] && 
  <div className='pie-chart-one'>
<PieChart
    animate
    label={({ dataEntry }) => `${dataEntry.value}%`}
    labelStyle={{
      ...defaultLabelStyle,
  }}
    style={{ height: '300px' }}
    segmentsShift={(index) => (index === 0 ? 0.5 : 0.5)}
    data= {childChart.map((item, i) => (
    {title: item.x, value: item.y, color: colors[i]}
  ))}
/>

<div className='pie-title'>
  {childChart.map((item, i) => (
    <p className='pie-desc' key={i}><GiPlainCircle className='color-icon' style={{color: colors[i]}}/>{item.x}</p>
  ))}</div>

</div>

}
    </div>
  )
}

export default Pie