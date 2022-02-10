# solid-valtio

💊 Valtio state for Solid

## Quick start

Install it:

```bash
pnpm add valtio solid-valtio
```

Use it:

```tsx
import { proxy } from 'valtio/vanilla';
import { useSnapshot } from 'solid-valtio';

const state = proxy({ count: 0 });

function Counter() {
  const snap = useSnapshot(state);
  return (
    <div>
      {snap.count}
      <button onClick={() => ++state.count}>+1</button>
    </div>
  );
}
```

## License

MIT License © 2022 [Robert Soriano](https://github.com/wobsoriano)
