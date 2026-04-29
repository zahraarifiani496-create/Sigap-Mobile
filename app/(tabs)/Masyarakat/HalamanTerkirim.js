import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HalamanTerkirim() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // 🔥 Ambil waktu sekarang
  const now = new Date();

  const formatTanggal = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatJam = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            router.replace("/(tabs)/Masyarakat/HalamanLapor")
          }
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        
        <View style={styles.circle}>
          <Text style={styles.check}>✓</Text>
        </View>

        <Text style={styles.title}>LAPORAN TERKIRIM</Text>

        <Text style={styles.description}>
          Terima kasih atas partisipasi Anda.{"\n"}
          Laporan Anda telah berhasil dikirim{"\n"}
          dan akan segera diproses oleh{"\n"}
          instansi terkait.
        </Text>

        {/* DATA REALTIME */}
        <Text style={styles.info}>
          ID Laporan: {id || "AM-XXXX"}{"\n"}
          Dikirim pada : {formatTanggal}, {formatJam} WIB
        </Text>
      </View>

      {/* BUTTON */}
      <View style={styles.footer}>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.replace("/(tabs)/Masyarakat/HalamanBeranda")
          }
        >
          <Text style={styles.buttonText}>Kembali Ke Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push("/(tabs)/Masyarakat/HalamanRiwayat")
          }
        >
          <Text style={styles.buttonText}>Lihat Riwayat Laporan</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3E5F86",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  content: {
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 80,
  },

  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: "#FFC107",
    justifyContent: "center",
    alignItems: "center",
  },

  check: {
    fontSize: 60,
    color: "#FFC107",
  },

  title: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },

  description: {
    marginTop: 15,
    fontSize: 14,
    color: "#FFC107",
    textAlign: "center",
    lineHeight: 22,
  },

  info: {
    marginTop: 18,
    fontSize: 13,
    color: "white",
    textAlign: "center",
  },

  footer: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },

  button: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 12,
    elevation: 3,
  },

  buttonText: {
    textAlign: "center",
    color: "#3E5F86",
    fontWeight: "bold",
    fontSize: 14,
  },
});