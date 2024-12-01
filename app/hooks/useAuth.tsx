import { auth, dbConfig } from "../domain/firebaseConfig"
import { useEffect, useState } from "react"
import { sendEmailVerification } from "firebase/auth"
import { responseData } from "../model/response"
import { users } from "../model/user"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"

const useSendVerify = (isSend: boolean) => {
	const [loading, setLoading] = useState(false)
	const [response, setResponse] = useState<responseData>()

	useEffect(() => {
		if (isSend) {
			try {
				const sendVerification = async () => {
					setLoading(true)
					if (auth.currentUser) await sendEmailVerification(auth.currentUser)
					setResponse({
						code: 200,
						message: "We have sent you an email verification request. Please check your email inbox.",
						error: false,
					})
				}
				sendVerification()
			} catch (e: any) {
				setResponse({
					code: 400,
					message: e.message,
					error: true,
				})
			} finally {
				;() => setLoading(false)
			}
		}
	}, [isSend])

	return { loading, response }
}

const useCreateUserDoc = () => {
	const [loading, setLoading] = useState(false)
	const [response, setResponse] = useState<responseData>()
	const [data, setData] = useState<users>()

	useEffect(() => {
		if (data != null) {
			const createUser = async () => {
				const usersRef = collection(dbConfig, "users")
				const q = query(usersRef, where("email", "==", data.email))
				const querySnapshot = await getDocs(q)

				if (!querySnapshot.empty) {
					setResponse({
						code: 400,
						message: "Email already exists:",
						error: true,
					})
				} else {
					setDoc(doc(dbConfig, "users", data.id), {
						userId: data.id,
						email: data.email,
						name: data.name,
						address: data.address,
						provider: data.provider,
						verified: true,
						createdUserId: data.id,
						createDate: Date.now(),
					})
					setResponse({
						code: 200,
						message: "User created successfully.",
						error: true,
					})
				}
				setLoading(false)
			}
			createUser()
		}
	}, [data])

	return { loading, response, setData }
}

export { useSendVerify, useCreateUserDoc }
