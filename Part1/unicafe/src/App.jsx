import { useState } from 'react'

const Statistics = (props) => {
  console.log(props)
const all = props.good + props.neutral + props.bad
const avg = (props.good  + props.bad*-1)/(props.good + props.neutral + props.bad)
const pos1 = (100*props.good)/(props.good + props.neutral + props.bad)
const pos = (pos1) + " %"

if (all==0) {
return(<p>No feedback given</p>
)}

 return(
  <table>
   <tbody>
  <StatisticLine text="good" value ={props.good} />
  <StatisticLine text="neutral" value ={props.neutral} />
  <StatisticLine text="bad" value ={props.bad} />
  <StatisticLine text="all" value ={all} />
  <StatisticLine text="avg" value ={avg} />
  <StatisticLine text="pos" value ={pos} />
  </tbody>
  </table>)}

const StatisticLine = (props) => {
  return (
    
    <tr>
      <td>{props.text} </td>
      <td> {props.value}</td>
     </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)}
    const handleNeutral = () => {
      setNeutral(neutral + 1)}
      const handleBad = () => {
        setBad(bad + 1)}

  

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
  
      <h1>statistics</h1>
     
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App