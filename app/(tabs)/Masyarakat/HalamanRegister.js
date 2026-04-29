import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Image, StyleSheet, ScrollView, StatusBar, Dimensions, Alert
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Register() {

  const router = useRouter();

  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [wa, setWa] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = () => {

    const waRegex = /^[0-9]{12,13}$/;
    if (!waRegex.test(wa)) {
      Alert.alert('Error', 'Nomor WhatsApp harus 12-13 digit angka');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Email harus mengandung @');
      return;
    }

    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    if (!passRegex.test(password)) {
      Alert.alert(
        'Error',
        'Password minimal 5 karakter dan harus kombinasi huruf & angka'
      );
      return;
    }

    if (password !== confirm) {
      Alert.alert('Error', 'Konfirmasi password tidak sama');
      return;
    }

    Alert.alert('Sukses', 'Registrasi berhasil!');
    router.replace('/HalamanMasuk');
  };

  const handleGoogle = () => {
    Alert.alert(
      'Pilih Akun Google',
      'contoh@gmail.com',
      [
        {
          text: 'Gunakan akun ini',
          onPress: () => router.replace('./HalamanBeranda')
        },
        { text: 'Batal', style: 'cancel' }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <Image
          source={require('../../../assets/images/LOGO-PUPR2.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>Daftar Akun Baru</Text>
        <Text style={styles.subtitle}>Silahkan masuk untuk melanjutkan</Text>

        {/* NAMA */}
        <View style={styles.inputBox}>
          <Ionicons name="person" size={20} color="#999" />
          <TextInput
            placeholder="Nama Pengguna"
            style={styles.input}
            value={nama}
            onChangeText={setNama}
          />
        </View>

        {/* EMAIL */}
        <View style={styles.inputBox}>
          <MaterialIcons name="email" size={20} color="#999" />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* WHATSAPP */}
        <View style={styles.inputBox}>
          <FontAwesome name="whatsapp" size={20} color="#999" />
          <TextInput
            placeholder="Nomor WhatsApp"
            keyboardType="numeric"
            maxLength={13}
            style={styles.input}
            value={wa}
            onChangeText={setWa}
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed" size={20} color="#999" />
          <TextInput
            placeholder="Kata Sandi"
            secureTextEntry={!showPass}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Ionicons name={showPass ? 'eye' : 'eye-outline'} size={20} />
          </TouchableOpacity>
        </View>

        {/* KONFIRMASI */}
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed" size={20} color="#999" />
          <TextInput
            placeholder="Konfirmasi Kata Sandi"
            secureTextEntry={!showConfirm}
            style={styles.input}
            value={confirm}
            onChangeText={setConfirm}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Ionicons name={showConfirm ? 'eye' : 'eye-outline'} size={20} />
          </TouchableOpacity>
        </View>

        {/* BUTTON DAFTAR */}
        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.registerText}>Daftar</Text>
        </TouchableOpacity>

        {/* GOOGLE */}
        <TouchableOpacity style={styles.googleBtn} onPress={handleGoogle}>
          <Image
            source={require('../../../assets/images/google.png')}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Masuk dengan Google</Text>
        </TouchableOpacity>

        {/* KEMBALI */}
        <TouchableOpacity onPress={() => router.replace('./App')}>
          <Text style={styles.backText}>← Kembali ke Login</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 120, // 🔥 FIX SCROLL
    backgroundColor: '#F5F5F5',
  },

  logo: {
    width: width * 0.6,
    height: 80,
    alignSelf: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },

  input: {
    flex: 1,
    marginLeft: 10,
  },

  registerBtn: {
    backgroundColor: '#E6B84C',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  registerText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B3990',
    padding: 12,
    borderRadius: 25,
    marginTop: 20,
    justifyContent: 'center',
  },

  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },

  googleText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  backText: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 40,
    color: '#2B3990',
    fontWeight: 'bold',
  },
});