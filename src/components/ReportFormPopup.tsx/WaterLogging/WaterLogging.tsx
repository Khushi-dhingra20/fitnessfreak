import React from 'react';
import '../popup.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';

interface WaterLoggingPopupProps {
  setShowWaterLoggingPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaterLoggingPopup: React.FC<WaterLoggingPopupProps> = ({ setShowWaterLoggingPopup }) => {
  const [date, setDate] = React.useState<any>(dayjs(new Date()));
  const [time, setTime] = React.useState<any>(dayjs(new Date()));

  const [waterIntake, setWaterIntake] = React.useState<any>({
    date: '',
    quantity: '',
    unit: 'ml',
  });

  const [items, setItems] = React.useState<any>([]);

  const getWaterIntake = async () => {
    setItems([]);
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/watertrack/getwaterintakebydate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        date: date,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setItems(data.data);
        } else {
          toast.error('Error in getting water intake');
        }
      })
      .catch((err) => {
        toast.error('Error in getting water intake');
        console.log(err);
      });
  };

  const saveWaterIntake = async () => {
    const formattedDate = date.format('YYYY-MM-DD');
    const formattedTime = time.format('HH:mm:ss');
    const finalDateTime = new Date(`${formattedDate} ${formattedTime}`);

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/watertrack/addwaterintake', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        date: finalDateTime,
        quantity: waterIntake.quantity,
        unit: waterIntake.unit,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          toast.success('Water intake added successfully');
          getWaterIntake();
        } else {
          toast.error('Error in adding water intake');
        }
      })
      .catch((err) => {
        toast.error('Error in adding water intake');
        console.log(err);
      });
  };

  const deleteWaterIntake = async (item: any) => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/watertrack/deletewaterintake', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        date: item.date,
        quantity: item.quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          toast.success('Water intake deleted successfully');
          getWaterIntake();
        } else {
          toast.error('Error in deleting water intake');
        }
      })
      .catch((err) => {
        toast.error('Error in deleting water intake');
        console.log(err);
      });
  };

  React.useEffect(() => {
    getWaterIntake();
  }, [date]);

  return (
    <div className="popupout">
      <div className="popupbox">
        <button
          className="close"
          onClick={() => {
            setShowWaterLoggingPopup(false);
          }}
        >
          <AiOutlineClose />
        </button>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={date}
            onChange={(newValue: any) => {
              setDate(newValue);
            }}
          />
        </LocalizationProvider>
        <TextField
          id="outlined-basic"
          label="Water quantity (ml)"
          variant="outlined"
          color="primary"
          type="number"
          onChange={(e) => {
            setWaterIntake({ ...waterIntake, quantity: e.target.value });
          }}
        />
        <div className="timebox">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Time picker"
              value={time}
              onChange={(newValue: any) => setTime(newValue)}
            />
          </LocalizationProvider>
        </div>
        <Button variant="contained" color="primary" onClick={saveWaterIntake}>
          Save
        </Button>

        <div className="hrline"></div>
        <div className="items">
          {items.map((item: any) => (
            <div className="item" key={item.date}>
              <h3>{item.quantity} {item.unit}</h3>
              <button
                onClick={() => {
                  deleteWaterIntake(item);
                }}
              >
                <AiFillDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaterLoggingPopup;