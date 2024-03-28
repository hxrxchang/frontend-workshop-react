import { FormEvent, useRef, useState } from 'react'
import './App.css'

type Task = {
  id: string
  name: string
  done: boolean
}

function genId() {
  return crypto.randomUUID()
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: genId(), name: 'hoge', done: true },
  ])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = inputRef.current?.value
    if (name) {
      const newTasks = [...tasks, { id: genId(), name, done: false }]
      setTasks(newTasks)
      inputRef.current.value = ''
    }
  }

  const [onlyNotDone, setOnlyNotDone] = useState(false)

  const filteredTasks = onlyNotDone ? tasks.filter((task) => !task.done) : tasks

  return (
    <div>
      <h1>TOOO</h1>
      <h2>My Tasks</h2>
      show only not finished tasks ?
      <input
        type="checkbox"
        checked={onlyNotDone}
        onChange={() => setOnlyNotDone(!onlyNotDone)}
      />
      {filteredTasks.length === 0 ? (
        <p>no tasks</p>
      ) : (
        <ul>
          {filteredTasks.map((task, _) => (
            <li key={task.id}>
              <div>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => {
                    const newTasks = tasks.map((t) => {
                      if (t.id === task.id) {
                        return { ...t, done: !t.done }
                      }
                      return t
                    })
                    setTasks(newTasks)
                  }}
                />
                <span>{task.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="write task" ref={inputRef} />
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default App
