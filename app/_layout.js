import { Stack } from "expo-router";
import { LaporanProvider } from "../context/LaporanContext";

export default function RootLayout() {
  return (
    <LaporanProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LaporanProvider>
  );
}