import { proxy, useSnapshot } from '../src'

const state = proxy({ count: 0 })

function Counter() {
  const snap = useSnapshot(state)

  return (
    <div>
      <button onClick={() => ++state.count}>{snap.count}</button>
    </div>
  )
}

function App() {
  return (
    <Counter />
  )
}

export default App
