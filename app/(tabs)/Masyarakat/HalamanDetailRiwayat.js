import React from 'react';
import {
  View, Text, StyleSheet, Image,
  ScrollView, TouchableOpacity, StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HalamanDetailRiwayat() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const dataLaporan = params.dataLaporan
    ? JSON.parse(params.dataLaporan)
    : null;

  const isSelesai = dataLaporan?.status === "Selesai";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER (SUDAH DIPERKECIL) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Riwayat Laporan</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* CARD UTAMA */}
        <View style={styles.cardUtama}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.label}>ID Laporan</Text>
              <Text style={styles.value}>{dataLaporan?.id}</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={styles.label}>Status</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons
                  name={isSelesai ? "checkmark-circle" : "time"}
                  size={18}
                  color={isSelesai ? "green" : "orange"}
                />
                <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                  {dataLaporan?.status}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.label}>Jenis Laporan</Text>
          <Text style={styles.judul}>{dataLaporan?.judul}</Text>

          <Text style={styles.label}>Lokasi</Text>
          <Text style={styles.value}>{dataLaporan?.lokasi}</Text>
        </View>

        {/* FOTO */}
        <Text style={styles.sectionTitle}>Foto Laporan</Text>
        <Image
          source={{
            uri: dataLaporan?.image || 'https://picsum.photos/400'
          }}
          style={styles.bigImg}
        />

        {/* DESKRIPSI */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Deskripsi Laporan</Text>
          <Text>{dataLaporan?.deskripsi || "Tidak ada deskripsi"}</Text>
        </View>

        {/* INFO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informasi Laporan</Text>

          <View style={styles.infoRow}>
            <Text>Tanggal</Text>
            <Text>{dataLaporan?.tanggal}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text>Jam</Text>
            <Text>{dataLaporan?.jam}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text>Status</Text>
            <Text>{dataLaporan?.status}</Text>
          </View>
        </View>

        {/* TIMELINE */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Riwayat Status</Text>

          {['Dikirim', 'Diproses', 'Selesai'].map((item, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={
                  item === dataLaporan?.status || item === "Dikirim"
                    ? "green"
                    : "gray"
                }
              />
              <Text style={{ marginLeft: 10 }}>{item}</Text>
            </View>
          ))}
        </View>

        {/* BUTTON (PASTI KELIHATAN) */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btnYellow}
            onPress={() => router.push('/(tabs)/Masyarakat/HalamanLapor')}
          >
            <Text style={styles.btnText}>Laporkan Ulang</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnBlue}
            onPress={() => router.push('/(tabs)/Masyarakat/HalamanBeranda')}
          >
            <Text style={styles.btnText}>Kembali</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },

  // 🔥 HEADER DIPERKECIL
  header: {
    backgroundColor: '#3E4A72',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12, // ❗ sebelumnya terlalu besar
  },

  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  scrollContent: {
    padding: 15,
    paddingBottom: 100, // 🔥 penting biar tombol kelihatan
  },

  cardUtama: {
    backgroundColor: '#DCE8D2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: { fontSize: 12, color: '#555' },
  value: { fontWeight: 'bold' },
  judul: { fontSize: 16, fontWeight: 'bold' },

  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  card: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },

  bigImg: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },

  // 🔥 BUTTON AREA FIX
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },

  btnYellow: {
    flex: 1,
    backgroundColor: '#F2B705',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  btnBlue: {
    flex: 1,
    backgroundColor: '#3E4A72',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});