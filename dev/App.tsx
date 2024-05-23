import { Suspense } from 'solid-js'
import { proxy, useSnapshot } from '../src'

const state = proxy({ count: 0 })

// const stateWithFetch = proxy({ post: fetch('https://dummyjson.com/todos/1').then((res) => res.json()) })

// function Post() {
//   const snap = useSnapshot(stateWithFetch)
//   return <div>{snap.post.todo}</div>
// }

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
    <>
      <Counter />
      {/* <Suspense fallback={<div>Loading...</div>}>
        <Post />
      </Suspense> */}
    </>
  )
}

export default App
