import type { Store } from 'solid-js/store'
import { createStore, reconcile } from 'solid-js/store'
import { Accessor, SignalOptions, createSignal, onCleanup } from 'solid-js'
import { snapshot, subscribe } from 'valtio/vanilla'

function unwrap<T extends object>(proxyObject: T): T {
  return JSON.parse(JSON.stringify(proxyObject))
}

type Options<T extends object = {}> = {
  signal?: boolean
  signalOptions?: SignalOptions<T>
  unwrapFn?: (proxyObject: T) => T
}

type UseSnapshotReturn<T, O extends Options> = O['signal'] extends true ? Accessor<T> : Store<T>;

export function useSnapshot<T extends object, O extends Options>(proxyObject: T, options?: O): UseSnapshotReturn<T, O> {
  const unwrapFn = options?.unwrapFn ?? unwrap
  const initialState = unwrapFn(proxyObject)

  if (options?.signal) {
    const [state, setState] = createSignal(initialState, options.signalOptions)

    const close = subscribe(proxyObject, () => {
      const snap = snapshot(proxyObject)
      const updatedState = unwrapFn(snap as any)
      setState(updatedState)
    })

    onCleanup(close)

    return state as UseSnapshotReturn<T, O>
  }

  const [state, setState] = createStore(initialState)

  const close = subscribe(proxyObject, () => {
    const snap = snapshot(proxyObject)
    const updatedState = unwrap(snap as any)
    setState(reconcile(updatedState))
  })

  onCleanup(close)

  return state as UseSnapshotReturn<T, O>
}
