import { ChangeEvent, useState } from 'react'

interface ObjectType {
  [key: string]: string
}

interface UseFormProps<T> {
  initialValues: T
  onSubmit: (values: T) => void
  validate?: (values: T) => T | ObjectType
}

const useForm = <T extends ObjectType>({
  initialValues,
  onSubmit,
  validate,
}: UseFormProps<T>) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Record<string, unknown>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleRemove = (name: string) => {
    setValues({ ...values, [name]: '' })
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()

    const newErrors = validate ? validate(values) : {}

    if (Object.keys(newErrors).length === 0) {
      await onSubmit({ ...values, e })
    }

    setErrors(newErrors)
    setIsLoading(false)
  }

  return {
    values,
    errors,
    isLoading,
    handleRemove,
    handleChange,
    handleSubmit,
  }
}

export default useForm
