import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

const { width } = Dimensions.get('window');

const HalamanTerkirim = () => {
  const router = useRouter();
  const idLaporan = "PUPR-20231024-001"; // ID ini bisa didapat dari params atau state global

  const salinKeClipboard = async () => {
    try {
      await Clipboard.setStringAsync(idLaporan);
      Alert.alert("Berhasil", "ID Laporan disalin ke papan klip");
    } catch (error) {
      Alert.alert("Gagal", "Gagal menyalin ID Laporan");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3E4A70" />

      {/* HEADER - Sesuai desain SIGAP PUPR */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SIGAP PUPR</Text>
        <TouchableOpacity>
          <Icon name="bell-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* ICON SUKSES ORANYE/KUNING */}
        <View style={styles.successIconWrapper}>
          <View style={styles.successIconCircle}>
            <Icon name="check-bold" size={60} color="#fff" />
          </View>
        </View>

        {/* TEKS UTAMA */}
        <Text style={styles.title}>Laporan Terkirim</Text>
        <Text style={styles.subtitle}>
          Terima kasih atas partisipasi Anda. Laporan infrastruktur Anda telah kami terima dan akan segera diproses.
        </Text>

        {/* KARTU ID LAPORAN DENGAN FITUR SALIN */}
        <View style={styles.idCard}>
          <Text style={styles.idLabel}>ID LAPORAN</Text>
          <TouchableOpacity style={styles.idRow} onPress={salinKeClipboard}>
            <Text style={styles.idValue}>{idLaporan}</Text>
            <Icon name="content-copy" size={20} color="#1F3B6D" />
          </TouchableOpacity>
        </View>

        {/* TOMBOL NAVIGASI UTAMA */}
        <TouchableOpacity 
          style={styles.btnBeranda}
          onPress={() => router.replace('/HalamanBeranda')}
        >
          <Icon name="home" size={20} color="#fff" style={styles.btnIcon} />
          <Text style={styles.btnTextBeranda}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnRiwayat}
          onPress={() => router.push('/HalamanRiwayat')}
        >
          <Icon name="history" size={20} color="#fff" style={styles.btnIcon} />
          <Text style={styles.btnTextRiwayat}>Lihat Riwayat</Text>
        </TouchableOpacity>

        {/* FOOTER INFO - KEUNGGULAN SISTEM SIGAP */}
        <View style={styles.footerInfo}>
          <View style={styles.infoItem}>
            <View style={styles.infoIconBox}>
              <Icon name="shield-check" size={18} color="#1F3B6D" />
            </View>
            <View>
              <Text style={styles.infoTitle}>Validasi Otomatis</Text>
              <Text style={styles.infoSub}>Sistem sedang memverifikasi data</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIconBox}>
              <Icon name="clock-fast" size={18} color="#1F3B6D" />
            </View>
            <View>
              <Text style={styles.infoTitle}>Respon Cepat</Text>
              <Text style={styles.infoSub}>Target penanganan &lt; 24 jam</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIconBox}>
              <Icon name="bell-ring" size={18} color="#1F3B6D" />
            </View>
            <View>
              <Text style={styles.infoTitle}>Notifikasi Real-time</Text>
              <Text style={styles.infoSub}>Status akan dikirim ke aplikasi</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  header: {
    backgroundColor: '#3E4A70', // Biru Navy sesuai desain SIGAP
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  successIconWrapper: {
    marginBottom: 20,
    elevation: 8, // Shadow untuk Android
    shadowColor: "#F4C430", // Shadow kuning
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  successIconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#F4C430', // Kuning SIGAP
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F3B6D',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#7B8794',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 30,
  },
  idCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    marginBottom: 35,
    borderWidth: 1,
    borderColor: '#EDF2FF',
    elevation: 4,
  },
  idLabel: {
    fontSize: 10,
    color: '#9AA5B1',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 5,
  },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  idValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F3B6D',
  },
  btnBeranda: {
    width: '100%',
    height: 52,
    backgroundColor: '#F4C430',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  btnRiwayat: {
    width: '100%',
    height: 52,
    backgroundColor: '#3E4A70',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    marginRight: 8,
  },
  btnTextBeranda: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnTextRiwayat: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerInfo: {
    marginTop: 'auto',
    width: '100%',
    paddingBottom: 25,
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2FF',
    padding: 12,
    borderRadius: 12,
  },
  infoIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#D1E0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F3B6D',
  },
  infoSub: {
    fontSize: 10,
    color: '#627D98',
  },
});

export default HalamanTerkirim;