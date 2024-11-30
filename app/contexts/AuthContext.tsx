import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import * as SecureStore from "expo-secure-store"
import { doc, setDoc } from "firebase/firestore"
import {  auth, dbConfig } from "../domain/firebaseConfig"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { authState, responseData } from "../model/response"

interface AuthProps {
	authState?: authState
	onRegister?: (email: string, password: string) => Promise<any>
	onLogin?: (email: string, password: string) => Promise<any>
  onLogout?: () => Promise<any>
}

const AuthContext = createContext<AuthProps>({})
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [authState, setAuthState] = useState<authState>({ authenticated: false, verified: null })

	useEffect(() => {
		const onLoadData = async () => {
      await onAuthStateChanged(auth, user => {
        if (user !== null && user.emailVerified) {
						setAuthState({  authenticated: true, verified: auth.currentUser?.emailVerified })
					} else {
						setAuthState({ authenticated: false, verified: auth.currentUser?.emailVerified })
					}
				})
		}
		onLoadData()
	}, [])

	const onRegister = async (email: string, password: string) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
				.then(userCredential => {
					return userCredential
				})
				.catch(error => {
					const errorMessage = error.message
					switch (error.code) {
						case "auth/weak-password":
							throw new Error("The password provided is too weak.")
						case "auth/email-already-in-use":
							throw new Error("The account already exists for that email.")
						case "auth/invalid-email":
							throw new Error("The email address is not valid.")
						case "auth/user-not-found":
							throw new Error("No user found with that email address.")
						case "auth/wrong-password":
							throw new Error("Incorrect password.")
						default:
							throw new Error(`Firebase Auth Error: ${errorMessage}`)
					}
				})
      await sendEmailVerification(userCredential.user);
      setAuthState({ authenticated: false, verified: false, isSendVerified: true })
      const response: responseData = {
        error: false,
        code: 200,
        data: authState,
        message: "Registration successful. Please check your email for verification."
        }
        return response
		} catch (e) {
			return { error: true, message: (e as any).response.data.msg }
		}
	}

	const onLogin = async (email: string, password: string) => {
		try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      let response: responseData;
      if (!userCredential.user.emailVerified) {
        setAuthState({ authenticated: false, verified: false, isSendVerified: true });
        await signOut(auth);
        return response = {
          error: true,
          code: 400,
          data: authState,
          message: "Please verify your email before logging in."
        }
      }
     return response = {
        error: false,
        code: 200,
        data: { authenticated: true, verified: true },
        message: "Welcome Back"
      }
		} catch (e) {
			return { error: true, message: (e as any).response.data.msg }
		}
	}

  const onLogout = async () => {
    await signOut(auth);
	}

	const value = {
		onRegister,
		onLogin,
		onLogout,
		authState
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuthContext must be used within a AuthProvider")
	}
	return context
}

export default AuthContext
