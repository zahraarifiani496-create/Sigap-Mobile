import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HalamanRisetSandi() {
  const router = useRouter();
  const [identitas, setIdentitas] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Riset Kata Sandi</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Masukan Email/Nomor WhatsApp Anda untuk menerima tautan pemulihan
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Alamat Email atau Nomor WhatsApp"
          value={identitas}
          onChangeText={setIdentitas}
        />

        <TouchableOpacity 
          style={styles.btnPrimary} 
          onPress={() => router.push('./HalamanKodePemulihan')}
        >
          <Text style={styles.btnText}>Lanjut Ke Pemulihan</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.btnLink}>Kembali Ke Login?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { backgroundColor: '#2B3990', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 30, alignItems: 'center' },
  description: { textAlign: 'center', fontSize: 14, color: '#333', marginBottom: 30, lineHeight: 20 },
  input: { width: '100%', borderBottomWidth: 1, borderBottomColor: '#CCC', paddingVertical: 10, marginBottom: 40 },
  btnPrimary: { backgroundColor: '#E6B84C', width: '100%', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  btnLink: { color: '#2B3990', fontWeight: '500' },
});