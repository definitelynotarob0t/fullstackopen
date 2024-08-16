import { useState } from 'react'

export const useField = () => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    value,
    onChange
  }
}

export const clearFields = () => {
    const [value, setValue] = useState('')

    return {
        value
    }
}

export default useField