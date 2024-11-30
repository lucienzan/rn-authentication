import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { FormSchema, ValidationForm } from "./validationSchema"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import navigationService from "../../../routes/navigationService"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import Loading from "../../../components/loading"
import CustomKeyboardAvoid from "../../../components/customKeyboardAvoid"

type Props = {
	defaultValue?: ValidationForm
	mode: number
	onSubmit: (data: ValidationForm) => void
	loading: boolean
}

export const AuthForm: React.FC<Props> = ({ mode, onSubmit, loading }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationForm>({
		resolver: zodResolver(FormSchema),
	})

	const handleRegisterNavigation = () => {
		if (mode == 1) navigationService.navigate("Register")
		else navigationService.navigate("Login")
	}

	return (
		<View className="h-full w-full ps-4 pe-4 flex justify-around pt-20">
			<CustomKeyboardAvoid>
				<View className="pb-4">
					<Text className="pb-1">Email</Text>
					<View className="rounded-2xl w-full bg-black/5 p-5">
						<Controller
							control={control}
							name="email"
							render={({ field: { onChange, onBlur, value } }) => <TextInput className="" autoCapitalize="none"
              keyboardType={"email-address"} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="Enter your email" />}
						/>
					</View>
					{errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
				</View>
				<View className="pb-4 gap-3">
					<View>
						<Text className="pb-1">Password</Text>
						<View className="rounded-2xl w-full bg-black/5 p-5">
							<Controller
								control={control}
								name="password"
								render={({ field: { onChange, onBlur, value } }) => <TextInput onBlur={onBlur} secureTextEntry onChangeText={onChange} value={value} placeholder="Enter your password" />}
							/>
						</View>
						{errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
					</View>
					{mode == 1 ? (
						<TouchableOpacity className="self-end">
							<Text className="font-semibold text-neutral-700">Forgot Password?</Text>
						</TouchableOpacity>
					) : null}
				</View>
				{loading ? (
					<View className="flex justify-center items-center bg-purple-300 rounded-2xl">
						<Loading size={hp(6.6)} width={wp(30)} />
					</View>
				) : (
					<TouchableOpacity className=" bg-purple-400 p-5 rounded-2xl" onPress={handleSubmit(onSubmit)}>
						<Text className="text-center font-bold text-xl text-white">{mode == 1 ? "Sign In" : "Sign Up"}</Text>
					</TouchableOpacity>
				)}
				<View className="flex-row gap-2 self-center pt-5">
					<Text>{mode == 1 ? "Do not have an account?" : "Already have an account?"}</Text>
					<TouchableOpacity onPress={handleRegisterNavigation}>
						<Text style={{ fontSize: hp(1.3) }} className="text-purple-400 font-semibold">
							{mode == 1 ? "Sign Up" : "Sign In"}
						</Text>
					</TouchableOpacity>
				</View>
			</CustomKeyboardAvoid>
		</View>
	)
}
