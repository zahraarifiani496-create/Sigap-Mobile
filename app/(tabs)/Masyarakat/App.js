import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Halaman dengan path yang benar
import HalamanLogin from './HalamanLogin';
import HalamanRegister from './HalamanRegister';
import HalamanBeranda from './HalamanBeranda';
import HalamanLapor from './HalamanLapor';
import HalamanDetailRiwayat from './HalamanDetailRiwayat';
import HalamanRiwayat from './HalamanRiwayat';
import HalamanBantuan from './HalamanBantuan';
import HalamanProfil from './HalamanProfil';
import HalamanLupaSandi from './HalamanLupaSandi';
import HalamanKodePemulihan from './HalamanKodePemulihan';
import HalamanAturUlangSandi from './HalamanAturUlangSandi';
import HalamanSukses from './HalamanSukses';
import HalamanTerkirim from './HalamanTerkirim';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="HalamanLogin"
      >
        {/* Auth Screens */}
        <Stack.Screen name="HalamanLogin" component={HalamanLogin} />
        <Stack.Screen name="HalamanRegister" component={HalamanRegister} />
        <Stack.Screen name="HalamanLupaSandi" component={HalamanLupaSandi} />
        <Stack.Screen name="HalamanKodePemulihan" component={HalamanKodePemulihan} />
        <Stack.Screen name="HalamanAturUlangSandi" component={HalamanAturUlangSandi} />

        {/* Main Screens */}
        <Stack.Screen name="HalamanBeranda" component={HalamanBeranda} />
        <Stack.Screen name="HalamanLapor" component={HalamanLapor} />
        <Stack.Screen name="HalamanDetailRiwayat" component={HalamanDetailRiwayat} />
        <Stack.Screen name="HalamanRiwayat" component={HalamanRiwayat} />
        <Stack.Screen name="HalamanBantuan" component={HalamanBantuan} />
        <Stack.Screen name="HalamanProfil" component={HalamanProfil} />

        {/* Success/Confirmation Screens */}
        <Stack.Screen name="HalamanSukses" component={HalamanSukses} />
        <Stack.Screen name="HalamanTerkirim" component={HalamanTerkirim} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}