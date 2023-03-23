import { useState, ChangeEvent } from 'react';

type InputOptionsKey = 'required' | 'pattern' | 'minLength' | 'min'

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
    setValue(e.target.value)
    const required = options.find(op => op.key === 'required')
    for (let option of options) {
      if (option.key === 'pattern' && !e.target.value.match(option.value) && e.target.value.length !== 0) {
        setError(option.error)
      } else if (option.key === 'minLength' && e.target.value.length <= option.value && e.target.value.length !== 0) {
        setError(option.error)
      } else if (required && !e.target.value.length) {
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