import { createStore, reconcile, Store, unwrap } from 'solid-js/store';
import { onCleanup } from 'solid-js';
import { subscribe, snapshot } from 'valtio/vanilla';

export function useSnapshot<T extends object>(proxyObject: T) {
  const [state, setState] = createStore(unwrap(proxyObject));

  const close = subscribe(proxyObject, () => {
    const snap = snapshot(proxyObject);
    setState(reconcile(unwrap(snap)));
  });

  onCleanup(close);

  return state as Store<T>;
}
