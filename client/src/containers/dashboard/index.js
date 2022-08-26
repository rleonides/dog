
import Calendar from 'react-calendar'
import './calendarStyle.css';
const Dashboard = function(pros){
return(
    <div className="flex flex-col items-center justify-start w-full bg-slate-100 grow">
  <div className="flex-wrap border bg-slate-800"> 
    <Calendar
    tileClassName={({ date, view }) => view === 'month' && console.log(Date.prototype.isPrototypeOf(date)) === new Date().toString()? 'bg-blue-500/50' : null}
    className="w-full h-full p-5 space-y-2 text-center border bg-slate-100"
    defaultView = 'month'
    prev2Label={null}
    next2Label={null}
   />
   </div>
    </div>
)
}

export default Dashboard