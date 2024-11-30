import React, { useState } from 'react'
import { AuthForm } from './components/AuthForm'
import { ValidationForm } from './components/validationSchema'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthContext } from '../../contexts/AuthContext'
import { responseData } from '../../model/response'

const Login = () => {
  const { authState,onLogin } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  console.log(authState)
  const onSubmit = async (data: ValidationForm) => {
    setIsLoading(true)
    await onLogin!(data.email, data.password).then((res : responseData) => {
      if (res.code == 200) {
        console.log("login")
        return (res.data);
      }
      if (res && res.error) {
        console.warn(res.message);
      }
    }).finally(() => {
      setIsLoading(false);
    });
  }
  return (
    <SafeAreaView>
      <AuthForm mode={1} onSubmit={(data) => onSubmit(data)} loading={isLoading} />
    </SafeAreaView>
  )
}

export default Login