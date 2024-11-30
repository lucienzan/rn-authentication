import { KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const CustomKeyboardAvoid = ({children}: {children: React.ReactNode}) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <ScrollView style={{ flex: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CustomKeyboardAvoid