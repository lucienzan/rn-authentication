import { View } from 'react-native'
import React, { useState } from 'react'
import { AuthForm } from './components/AuthForm'
import { ValidationForm } from './components/validationSchema'
import { useAuthContext } from '../../contexts/AuthContext'
import { responseData } from '../../model/response'

const Register = () => {
  const { onRegister } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState<boolean | null | undefined>(false);

  const onSubmit = async (data: ValidationForm) => {
    setIsLoading(true)
    await onRegister!(data.email, data.password).then((res : responseData) => {
      if (res.code == 200) {
        setIsVerified(res.data.verified);
      }
      if (res && res.error) {
        console.warn(res.message);
      }
    }).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <View>
      <AuthForm mode={2} onSubmit={(data) => onSubmit(data)} loading={isLoading} />
    </View>
  )
}

export default Register