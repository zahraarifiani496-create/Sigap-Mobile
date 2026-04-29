import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HalamanAturUlangSandi() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Atur Ulang Kata Sandi</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Buat kata sandi baru untuk akun Anda. Pastikan kata sandi kuat.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kata Sandi Baru</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Masukan kata sandi baru" 
            secureTextEntry 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Konfirmasi Kata Sandi</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ulangi kata sandi baru" 
            secureTextEntry 
          />
        </View>

        <TouchableOpacity 
          style={styles.btnPrimary}
          onPress={() => router.replace('./App')} // replace agar tidak bisa balik ke form reset
        >
          <Text style={styles.btnText}>Simpan Kata Sandi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { backgroundColor: '#2B3990', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 30 },
  description: { fontSize: 14, color: '#333', marginBottom: 40, textAlign: 'center' },
  inputGroup: { marginBottom: 25 },
  label: { fontWeight: 'bold', marginBottom: 5, color: '#333' },
  input: { borderBottomWidth: 1, borderBottomColor: '#CCC', paddingVertical: 8 },
  btnPrimary: { backgroundColor: '#E6B84C', width: '100%', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});