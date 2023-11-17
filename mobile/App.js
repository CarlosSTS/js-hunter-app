import React from "react";
import { StatusBar } from "react-native";
import Routes from "./src/routes";
import SafeAreaView from "react-native-safe-area-view";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="#DA552F"
      />
      <Routes />
    </SafeAreaView>
  );
}
