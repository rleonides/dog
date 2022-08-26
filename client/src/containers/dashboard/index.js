import Calendar from "react-calendar";
import "./calendarStyle.css";
import { useState, useEffect, useRef } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaDog } from "react-icons/fa";
import { GoCloudUpload } from "react-icons/go";
import { connect } from "react-redux";

function dateFormat(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

const Dashboard = function ({ info }) {
  const [date, setDate] = useState(() => dateFormat(new Date()));

  return (
    <div className="flex flex-col items-center justify-start w-full p-4 show-anim bg-slate-100 grow">
      <div className="flex flex-col flex-wrap justify-center h-full p-2 space-y-1 border bg-lime-900/80 rounded-2xl">
      
      { info.role==='Paseador'&&
       <>
       <Calendar
          tileClassName={({ date: date_, view }) => {
            if (date_.toLocaleDateString() === new Date(...date.split("-")))
              return "bg-lime-300/80";
            if (
              view === "month" &&
              date_.toLocaleDateString() ===
                new Date(...date.split("-")).toLocaleDateString()
            )
              return "bg-lime-300/50";
          }}
          className="w-full p-5 space-y-2 text-center border rounded-2xl bg-slate-100"
          defaultView="month"
          prev2Label={null}
          next2Label={null}
          onClickDay={(value, event) => setDate(dateFormat(value))}
        />
        <div className="w-full grow rounded-2xl">
          <WalkerConfig email={info.email} date={date} />
        </div>
     </>
     }
      </div>

    </div>
  );
};

let init = {
  "06:00 - 07:00 PM": "CH_CH_CH",
  "07:00 - 08:00 PM": "CH_CH_CH",
  "08:00 - 09:00 PM": "CH_CH_CH",
};

function WalkerConfig({ email, date }) {
  const [times, setTimes] = useState(init);

  const settedTimes = useRef(false);
  useEffect(() => {
    fetch("/api/get_walker_times", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, date }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.serviceTimes?.[date]) {
          setTimes(res.serviceTimes[date]);
          settedTimes.current = true;
        } else {
          setTimes(init);
          settedTimes.current = false;
        }
      })
      .catch(console.log);
  }, [date]);

  const upLoad = async () => {
    fetch("/api/upload_walker_times", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ times, email, date }),
    })
      .then((res) => res.json())
      .then((res) => {})
      .catch(console.log);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full rounded-2x">
      <div className="flex items-center w-full py-2 rounded-t-2xl justify-evenly">
        <button className="flex items-center p-2 text-2xl rounded-md shadow-btn bg-lime-900 justify-evenly hover:text-slate-200 text-slate-900">
          <FaDog />
        </button>
        <button
          onClick={upLoad}
          className="flex items-center p-2 text-2xl rounded-md shadow-btn bg-lime-900 justify-evenly hover:text-slate-200 text-slate-900"
        >
          <GoCloudUpload />
        </button>
        <button className="flex items-center p-2 text-2xl rounded-md shadow-btn bg-lime-900 justify-evenly hover:text-slate-200 text-slate-900">
          <AiOutlineSchedule />
        </button>
      </div>

      <div className="w-full rounded-2xl grow bg-slate-100/50">
        <WalkerServiceConfig
          times={times}
          updateTime={(e) => {
            setTimes((prev) => ({ ...prev, ...e }));
            settedTimes.current = true;
          }}
          settedTimes={settedTimes.current}
        />
      </div>
    </div>
  );
}

function WalkerServiceConfig({ updateTime, times, settedTimes }) {
  return (
    <div className="w-full h-full p-5 space-y-2">
      {Object.keys(times).map((e, i) => (
        <WalkerServiceItem
          timeTag={e}
          key={i}
          sizes={times[e]}
          updateTime={updateTime}
          settedTimes={settedTimes}
        />
      ))}
    </div>
  );
}

function WalkerServiceItem({ timeTag, sizes, updateTime, settedTimes }) {
  const getSize = (s) => {
    switch (s) {
      case "CH":
        return "text-sm";
      case "MD":
        return "text-xl";
      case "G":
        return "text-2xl";
    }
  };
  let s_arr = sizes.split("_");

  return (
    <div className="flex items-center justify-between w-full p-2 shadow-md hover:bg-slate-600/20">
      <span className="font-medium text-slate-900">{timeTag}</span>
      <div className="flex items-center justify-between space-x-3">
        {settedTimes && (
          <>
            <FaDog
              className={`${getSize(s_arr[0])} text-slate-700  self-end`}
            />
            <FaDog className={`${getSize(s_arr[1])} text-slate-700 self-end`} />
            <FaDog
              className={`${getSize(s_arr[2])}  text-slate-700 self-end `}
            />
          </>
        )}
        <select
          className="font-medium text-center rounded-md outline-none hover:cursor-pointer bg-slate-100 text-stale-900"
          onChange={(e) => {
            updateTime({ [timeTag]: e.target.value });
          }}
        >
          <option value="">{sizes}</option>
          <option value="CH_MD_G">{"CH_MD_G"}</option>
          <option value="CH_CH_CH">{"CH_CH_CH"}</option>
          <option value="MD_MD_MD">{"MD_MD_MD"}</option>
          <option value="G_G_G"> {"G_G_G"}</option>
          <option value="CH_CH_MD">{"CH_CH_MD"}</option>
          <option value="CH_CH_G">{"CH_CH_G"}</option>
          <option value="CH_MD_MD">{"CH_MD_MD"}</option>
          <option value="CH_G_G">{"CH_G_G"}</option>
          <option value="MD_MD_G">{"MD_MD_G"}</option>
          <option className="" value="MD_G_G">
            {"MD_G_G"}
          </option>
        </select>
      </div>
    </div>
  );
}

const mapStateToProps = ({ account }) => ({
  info: account.info,
});

export default connect(mapStateToProps)(Dashboard);
