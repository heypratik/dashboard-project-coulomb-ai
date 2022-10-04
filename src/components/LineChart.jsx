import React, { useState, useContext, useEffect } from 'react'
import {ChartComponent, Inject, LineSeries, SeriesCollectionDirective, SeriesDirective, Category, AxesDirective, AxisDirective, Legend, Tooltip} from '@syncfusion/ej2-react-charts'
import {backendData} from '../mapData'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from "react-date-range";
import {Context} from '../lib/Context'
import Pie from "./Pie";
import {BsCalendarMinus, BsCalendarCheck} from 'react-icons/bs'

const LineChart = () => {

    const { selectedList, handleSelect, startDate, endDate, handleRange, chartStartDate, setShowCalendar, showCalendar } = useContext(Context)
    const [selectedBattery, setSelectedBattery] = useState(selectedList)

    useEffect(() => {
        setSelectedBattery(selectedList)
    }, [selectedList])
    
    const selectedBatteryChart = backendData.filter(eachData => eachData.batteryId === selectedBattery)

    let dateFilter = selectedBatteryChart[0].historicData.filter(item => item.date >= chartStartDate[0] && item.date <= chartStartDate[1])

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
      };

  return (
    <>
    <div className='chart'>
    <button className='date-lineChart' onClick={() => setShowCalendar(prevState => !prevState)}><BsCalendarMinus className='btn-icon' />Change Dates</button>
    {showCalendar && <div className='calendar'>
    <DateRange ranges={[selectionRange]} onChange={handleSelect} />
    <button className='date-lineChart set-range' onClick={(e) => handleRange(e)}><BsCalendarCheck className='btn-icon' />Set Range</button>
    </div>
    }

        {dateFilter[0] && <ChartComponent width='100%' primaryXAxis={{valueType: 'Category', majorTickLines:{color: 'white'}}} primaryYAxis={{title: 'A', majorGridLines:{color: 'white'}}} legendSettings={{visible: true}} tooltip={{enable: true}}>
            <Inject services={[LineSeries, Category, Legend, Tooltip]}></Inject>
            <AxesDirective>
                <AxisDirective name='yAxis1' opposedPosition title='B'></AxisDirective>
            </AxesDirective>
            <SeriesCollectionDirective>
                <SeriesDirective type='Line' name='A' dataSource={dateFilter} width='2px' fill='orange' xName='date' yName='a'></SeriesDirective>
                <SeriesDirective type='Line' name='B' dataSource={dateFilter} width='2px' fill='grey' xName='date' yName='b' yAxisName='yAxis1'>
                </SeriesDirective>
                </SeriesCollectionDirective>
        </ChartComponent>}
    {!dateFilter[0] && <h4 className='no-data'><b>No Data</b> (Select Between 25th Sept 22 - 03 Oct 22 for development data)</h4>}
    </div>
    <Pie />
    </>
  )
}

export default LineChart