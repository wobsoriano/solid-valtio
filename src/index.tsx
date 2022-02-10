import { subscribe, snapshot } from 'valtio/vanilla';
import { createStore, reconcile, Store } from 'solid-js/store';
import { onCleanup } from 'solid-js';

function unproxy(proxyObject: Record<any, any>) {
  return JSON.parse(JSON.stringify(proxyObject));
}

export function useSnapshot<T extends object>(proxyObject: T) {
  const [state, setState] = createStore(unproxy(proxyObject));

  const close = subscribe(proxyObject, () => {
    const snap = snapshot(proxyObject);
    setState(reconcile(unproxy(snap)));
  });

  onCleanup(close);

  return state as Store<T>;
}
