"use client"

import { useEffect, useReducer } from "react"
import { rememberAction, getLastActions } from "@/lib/ai/memory"

interface AssistantState {
  suggestions: string[]
  lastAction: string | null
}

type Action =
  | { type: "SET_SUGGESTIONS"; payload: string[] }
  | { type: "SET_LAST_ACTION"; payload: string }

const initialState: AssistantState = {
  suggestions: [],
  lastAction: null,
}

function reducer(state: AssistantState, action: Action): AssistantState {
  switch (action.type) {
    case "SET_SUGGESTIONS":
      return { ...state, suggestions: action.payload }
    case "SET_LAST_ACTION":
      return { ...state, lastAction: action.payload }
    default:
      return state
  }
}

export function useAssistant() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const actions = getLastActions()
    if (actions.length > 0) {
      dispatch({ type: "SET_LAST_ACTION", payload: actions[actions.length - 1].action })
    }
  }, [])

  useEffect(() => {
    if (state.lastAction) rememberAction(state.lastAction)
  }, [state.lastAction])

  return {
    ...state,
    setSuggestions: (s: string[]) => dispatch({ type: "SET_SUGGESTIONS", payload: s }),
    setLastAction: (a: string) => dispatch({ type: "SET_LAST_ACTION", payload: a }),
  }
}
