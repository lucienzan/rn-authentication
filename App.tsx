import { AuthProvider } from "./app/contexts/AuthContext";
import AppContainer from "./app/routes";
import "./global.css";

export default function App() {
  return (
    <AuthProvider>
     <AppContainer/>
    </AuthProvider>
  );
}