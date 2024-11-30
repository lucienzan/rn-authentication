import { View } from 'react-native'
import React, { useState } from 'react'
import { AuthForm } from './components/AuthForm'
import { ValidationForm } from './components/validationSchema'
import { useAuthContext } from '../../contexts/AuthContext'

const Register = () => {
  const { onRegister } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ValidationForm) => {
    const result = await onRegister!(data.email, data.password);
    setIsLoading(true)
    if (result && result.error) {
      console.warn(result);
    }
  }

  return (
    <View>
      <AuthForm mode={2} onSubmit={(data) => onSubmit(data)} loading={isLoading} />
    </View>
  )
}

export default Register