import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // ✅ WAJIB

const HalamanLogin = () => {
  const router = useRouter(); // ✅ ganti navigation

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Silahkan isi semua field');
      return;
    }

    // ✅ PINDAH HALAMAN (BENAR)
    router.replace('/Masyarakat/HalamanBeranda');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inner}>

            {/* Logo */}
            <Image
              source={require('../../../assets/images/LOGO-PUPR2.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>SIGAP MEMBANGUN NEGERI</Text>

            {/* Welcome */}
            <Text style={styles.title}>Selamat Datang!</Text>
            <Text style={styles.subtitle}>
              Silahkan masuk untuk melanjutkan
            </Text>

            {/* Ilustrasi */}
            <Image
              source={require('../../../assets/images/orang.png')}
              style={styles.illustration}
              resizeMode="contain"
            />

            {/* Username */}
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#999" />
              <TextInput
                placeholder="Nama Pengguna"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#999" />
              <TextInput
                placeholder="Kata Sandi"
                style={styles.input}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Lupa Password */}
            <TouchableOpacity
              style={styles.forgot}
              onPress={() =>
                router.push('/Masyarakat/HalamanLupaSandi')
              }
            >
              <Text style={styles.forgotText}>Lupa Kata Sandi?</Text>
            </TouchableOpacity>

            {/* Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Masuk</Text>
            </TouchableOpacity>

            {/* Register */}
            <View style={styles.registerRow}>
              <Text style={styles.registerText}>Belum punya akun? </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push('/Masyarakat/HalamanRegister')
                }
              >
                <Text style={styles.registerLink}>Daftar Sekarang</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HalamanLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
  },
  inner: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 80,
    marginTop: 20,
  },
  logoText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  illustration: {
    width: '100%',
    height: 180,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    height: 50,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
  },
  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  forgotText: {
    color: '#2C3E50',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#E7B93E',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  registerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  registerText: {
    color: '#333',
  },
  registerLink: {
    color: '#E7B93E',
    fontWeight: '700',
  },
});