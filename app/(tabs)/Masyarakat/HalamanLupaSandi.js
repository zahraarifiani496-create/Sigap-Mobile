import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ResetPasswordScreen = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleContinue = () => {
    if (!emailOrPhone) {
      Alert.alert('Error', 'Silahkan masukkan Email atau Nomor WhatsApp');
      return;
    }

    Alert.alert('Success', 'Kode pemulihan dikirim');
    navigation.navigate('HalamanKodePemulihan');
  };

  const handleBackToLogin = () => {
    navigation.navigate('HalamanLogin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackToLogin}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Reset Kata Sandi</Text>

            <View style={{ width: 24 }} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.description}>
              Masukkan Email atau Nomor WhatsApp untuk menerima kode pemulihan
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email / Nomor WhatsApp"
              placeholderTextColor="#999"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
            />

            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Lanjut Ke Pemulihan</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleBackToLogin}>
              <Text style={styles.backText}>Kembali ke Login</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#2C3E50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  backText: {
    textAlign: 'center',
    color: '#0066CC',
    fontWeight: '600',
  },
});