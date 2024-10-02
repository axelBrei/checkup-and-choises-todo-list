import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "./global.css";
import "tailwindcss/tailwind.css";

import { TasksScreen } from "~/screens/TasksScreen";
import { TasksProvider } from "~/context";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />

      <TasksProvider>
        <TasksScreen />
      </TasksProvider>
    </SafeAreaProvider>
  );
}
