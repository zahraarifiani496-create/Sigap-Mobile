import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();

  const [image, setImage] = useState(null);

  // 📷 Kamera
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Izin ditolak", "Izinkan akses kamera terlebih dahulu");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 🖼️ Galeri
  const openGallery = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Izin ditolak", "Izinkan akses galeri terlebih dahulu");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 🔥 Pilih opsi
  const pilihFoto = () => {
    Alert.alert("Pilih Foto", "Ambil dari mana?", [
      { text: "Kamera", onPress: openCamera },
      { text: "Galeri", onPress: openGallery },
      { text: "Batal", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push("/(tabs)/Masyarakat/HalamanBeranda")}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Profile</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* AVATAR */}
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={pilihFoto}>
            {image ? (
              <Image source={{ uri: image }} style={styles.avatar} />
            ) : (
              <View style={styles.avatar}>
                <Ionicons name="person" size={50} color="#fff" />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={pilihFoto}>
            <Text style={styles.editText}>Edit Foto Profile</Text>
          </TouchableOpacity>
        </View>

        {/* FORM */}
        <TextInput
          placeholder="Nama Lengkap"
          style={styles.input}
        />
        <TextInput
          placeholder="Nomor WhatsApp"
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
        />

        {/* BUTTON */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Simpan Perubahan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },

  header: {
    backgroundColor: "#3F4A75",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  backBtn: {
    marginRight: 10,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  content: {
    padding: 20,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#2CA6A4",
    justifyContent: "center",
    alignItems: "center",
  },

  editText: {
    marginTop: 10,
    fontWeight: "500",
    color: "#333",
  },

  input: {
    backgroundColor: "#D9D9D9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#3F4A75",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});