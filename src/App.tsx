import {useState} from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold underline">annorepo-dashboard</h1>
      {count} <button type="button" onClick={() => setCount(count + 1)}>+</button>
    </>
  )
}

export default App
