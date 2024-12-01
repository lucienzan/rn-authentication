import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import PopupAlert from "./popup"
import { responseData } from "../model/response"
import { useSendVerify } from "../hooks/useAuth"

interface props {
	data: responseData
	isStart: boolean
	setStart: React.Dispatch<React.SetStateAction<boolean>>
	timer: number
	setTimer: React.Dispatch<React.SetStateAction<number>>
	isShow: boolean | undefined
	setIsShow: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

const Verification: React.FC<props> = ({ data, isStart, setStart, timer, setTimer, isShow, setIsShow }) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const { loading, response } = useSendVerify(isTriggered);

  useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (isStart && timer > 0) {
			interval = setInterval(() => {
				setTimer(prev => prev - 1)
			}, 1000)
		} else {
			if (interval) clearInterval(interval)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isStart, timer])

  const handleResend = () => {
    setIsTriggered(true);
    console.log(response);
		setTimer(60)
		setStart(true)
	}

	return (
		<PopupAlert dispaly={isShow} setDisplay={setIsShow} btn1={"Okay"}>
			<View style={styles.container}>
				<Image style={styles.logo} source={require("../../assets/img/img_logo.png")} />
				<Text style={styles.title}>Please check your email</Text>
				<Text style={styles.message} numberOfLines={4} ellipsizeMode="tail">
					We've sent a code to {data?.data?.email}
				</Text>
				<View style={styles.resendContainer}>
					<Text style={styles.resendText}>Didn't receive the code?</Text>
					{timer > 0 ? (
						<Text style={styles.resendText}>{`Resend in ${timer} seconds`}</Text>
					) : (
						<TouchableOpacity onPress={handleResend}>
							<Text style={styles.resendLink}>Click to resend.</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</PopupAlert>
	)
}

export default Verification

const styles = StyleSheet.create({
	container: {
		padding: 16,
		alignItems: "center",
	},
	logo: {
		width: wp(14),
		height: hp(6),
	},
	title: {
		fontSize: 24,
		fontWeight: "600",
		paddingTop: 24,
	},
	message: {
		color: "#6b7280",
		fontWeight: "600",
		marginTop: 8,
		textAlign: "center",
		lineHeight: 20,
	},
	resendContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 25,
		gap: 8,
	},
	resendText: {
		color: "#6b7280",
	},
	resendLink: {
		color: "#6b7280",
		textDecorationLine: "underline",
	},
})
