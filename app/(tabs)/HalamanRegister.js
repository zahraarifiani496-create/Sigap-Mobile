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
  Dimensions
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const HalamanRegister = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    // 1. Validasi field kosong
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Silahkan isi semua kolom yang tersedia');
      return;
    }

    // 2. Validasi format email sederhana
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Format email tidak valid');
      return;
    }

    // 3. Validasi panjang nomor WhatsApp (Minimal 10 digit)
    if (phone.length < 10) {
      Alert.alert('Error', 'Nomor WhatsApp minimal 10 digit');
      return;
    }

    // 4. Validasi kecocokan password
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Konfirmasi kata sandi tidak cocok');
      return;
    }

    // Jika semua validasi lolos, pindah ke HalamanBeranda
    Alert.alert('Success', 'Registrasi berhasil!', [
      { 
        text: 'OK', 
        onPress: () => navigation.replace('/HalamanBeranda') 
      }
    ]);
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
              
              {/* Nama Pengguna */}
              <View style={styles.inputWrapper}>
                <FontAwesome name="user" size={20} color="#BFBFBF" style={styles.iconStyle} />
                <TextInput
                  style={styles.input}
                  placeholder="Nama Pengguna"
                  placeholderTextColor="#A0A0A0"
                  value={fullName}
                  onChangeText={setFullName}
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
                />
              </View>

              {/* Password */}
              <View style={styles.inputWrapper}>
                <FontAwesome name="lock" size={22} color="#BFBFBF" style={styles.iconStyle} />
                <TextInput
                  style={styles.input}
                  placeholder="Kata Sandi"
                  placeholderTextColor="#A0A0A0"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? "eye" : "eye-off"} 
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
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons 
                    name={showConfirmPassword ? "eye" : "eye-off"} 
                    size={22} 
                    color="#BFBFBF" 
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.mainButton}
                onPress={handleRegister}
                activeOpacity={0.8}
              >
                <Text style={styles.mainButtonText}>Daftar Sekarang</Text>
              </TouchableOpacity>

              {/* Link ke Login */}
              <TouchableOpacity 
                onPress={() => navigation.navigate('/HalamanLogin')}
                style={styles.loginLink}
              >
                <Text style={styles.loginLinkText}>
                  Sudah punya akun? <Text style={{fontWeight: 'bold', color: '#3B466D'}}>Masuk di sini</Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Spacer bawah untuk scroll */}
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
  }
});

export default HalamanRegister;