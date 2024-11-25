import { AuthProvider } from "./app/contexts/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppContainer from "./app/routes";

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
     <AppContainer/>
    </AuthProvider>
  );
}