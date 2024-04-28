"use client"
import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import './ReportPage.css'
import { AiFillEdit } from 'react-icons/ai'
import CaloriIntakePopup from '@/components/ReportFormPopup/CalorieIntake/CalorieIntakePopup';


const page = () => {
    return (
        <div className='reportpage'>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                ]}
                width={500}
                height={300}
            />
            
        </div>
        
        
    )
}

export default page