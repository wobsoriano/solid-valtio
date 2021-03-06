import type { Store } from 'solid-js/store'
import { createStore, reconcile } from 'solid-js/store'
import { onCleanup } from 'solid-js'
import { snapshot, subscribe } from 'valtio/vanilla'
import { klona } from 'klona/json'

export function useSnapshot<T extends object>(proxyObject: T) {
  const initialState = klona(proxyObject)
  const [state, setState] = createStore(initialState)

  const close = subscribe(proxyObject, () => {
    const snap = snapshot(proxyObject)
    const updatedState = klona(snap) as any
    setState(reconcile(updatedState))
  })

  onCleanup(close)

  return state as Store<T>
}
