import React from 'react'
import { AuthForm } from './components/AuthForm'
import { ValidationForm } from './components/validationSchema'
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {
  const onSubmit = (data: ValidationForm) => {
    console.log(data)
  }
  return (
    <SafeAreaView>
      <AuthForm mode={1} onSubmit={(data) => onSubmit(data)} />
    </SafeAreaView>
  )
}

export default Login