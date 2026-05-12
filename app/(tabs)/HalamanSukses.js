import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HalamanSukses({ navigation }) {
  return (
    <SafeAreaView style={styles.layar}>
      <View style={styles.konten}>
        <View style={styles.lingkaran}>
          <Ionicons name="checkmark" size={120} color="#FFD100" />
        </View>

        <Text style={styles.judul}>LAPORAN TERKIRIM</Text>
        
        <Text style={styles.pesan}>
          Terima kasih atas partisipasi Anda.{"\n"}
          Laporan Anda telah berhasil di kirim{"\n"}
          dan akan segera diproses oleh{"\n"}
          instansi terkait.
        </Text>

        <Text style={styles.idLaporan}>ID Laporan: AM1223B98u</Text>

        <TouchableOpacity style={styles.tombolPutih} onPress={() => navigation.navigate('Utama', { screen: 'Beranda' })}>
          <Text style={styles.teksBiru}>Kembali Ke Dasboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tombolPutih} onPress={() => navigation.navigate('Utama', { screen: 'Riwayat' })}>
          <Text style={styles.teksBiru}>Lihat Riwayat Laporan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layar: { flex: 1, backgroundColor: '#2B4266' },
  konten: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  lingkaran: { width: 180, height: 180, borderRadius: 90, borderWidth: 8, borderColor: '#FFD100', alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  judul: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 15 },
  pesan: { textAlign: 'center', color: '#FFD100', fontSize: 16, marginBottom: 30 },
  idLaporan: { color: 'white', fontWeight: 'bold', marginBottom: 30 },
  tombolPutih: { backgroundColor: 'white', width: '100%', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  teksBiru: { color: '#2B4266', fontWeight: 'bold', fontSize: 16 }
});