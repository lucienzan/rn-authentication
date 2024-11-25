import { View } from 'react-native'
import React from 'react'
import { AuthForm } from './components/AuthForm'
import { ValidationForm } from './components/validationSchema'
import { useAuthContext } from '../../contexts/AuthContext'

const Register = () => {
  const { onRegister } = useAuthContext();
  const onSubmit = async (data: ValidationForm) => {
    const result = await onRegister!(data.email, data.password);
    if (result && result.error) {
      console.warn(result);
    }
  }

  return (
    <View>
      <AuthForm mode={2} onSubmit={(data) => onSubmit(data)} />
    </View>
  )
}

export default Register