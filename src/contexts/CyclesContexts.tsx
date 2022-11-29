import { createContext, ReactNode, useReducer, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface ICyclesContext {
  cycles: ICycle[]
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  handleAmountSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as ICyclesContext)

interface CycleContextProviderProps {
  children: ReactNode
}

interface CyclesState {
  cycles: ICycle[]
  activeCycleId: string | null
}

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      if (action.type === 'ADD_NEW_CYCLE') {
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        }
      }

      if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() }
            }
            return cycle
          }),
          activeCycleId: null,
        }
      }

      return state
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { activeCycleId, cycles } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     }
    //     return cycle
    //   }),
    // )
  }

  function handleAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: ICycle = {
      id: new Date().getTime().toString(),
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })

    // setCycles((state) => [...state, newCycle])
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        handleAmountSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
