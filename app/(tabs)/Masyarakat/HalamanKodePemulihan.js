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

const VerifyCodeScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = React.useRef([]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) {
      // Paste handling
      const newCode = value.split('').slice(0, 6);
      setCode(newCode.concat(Array(6 - newCode.length).fill('')));
      inputs.current[Math.min(newCode.length, 5)]?.focus();
    } else {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      Alert.alert('Error', 'Silahkan masukkan 6 digit kode');
      return;
    }

    Alert.alert('Success', 'Kode verifikasi berhasil!');
    navigation.navigate('NewPassword');
  };

  const handleRequestNewCode = () => {
    Alert.alert('Success', 'Kode pemulihan baru telah dikirim');
  };

  const handleBackToReset = () => {
    navigation.navigate('ResetPassword');
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
            <TouchableOpacity onPress={handleBackToReset} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Masukan Kode Pemulihan</Text>
            <View style={styles.backButtonPlaceholder} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Description */}
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionTitle}>Silahkan masukan 6 digit kode pemulihan yang kami kirimkan ke Email/Nomor yang Didisplay</Text>
            </View>

            {/* Code Input */}
            <View style={styles.codeInputContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref)}
                  style={styles.codeInput}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(value) => handleCodeChange(index, value)}
                  onKeyPress={(e) => handleKeyPress(index, e)}
                  placeholder="-"
                  placeholderTextColor="#DDD"
                />
              ))}
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerify}
              activeOpacity={0.7}
            >
              <Text style={styles.verifyButtonText}>Verifikasi Kode</Text>
            </TouchableOpacity>

            {/* Request New Code Link */}
            <TouchableOpacity onPress={handleRequestNewCode} style={styles.requestCodeLink}>
              <Text style={styles.requestCodeLinkText}>Kirim Ulang Kode?</Text>
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
    marginBottom: 35,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    lineHeight: 20,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  codeInput: {
    width: '15%',
    height: 50,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    backgroundColor: '#F9F9F9',
  },
  verifyButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  requestCodeLink: {
    alignItems: 'center',
  },
  requestCodeLinkText: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '600',
  },
});

export default VerifyCodeScreen;
