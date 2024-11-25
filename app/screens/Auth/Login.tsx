import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AuthForm } from './components/AuthForm'
import { ValidationForm } from './components/validationSchema'
import navigationService from '../../routes/navigationService'

const Login = () => {
  const handleRegisterNavigation = () => {
    navigationService.navigate("Register");
  };

  const onSubmit = (data: ValidationForm) => {
    console.log(data)
  }
  return (
    <View>
      <AuthForm mode={1} onSubmit={(data) => onSubmit(data)} />
      <View>
      <Text>Do not have an account?</Text>
        <TouchableOpacity onPress={handleRegisterNavigation}>
          <Text>Register</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login