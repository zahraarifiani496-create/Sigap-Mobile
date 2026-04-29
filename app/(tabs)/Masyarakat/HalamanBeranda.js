import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image, Dimensions, Platform, Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// Import WebView untuk menampilkan konten web (peta) di aplikasi mobile
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

export default function HalamanBeranda() {
  const router = useRouter();
  
  // URL Embed Google Maps untuk Alun-Alun Subang
  const mapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.845946890334!2d107.7607414!3d-6.5654516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e693b8fe7097c55%3A0xc48c48a735c02435!2sAlun-alun%20Subang!5e0!3m2!1sid!2sid!4v1710000000000";
  
  // URL untuk membuka aplikasi Maps eksternal
  const mapsExternalUrl = "https://www.google.com/maps/search/?api=1&query=Alun-Alun+Subang";

  const openMaps = () => {
    if (Platform.OS === 'web') {
      window.open(mapsExternalUrl, '_blank');
    } else {
      Linking.openURL(mapsExternalUrl);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Selamat Datang, Zahra!</Text>
        <Ionicons name="notifications-outline" size={24} color="#FFF" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* BUTTON LAPORKAN MASALAH */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.push('./HalamanLapor')}
        >
          <Text style={styles.btnText}>+ LAPORKAN MASALAH</Text>
        </TouchableOpacity>

        {/* PETA */}
        <Text style={styles.title}>Peta Pelaporan (Alun-Alun Subang)</Text>
        
        <View style={styles.mapWrapper}>
          {Platform.OS === 'web' ? (
            /* Versi Web: Menggunakan iframe standar */
            <iframe
              src={mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          ) : (
            /* Versi Mobile (Expo Go): Menggunakan WebView untuk membungkus iframe */
            <WebView
              originWhitelist={['*']}
              domStorageEnabled={true}
              javaScriptEnabled={true}
              source={{ html: `
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  </head>
                  <body style="margin:0;padding:0;">
                    <iframe 
                      src="${mapsEmbedUrl}" 
                      width="100%" 
                      height="100%" 
                      frameborder="0" 
                      style="border:0" 
                      allowfullscreen>
                    </iframe>
                  </body>
                </html>
              ` }}
              style={styles.webView}
            />
          )}
        </View>

        {/* Tombol Buka di Maps Eksternal */}
        <TouchableOpacity style={styles.externalMapBtn} onPress={openMaps}>
          <Text style={styles.externalMapBtnText}>Buka di Google Maps</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Berita PUPR Terkini</Text>
        <View style={styles.newsGrid}>
          {[1,2,3,4,5,6].map((_, i) => (
            <Image
              key={i}
              source={{ uri: `https://picsum.photos/200?random=${i}` }}
              style={styles.newsImage}
            />
          ))}
        </View>
      </ScrollView>

      {/* NAVBAR */}
      <View style={styles.nav}>
        <NavItem icon="home" label="Beranda" onPress={() => router.push('./HalamanBeranda')} />
        <NavItem icon="add-circle" label="Laporkan" onPress={() => router.push('./HalamanLapor')} />
        <NavItem icon="time" label="Riwayat" onPress={() => router.push('./HalamanRiwayat')} />
        <NavItem icon="help-circle" label="Bantuan" onPress={() => router.push('./HalamanBantuan')} />
        <NavItem icon="person" label="Profil" onPress={() => router.push('./HalamanProfil')} />
      </View>
    </View>
  );
}

const NavItem = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
    <Ionicons name={icon} size={22} color="#2B3990" />
    <Text style={{ fontSize: 12 }}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },
  header: { backgroundColor: '#3E4A73', padding: 20, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  btn: { backgroundColor: '#E6B84C', margin: 20, padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { fontWeight: 'bold' },
  title: { marginHorizontal: 20, marginTop: 20, fontWeight: 'bold' },
  
  // Style untuk kontainer peta
  mapWrapper: { 
    width: width - 40, 
    height: 200, 
    marginHorizontal: 20, 
    marginTop: 10, 
    borderRadius: 15, 
    overflow: 'hidden', 
    backgroundColor: '#ddd' 
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  externalMapBtn: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 8,
    backgroundColor: '#2B3990',
    borderRadius: 5,
    alignItems: 'center'
  },
  externalMapBtnText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

  newsGrid: { flexDirection: 'row', flexWrap: 'wrap', margin: 10 },
  newsImage: { width: (width - 40) / 3, height: 80, margin: 5, borderRadius: 8 },
  nav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: '#FFF', position: 'absolute', bottom: 0, left: 0, right: 0, elevation: 10, borderTopWidth: 1, borderTopColor: '#EEE' },
});