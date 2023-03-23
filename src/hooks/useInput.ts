import { useState, ChangeEvent } from 'react';

type InputOptionsKey = 'required' | 'pattern' | 'minLength' | 'min' | 'length'

interface IInputOptions {
  key: InputOptionsKey,
  value?: any,
  error: string
}

interface useInputProps {
  initialErrorMessage: string
  options: IInputOptions[]
}

export const useInput = ({ options, initialErrorMessage }: useInputProps) => {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>(initialErrorMessage)
  const [isDirty, setIsDirty] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const required = options.find(op => op.key === 'required')
    const currentValue = e.target.value
    setValue(currentValue)

    for (let option of options) {
      if (option.key === 'pattern' && !option.value.test(currentValue) && currentValue.length !== 0) {
        setError(option.error)
        break
      } else if (option.key === 'minLength' && currentValue.length <= option.value && currentValue.length !== 0) {
        setError(option.error)
        break
      } else if (option.key === 'min' && currentValue.length !== 0 && +currentValue <= option.value) {
        setError(option.error)
        break
      } else if (option.key === 'length' && currentValue.length !== 0 && currentValue.length !== option.value) {
        setError(option.error)
        break
      } else if (required && !currentValue.length) {
        setError(required.error)
      } else {
        setError('')
      }
    }
  }

  const onBlur = () => {
    setIsDirty(true)
  }

  return { value, error, isDirty, onChange, onBlur }
}