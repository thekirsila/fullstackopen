import { useState } from 'react'

const useForm = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    if (event) {
      setValue(event.target.value)
    } else {
      setValue('')
    }
  }

  return {
    type,
    value,
    onChange
  }
}

export default useForm