import React, { useState } from "react"
import Moment from 'moment';

const Context = React.createContext()

function ContextProvider(props) {

    const [showCalendar, setShowCalendar] = useState(false)
    const [showPieCalendar, setShowPieCalendar] = useState(false)

    const [formState, setFormState] = useState([])
    const [isMapPage, setMapPage] = useState(window.location.pathname === '/' ? true : false)
    
    const [selectedList, setSelectedList] = useState('N266Z')
    const [showChildChart, setShowChildChart] = useState(false)
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 7));

    const [chartStartDate, setChartStartDate] = useState(['2022-09-25', '2022-10-03'])
    const [PiechartStartDate, setPieChartStartDate] = useState(['2022-09-25', '2022-09-28'])


    function handleCheckboxChange(e) {
        if (e.target.checked) {
          setFormState(prevState => [...prevState, e.target.value])
        } else {
          setFormState(prevState => prevState.filter(item => item!== e.target.value))
        }
      }


    function handleListClick(id) {
        setSelectedList(id)
        setShowChildChart(false)
    }

    function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    function handleRange(e) {
        if (Moment(startDate).format('YYYY-MM-DD') !== Moment(endDate).format('YYYY-MM-DD')) {
            setShowCalendar(false);
            e.preventDefault();
            setChartStartDate([Moment(startDate).format('YYYY-MM-DD'), Moment(endDate).format('YYYY-MM-DD')])
    }
}

    function handlePieRange(e) {
    if (Moment(startDate).format('YYYY-MM-DD') !== Moment(endDate).format('YYYY-MM-DD')) {
        setShowPieCalendar(false);
        e.preventDefault();
        setPieChartStartDate([Moment(startDate).format('YYYY-MM-DD'), Moment(endDate).format('YYYY-MM-DD')])
    }
    }
    
    return (
        <Context.Provider value={{selectedList, handleListClick, showChildChart, setShowChildChart, handleSelect, startDate, endDate, handleRange, chartStartDate, handleCheckboxChange, formState, setMapPage, isMapPage, showCalendar, setShowCalendar, showPieCalendar, setShowPieCalendar, PiechartStartDate, setPieChartStartDate, handlePieRange, formState}}>
        {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}