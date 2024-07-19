import React from 'react';
import '../popup.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

interface CaloriIntakePopupProps {
  setShowCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalorieIntakePopup: React.FC<CaloriIntakePopupProps> = ({ setShowCalorieIntakePopup }) => {
  const color = '#ffc20e';

  const [date, setDate] = React.useState<any>(dayjs(new Date()));
  const [time, setTime] = React.useState<any>(dayjs(new Date()));

  const [calorieIntake, setCalorieIntake] = React.useState<any>({
    item: '',
    date: '',
    quantity: '',
    quantitytype: 'g'
  });

              // body :[ {
            //     "name": "rice",
            //     "calories": 127.4,
            //     "serving_size_g": 100,
            //     "fat_total_g": 0.3,
            //     "fat_saturated_g": 0.1,
            //     "protein_g": 2.7,
            //     "sodium_mg": 1,
            //     "potassium_mg": 42,
            //     "cholesterol_mg": 0,
            //     "carbohydrates_total_g": 28.4,
            //     "fiber_g": 0.4,
            //     "sugar_g": 0.1
            // }]

  const [items, setItems] = React.useState<any>([]);

  const saveCalorieIntake = async () => {
    try {
      let tempdate = date.format('YYYY-MM-DD');
      let temptime = time.format('HH:mm:ss');
      let tempdatetime = tempdate + ' ' + temptime;
      let finaldatetime = new Date(tempdatetime);
  
      console.log("Final datetime:", finaldatetime);
  
      // Ensure quantity is a number
      const quantity = parseFloat(calorieIntake.quantity);
      if (isNaN(quantity)) {
        toast.error('Quantity must be a number');
        return;
      }
  
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/addcalorieintake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          item: calorieIntake.item,
          date: finaldatetime,
          quantity: quantity,
          quantitytype: calorieIntake.quantitytype,
        }),
      });
  
      const data = await response.json();
      if (data.ok) {
        toast.success('Calorie intake added successfully');
        getCalorieIntake();
      } else {
        toast.error(`Error in adding calorie intake: ${data.message || 'Unknown error'}`);
      }
    } catch (err) {
      toast.error('Error in adding calorie intake');
      console.log(err);
    }
  };
  
  const getCalorieIntake = async () => { };
  const deleteCalorieIntake = async (item: any) => { };

  React.useEffect(() => {
    getCalorieIntake();
  }, [date]);

  const selectedDay = (val: any) => {
    setDate(val);
  };

  return (
    <div className='popupout'>
      <div className='popupbox'>
        <button className='close' onClick={() => setShowCalorieIntakePopup(false)}>
          <AiOutlineClose />
        </button>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={date}
            onChange={(newValue: any) => selectedDay(newValue)}
          />
        </LocalizationProvider>

        <TextField
          id="food-item-name"
          label="Food item name"
          variant="outlined"
          color="warning"
          onChange={(e) => setCalorieIntake({ ...calorieIntake, item: e.target.value })}
        />
        <TextField
          id="food-item-amount"
          label="Food item amount (in gms)"
          variant="outlined"
          color="warning"
          onChange={(e) => setCalorieIntake({ ...calorieIntake, quantity: e.target.value })}
        />

        <div className='timebox'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Time picker"
              value={time}
              onChange={(newValue: any) => setTime(newValue)}
            />
          </LocalizationProvider>
        </div>
        <Button variant="contained" color="warning" onClick={saveCalorieIntake}>
          Save
        </Button>

        <div className='hrline'></div>
        <div className='items'>
          {
          items.map((item: any) => {
            return(
              <div className='item'>
                <h3>{items.item}</h3>
                <h3>{items.quantity} {items.quantitytype}</h3>
                <button onClick={() => {
                  deleteCalorieIntake(item)
                }}
                > <AiFillDelete /></button>
                </div>
            )
          })
          }
      </div>
    </div>
    </div>
  );
};

export default CalorieIntakePopup;
