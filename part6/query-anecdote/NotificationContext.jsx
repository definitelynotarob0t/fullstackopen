import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
  case "VOTE":
      return `Voted for "${action.payload.content}"`
  case "CLEAR":
    return null
  case "ERROR":
    return "Anecdote too short - must have 5 or more characters"
  default:
    return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null) 
  // initialises notificationValue as null
  // notificationDispatch: A dispatch function that when called, will update the notification's state by sending actions to notificationReducer

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children} 
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => { // Custom hook that provides access the notification state from the context.
  const context = useContext(NotificationContext) // retrieves the current context value - [notification, notificationDispatch]
  return context[0] // returns the notification state value

}
 
export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)
  return context[1] // returns notificationDispatch
}

export default NotificationContext