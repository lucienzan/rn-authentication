import React, { useState } from 'react'
import { AuthForm } from './components/AuthForm'
import { ValidationForm } from './components/validationSchema'
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (data: ValidationForm) => {
    setIsLoading(true)
    console.log(data)
  }
  return (
    <SafeAreaView>
      <AuthForm mode={1} onSubmit={(data) => onSubmit(data)} loading={isLoading} />
    </SafeAreaView>
  )
}

export default Login