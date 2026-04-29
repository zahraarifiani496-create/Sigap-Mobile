import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const dataRiwayat = [
  { id: 'z10Fa', judul: 'Jalan Berlubang', lokasi: 'Jln.Tubun RW 16 RT8', status: 'Diproses' },
  { id: '55tKL', judul: 'Drainase tersumbat', lokasi: 'Jln.Cibogo RW7 RT1', status: 'Diproses' },
  { id: 'g27Ht', judul: 'Jembatan Retak', lokasi: 'Jln.Paskal RW 36 RT23', status: 'Selesai' },
  { id: '123sgT', judul: 'Drainase tersumbat', lokasi: 'Jln.Rawa Badak RW 17 RT9', status: 'Selesai' },
];

export default function HalamanRiwayat() {
  const router = useRouter();

  const renderItem = ({ item }) => {
    const isSelesai = item.status === 'Selesai';

    return (
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: isSelesai ? '#B7E1A1' : '#E6CF8B' }
        ]}
        onPress={() =>
          router.push({
            pathname: '/(tabs)/Masyarakat/HalamanDetailRiwayat',
            params: { data: JSON.stringify(item) },
          })
        }
      >
        <Text style={styles.id}>ID : {item.id}</Text>

        <Text style={styles.judul}>{item.judul}</Text>
        <Text style={styles.lokasi}>{item.lokasi}</Text>

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status : </Text>
          <View
            style={[
              styles.badge,
              { backgroundColor: isSelesai ? '#3CE000' : '#F2B705' }
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/Masyarakat/HalamanTerkirim')}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Riwayat Laporan Saya</Text>
      </View>

      {/* LIST */}
      <FlatList
        data={dataRiwayat}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  header: {
    backgroundColor: '#3E4A72',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
  },

  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },

  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },

  id: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },

  judul: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A2F0B',
  },

  lokasi: {
    fontSize: 14,
    marginTop: 3,
    color: '#3A2F0B',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  statusLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },

  statusText: {
    fontWeight: 'bold',
    color: '#000',
  },
});