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
  ActivityIndicator,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import authService from '../../services/authService';

const HalamanRegister = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // ── Validasi field kosong ──────────────────────────────────────────────
    if (!fullName || !username || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Silahkan isi semua kolom yang tersedia');
      return;
    }

    // ── Validasi format email ──────────────────────────────────────────────
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Format email tidak valid');
      return;
    }

    // ── Validasi nomor HP ──────────────────────────────────────────────────
    if (phone.length < 10) {
      Alert.alert('Error', 'Nomor WhatsApp minimal 10 digit');
      return;
    }

    // ── Validasi kecocokan password ────────────────────────────────────────
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Konfirmasi kata sandi tidak cocok');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Kata sandi minimal 6 karakter');
      return;
    }

    // ── Kirim ke API Laravel ───────────────────────────────────────────────
    setLoading(true);
    try {
      const response = await authService.register({
        name: fullName,
        username: username,
        email: email,
        phone: phone,
        password: password,
        passwordConfirmation: confirmPassword,
      });

      // Registrasi berhasil → arahkan user ke halaman login
      Alert.alert(
        '✅ Akun Berhasil Dibuat',
        'Silakan login dengan email dan password yang telah didaftarkan.',
        [
          {
            text: 'Login Sekarang',
            onPress: () => router.replace('/(auth)/login'),
          },
        ]
      );
    } catch (error) {
      console.log("VALIDATION ERROR:", error.message);
      Alert.alert("Gagal Daftar", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.mainContainer}>

            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/LOGO-PUPR2.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.logoTitle}>SIGAP MEMBANGUN NEGERI</Text>
            </View>

            {/* Title Section */}
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeTitle}>Daftar Akun Baru</Text>
              <Text style={styles.welcomeSubtitle}>Silahkan lengkapi data untuk mendaftar</Text>
            </View>

            {/* Form Section */}
            <View style={styles.form}>

              {/* Nama Lengkap */}
              <View style={styles.inputWrapper}>
                <FontAwesome name="user" size={20} color="#BFBFBF" style={styles.iconStyle} />
                <TextInput
                  style={styles.input}
                  placeholder="Nama Lengkap"
                  placeholderTextColor="#A0A0A0"
                  value={fullName}
                  onChangeText={setFullName}
                  editable={!loading}
                />
              </View>

              {/* Username */}
              <View style={styles.inputWrapper}>
                <FontAwesome name="user" size={20} color="#BFBFBF" style={styles.iconStyle} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#A0A0A0"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              {/* Email */}
              <View style={styles.inputWrapper}>
                <Ionicons name="mail" size={20} color="#BFBFBF" style={styles.iconStyle} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#A0A0A0"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              {/* Nomor WhatsApp */}
              <View style={styles.inputWrapper}>
                <Ionicons name="logo-whatsapp" size={20} color="#BFBFBF" style={styles.iconStyle} />
                <TextInput
                  style={styles.input}
                  placeholder="Nomor WhatsApp (Contoh: 0812...)"
                  placeholderTextColor="#A0A0A0"
                  value={phone}
                  onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
                  keyboardType="phone-pad"
                  maxLength={13}
                  editable={!loading}
                />
              </View>

              {/* Password */}
              <View style={styles.inputWrapper}>
                <FontAwesome name="lock" size={22} color="#BFBFBF" style={styles.iconStyle} />
                <TextInput
                  style={styles.input}
                  placeholder="Kata Sandi (min. 6 karakter)"
                  placeholderTextColor="#A0A0A0"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!loading}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={loading}>
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={22}
                    color="#BFBFBF"
                  />
                </TouchableOpacity>
              </View>

              {/* Konfirmasi Password */}
              <View style={styles.inputWrapper}>
                <FontAwesome name="lock" size={22} color="#BFBFBF" style={styles.iconStyle} />
                <TextInput
                  style={styles.input}
                  placeholder="Konfirmasi Kata Sandi"
                  placeholderTextColor="#A0A0A0"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  editable={!loading}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} disabled={loading}>
                  <Ionicons
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={22}
                    color="#BFBFBF"
                  />
                </TouchableOpacity>
              </View>

              {/* Tombol Daftar */}
              <TouchableOpacity
                style={[styles.mainButton, loading && styles.mainButtonDisabled]}
                onPress={handleRegister}
                activeOpacity={0.8}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#3B466D" size="small" />
                ) : (
                  <Text style={styles.mainButtonText}>Daftar Sekarang</Text>
                )}
              </TouchableOpacity>

              {/* Link ke Login */}
              <TouchableOpacity
                onPress={() => router.push('/(auth)/login')}
                style={styles.loginLink}
                disabled={loading}
              >
                <Text style={styles.loginLinkText}>
                  Sudah punya akun?{' '}
                  <Text style={{ fontWeight: 'bold', color: '#3B466D' }}>Masuk di sini</Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Spacer bawah */}
            <View style={{ height: 60 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContainer: {
    paddingHorizontal: 30,
    paddingTop: 40,
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 70,
  },
  logoTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#3B466D',
    marginTop: 5,
    letterSpacing: 1,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 55,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconStyle: {
    width: 30,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  mainButton: {
    backgroundColor: '#F3CE5A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  mainButtonDisabled: {
    opacity: 0.6,
  },
  mainButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B466D',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 14,
    color: '#666',
  },
});

export default HalamanRegister;