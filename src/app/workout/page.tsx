"use client"
import React from 'react'
import './workoutPage.css'
import { useSearchParams } from 'next/navigation';
const page = () => {
    const [workout, setWorkout] = React.useState<any>(null)
    const [data, setData] = React.useState<any>(null)
    const searchParams = useSearchParams()

    const workoutid = searchParams.get('id')



    const getworkout = async () => {
        // let data: any = {
        //     type: 'Chest',
        //     imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        //     durationInMin: 30,
        //     exercises: [
        //         {
        //             exercise: 'Flat Bench Press',
        //             videoUrl: 'https://gymvisual.com/img/p/1/7/5/5/2/17552.gif',
        //             sets: 3,
        //             reps: 10,
        //             rest: 60,
        //             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
        //         },
        //         {
        //             exercise: 'Incline Bench Press',
        //             videoUrl: 'https://gymvisual.com/img/p/1/0/3/9/8/10398.gif',
        //             sets: 3,
        //             reps: 10,
        //             rest: 60,
        //             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'

        //         },
        //         {
        //             exercise: 'Decline Bench Press',
        //             videoUrl: 'https://gymvisual.com/img/p/6/5/2/3/6523.gif',
        //             sets: 3,
        //             reps: 10,
        //             rest: 60,
        //             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'

        //         }
        //     ]
        // }

        // setWorkout(data)

        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutplans/workouts/' + workoutid, {
            method: 'GET',
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                setData(data.data)
            }
            else{
                setData(null)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    React.useEffect(() => {
        getworkout()
    }, [])
    return (
        <>
        {
            data &&
            <div className='workout'>
            <h1 className='mainhead1'> {data?.name} Day</h1>
            <div className='workout__exercises'>
                {
                    data?.exercises.map((item: any, index: number) => {
                        return (
                            <div className={
                                index % 2 === 0 ? 'workout__exercise' : 'workout__exercise workout__exercise--reverse'
                            }>
                                <h3>{index + 1}</h3>
                                <div className='workout__exercise__image'>
                                    <img src={item.imageURL} alt="" />
                                </div>
                                <div className='workout__exercise__content'>
                                    <h2>{item.name}</h2>
                                    <span>{item.sets} sets X {item.reps} reps</span>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        }
        </>
    )
}

export default page