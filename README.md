# solid-valtio

[![npm (tag)](https://img.shields.io/npm/v/solid-valtio?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/solid-valtio) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/solid-valtio?style=flat&colorA=000000&colorB=000000) ![NPM](https://img.shields.io/npm/l/solid-valtio?style=flat&colorA=000000&colorB=000000)

💊 State management in Solid with [valtio](https://github.com/pmndrs/valtio).

## Quick start

Install it:

```bash
npm install solid-valtio
```

Use it:

```tsx
import { proxy, useSnapshot } from 'solid-valtio'

const state = proxy({ count: 0 })

function Counter() {
  const snap = useSnapshot(state)
  return (
    <div>
      {snap.count}
      <button onClick={() => ++state.count}>+1</button>
    </div>
  )
}
```

You can also use utils like [proxyWithComputed](https://github.com/pmndrs/valtio#proxywithcomputed-util):

```tsx
import { proxyWithComputed } from 'valtio/utils'

const state = proxyWithComputed(
  {
    count: 1,
  },
  {
    doubled: snap => snap.count * 2,
  },
)

// Computed values accept custom setters too:
const state2 = proxyWithComputed(
  {
    firstName: 'Alec',
    lastName: 'Baldwin',
  },
  {
    fullName: {
      get: snap => `${snap.firstName} ${snap.lastName}`,
      set: (state, newValue) => {
        [state.firstName, state.lastName] = newValue.split(' ')
      },
    },
  },
)

// if you want a computed value to derive from another computed, you must declare the dependency first:
const state = proxyWithComputed(
  {
    count: 1,
  },
  {
    doubled: snap => snap.count * 2,
    quadrupled: snap => snap.doubled * 2,
  },
)
```

## License

MIT
