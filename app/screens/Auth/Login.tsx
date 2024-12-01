import React, { useState } from "react"
import { AuthForm } from "./components/AuthForm"
import { ValidationForm } from "./components/validationSchema"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuthContext } from "../../contexts/AuthContext"
import { responseData } from "../../model/response"
import Verification from "../../components/verification"

const Login = () => {
	const { onLogin } = useAuthContext()
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState<responseData>()
	const [isRunning, setIsRunning] = useState<boolean>(true)
	const [timer, setTimer] = useState<number>(0)
	const [isShow, setIsShow] = useState<boolean | undefined>(false)

	const onSubmit = async (data: ValidationForm) => {
		setIsLoading(true)
		await onLogin!(data.email, data.password)
			.then((res: responseData) => {
				if (res && res.error && res.data?.isSendVerified) {
					setData(res)
					setIsShow(true)
					setTimer(60)
				}
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<SafeAreaView>
			<AuthForm mode={1} onSubmit={data => onSubmit(data)} loading={isLoading} />
      <Verification isShow={isShow} setIsShow={setIsShow} isStart={isRunning}
        setStart={setIsRunning} setTimer={setTimer} data={data!} timer={timer} />
		</SafeAreaView>
	)
}
export default Login
