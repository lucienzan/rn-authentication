import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import Home from "../screens/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import navigationService from "./navigationService";
import { useAuthContext } from "../contexts/AuthContext";
import { Button } from "react-native";

const NavigationStack = createStackNavigator<RootStackParamList>()

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const ContentStack = () => {
  const { authState, onLogout } = useAuthContext();
  return (
    <NavigationStack.Navigator initialRouteName={authState?.authenticated ? "Home" : "Login"}>
      <NavigationStack.Screen name="Login" component={Login} />
      <NavigationStack.Screen name="Register" component={Register} />
      <NavigationStack.Screen name="Home" component={Home} options={{ headerRight: () => <Button onPress={onLogout} title="logout"/> }} />
    </NavigationStack.Navigator>
  );
};

const AppContainer = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={ref => {
          navigationService.setGlobalRef(ref);
        }}
      >
        <ContentStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppContainer
