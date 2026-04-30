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

    Alert.alert('Success', 'Kami telah mengirimkan kode pemulihan');
    navigation.navigate('VerifyCode');
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
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
            <TouchableOpacity onPress={handleBackToLogin} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Riset Kata Sandi</Text>
            <View style={styles.backButtonPlaceholder} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Description */}
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionTitle}>Masukan Email/Nomor WhatsApp Anda untuk menerima tautan pemulihan</Text>
              <Text style={styles.descriptionSubtitle}>Alamat Email atau Nomor WhatsApp</Text>
            </View>

            {/* Input Field */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Email atau Nomor WhatsApp"
                placeholderTextColor="#999"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                keyboardType="default"
              />
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              activeOpacity={0.7}
            >
              <Text style={styles.continueButtonText}>Lanjut Ke Pemulihan</Text>
            </TouchableOpacity>

            {/* Back to Login Link */}
            <TouchableOpacity onPress={handleBackToLogin} style={styles.backLink}>
              <Text style={styles.backLinkText}>Kembali ke Login?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  backButtonPlaceholder: {
    width: 40,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  descriptionSection: {
    marginBottom: 30,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    lineHeight: 20,
  },
  descriptionSubtitle: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 25,
    height: 50,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  input: {
    fontSize: 14,
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  backLink: {
    alignItems: 'center',
  },
  backLinkText: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '600',
  },
});

export default ResetPasswordScreen;
