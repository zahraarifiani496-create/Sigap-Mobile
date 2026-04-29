import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HalamanKodePemulihan() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Masukan Kode Pemulihan</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Silahkan masukan 6 digit kode pemulihan yang kami kirimkan ke Email/Nomor yang Diinputkan
        </Text>

        <View style={styles.otpContainer}>
          {code.map((data, index) => (
            <TextInput
              key={index}
              style={styles.otpBox}
              maxLength={1}
              keyboardType="number-pad"
            />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.btnPrimary}
          onPress={() => router.push('./HalamanAturUlangSandi')}
        >
          <Text style={styles.btnText}>Verifikasi Kode</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.btnLink}>Kirim Ulang Kode?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { backgroundColor: '#2B3990', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  content: { padding: 30, alignItems: 'center' },
  description: { textAlign: 'center', fontSize: 14, color: '#333', marginBottom: 40 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 40 },
  otpBox: { width: 45, height: 55, borderBottomWidth: 2, borderBottomColor: '#EEE', textAlign: 'center', fontSize: 20, backgroundColor: '#F9F9F9', borderRadius: 5 },
  btnPrimary: { backgroundColor: '#E6B84C', width: '100%', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  btnLink: { color: '#2B3990', fontWeight: '500' },
});