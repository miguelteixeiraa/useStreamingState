import { parseResponse } from './utils/parseResponse'

export interface StreamingProps {
    reqInfo: RequestInfo
    reqInit: RequestInit
    dataSeparator?: string
    streamBuffer?: boolean
}

export interface OutputData {
    data: string[]
    done: boolean
}

export type StreamingOutput = (data: OutputData) => void

export const useStreamingState = (
    options: StreamingProps,
    stream: StreamingOutput
): void => {
    if (!options || !options.reqInfo) {
        throw new Error('should specify the request info')
    }

    let buffer: string[] = []

    fetch(options.reqInfo, options.reqInit ?? {})
        .then((response) => response.body)
        .then((rb) => {
            if (!rb) {
                stream({
                    data: [],
                    done: true
                })

                return
            }

            const reader = rb.getReader()

            return new ReadableStream({
                start(controller) {
                    function push() {
                        reader.read().then(({ done, value }) => {
                            if (done) {
                                if (options.streamBuffer) {
                                    stream({
                                        data: [...buffer],
                                        done: true
                                    })
                                } else {
                                    stream({
                                        data: [],
                                        done: true
                                    })
                                }

                                controller.close()
                                return
                            }

                            const incomingData = parseResponse(
                                value,
                                options.dataSeparator
                            )

                            if (incomingData) {
                                if (options.streamBuffer) {
                                    buffer = [...buffer, ...incomingData]
                                    stream({
                                        data: [...buffer],
                                        done: false
                                    })
                                } else {
                                    stream({
                                        data: [...incomingData],
                                        done: false
                                    })
                                }
                            }

                            push()
                        })
                    }

                    push()
                }
            })
        })
}
