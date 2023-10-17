import {useState} from 'react'
import {useEffect} from 'react'
import { Timer } from './Timer'

interface Exercise {
    id:string,
    title:string,
    completed:boolean;
}

interface InputProps {
    category: string;
}

export const InputPull = ({category}: InputProps) => {

    const [newEx, setNewEx] = useState("")
    const [exercise, setExercise] = useState<Exercise[]>(() => {
        const localValue = localStorage.getItem(`ITEMS${category}`) 
        if(localValue == null) return []

        return JSON.parse(localValue)
    })

    useEffect(() => {
        localStorage.setItem(`ITEMS${category}`, JSON.stringify(exercise))
    }, [exercise, category])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNewEx("")

        setExercise(currentExercise => {
            return [
                ...currentExercise,
                {id: crypto.randomUUID(), title: newEx, completed: false}
            ]
        })
    }

    const deleteExercise = (id: string) => {
        setExercise(currentExercise => {
            return currentExercise.filter(exercise => exercise.id !== id)
        })
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}> 
                <input type="text" value={newEx} onChange={((e) => setNewEx(e.target.value))} className="itemInput"/>
                <label className="itemLabel">Enter exercise here</label>   
            </form>
            <ul className="list">
                {exercise.map(exercise => {
                    return(
                     <li key={exercise.id} className="listItem">
                     <label className="bigLabel">
                         <input type="checkbox" className="check"/>
                         {exercise.title}
                     </label>
                     <button className="deleteBtn" onClick={() =>deleteExercise(exercise.id)}> Delete </button>
                     <Timer />
                     <hr></hr>
                     </li>
                )})}              
            </ul>         
        </>
    )
}