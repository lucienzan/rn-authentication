import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "."

let navObj: StackNavigationProp<RootStackParamList> | null = null

function setGlobalRef(ref: any) {
	navObj = ref
}

function navigate(path: any, props = {}) {
	navObj?.navigate(path, props as any)
}

function goBack() {
	navObj?.goBack()
}

export default {
	setGlobalRef,
	navigate,
	goBack,
}
