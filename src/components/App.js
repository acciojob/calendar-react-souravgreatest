import React, { useState } from 'react';
import '../styles/App.css';
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const App = () => {
  const curr_date=new Date();
  const [month,setMonth]=useState(curr_date.getMonth());
  const [year,setYear]=useState(curr_date.getFullYear());
  const [editingYear, setEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(year);

  const generateCalendar=()=>{
    const firstDay = new Date(year, month, 1).getDay(); // Day index (0-6) -> 6
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days
    const weeks=[];//2D array to showcase complete month days
    let day=1;
    for(let i=0;i<6;i++)
    {
      const week=[];
      for(let j=0;j<7;j++)
      {
        if ((i === 0 && j < firstDay) || day > daysInMonth)
        {
          week.push(<td key={j}></td>);
        }
        else {
          week.push(<td key={j}>{day++}</td>);
        }
      }
      weeks.push(<tr>{week}</tr>);
      if (day > daysInMonth) break;
    }
    return weeks;
  }
  const changeMonth = (offset) => {
    let newMonth = month + offset;
    let newYear = year;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setMonth(newMonth);
    setYear(newYear);
    setYearInput(newYear);
  };
  const changeYear=(val)=>{
    let new_year=year+val;
    setYear(new_year);
  }
  function handleYearInputBlur(){
    setYear(yearInput);
    setEditingYear(false);
  }

  return (
    <div style={{textAlign:'center'}}>
      <h1>Calendar</h1>
      <div className='complete_calendar'>

        {/* Creating month dropdown */}
        <select value={month} onChange={(e)=>(setMonth(e.target.value))} 
            style={{ margin: '0 10px' }}>
          {months.map((ele,ind)=>{
            return <option key={ind} value={ind}>{ele}</option>
          })}
        </select>

          {/*Showing the current year in calendar*/ }
          {
            editingYear? 
              (<input type="number"
                      value={yearInput}
                      onChange={(e) => setYearInput(e.target.value)}
                      onBlur={handleYearInputBlur}
              autoFocus></input>)
              :
              (<span onDoubleClick={()=>setEditingYear(true)}>{year}</span>)
          }


        <hr/>
        <table id="calendar-table" style={{ marginTop: '20px', marginInline: 'auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => (
              <th key={day} style={{ padding: '4px', border: '1px solid black' }}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {generateCalendar()}
        </tbody>
      </table>
        <hr/>
        <div className='btns'>
          <button onClick={()=>changeYear(-1)}>&lt;&lt;</button>
          <button onClick={()=>changeMonth(-1)}>&lt;</button>
          <button onClick={()=>changeMonth(1)}>&gt;</button>
          <button onClick={()=>changeYear(1)}>&gt;&gt;</button>
        </div>
      </div>
    </div>
  );
}

export default App;
