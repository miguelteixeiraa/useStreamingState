# useStreamingState

## How to use

1. yarn add -D use-streaming-state

```js
import { useStreamingState } from 'use-streaming-state'

useStreamingState(
    {
        reqInfo: 'http://localhost:8080',
        reqInit: {
            method: 'POST'
        },
        streamBuffer: true,
        dataSeparator: '\\n'
    },
    (state) => {
        console.log('incoming data from streaming', state)
    }
)
```
