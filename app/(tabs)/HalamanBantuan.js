import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const PusatBantuan = () => {
  const router = useRouter();

  const categories = [
    { id: 1, title: 'Cara Melapor', sub: 'Panduan pelaporan', icon: 'bullhorn-variant-outline', color: '#E8EDFF' },
    { id: 2, title: 'Lacak Status', sub: 'Cek progres laporan', icon: 'map-marker-outline', color: '#E8EDFF' },
    { id: 3, title: 'Data Profil', sub: 'Pengaturan akun', icon: 'account-circle-outline', color: '#E8EDFF' },
    { id: 4, title: 'Lainnya', sub: 'Topik lainnya', icon: 'view-grid-outline', color: '#E8EDFF' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3E4A70" />

      {/* HEADER NAVBAR */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SIGAP PUPR</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="magnify" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="account-circle" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* TITLE SECTION */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Pusat Bantuan</Text>
          <Text style={styles.subTitle}>Apa yang bisa kami bantu hari ini?</Text>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Icon name="magnify" size={20} color="#3E4A70" style={styles.searchIcon} />
            <TextInput 
              placeholder="Cari solusi atau topik..." 
              placeholderTextColor="#9AA5B1"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* TOPIC GRID */}
        <Text style={styles.sectionLabel}>TOPIK POPULER</Text>
        <View style={styles.gridContainer}>
          {categories.map((item) => (
            <TouchableOpacity key={item.id} style={styles.categoryCard}>
              <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                <Icon name={item.icon} size={28} color="#3E4A70" />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSub}>{item.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CONTACT SUPPORT BOX */}
        <View style={styles.supportBox}>
          <Text style={styles.supportTitle}>Butuh bantuan lebih lanjut?</Text>
          <Text style={styles.supportDesc}>
            Tim dukungan kami siap membantu Anda secara langsung melalui platform favorit Anda.
          </Text>

          {/* WHATSAPP BUTTON */}
          <TouchableOpacity style={styles.btnWhatsapp}>
            <Icon name="whatsapp" size={24} color="#fff" />
            <Text style={styles.btnText}>Hubungi via WhatsApp</Text>
          </TouchableOpacity>

          {/* EMAIL BUTTON */}
          <TouchableOpacity style={styles.btnEmail}>
            <Icon name="email-outline" size={24} color="#fff" />
            <Text style={styles.btnText}>Kirim Email Support</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* BOTTOM TAB SIMULATION */}
      <View style={styles.bottomTab}>
        <TabItem icon="home-outline" label="Beranda" />
        <TabItem icon="flag-outline" label="Laporkan" />
        <TabItem icon="history" label="Riwayat" />
        <TabItem icon="help-circle" label="Bantuan" active />
        <TabItem icon="account-outline" label="Profil" />
      </View>
    </SafeAreaView>
  );
};

const TabItem = ({ icon, label, active }) => (
  <TouchableOpacity style={styles.tabItem}>
    <Icon name={icon} size={24} color={active ? '#1F3B6D' : '#999'} />
    <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  header: {
    backgroundColor: '#3E4A70',
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
    letterSpacing: 0.5,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: 15,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F3B6D',
  },
  subTitle: {
    fontSize: 14,
    color: '#627D98',
    marginTop: 5,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#E4E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#3E4A70',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9AA5B1',
    marginHorizontal: 20,
    marginTop: 30,
    letterSpacing: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: '#fff',
    width: (width / 2) - 20,
    margin: 5,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F3B6D',
  },
  cardSub: {
    fontSize: 11,
    color: '#9AA5B1',
    marginTop: 4,
  },
  supportBox: {
    backgroundColor: '#3E4A70',
    margin: 20,
    borderRadius: 20,
    padding: 25,
  },
  supportTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  supportDesc: {
    color: '#D1E0FF',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 10,
    marginBottom: 20,
  },
  btnWhatsapp: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  btnEmail: {
    backgroundColor: '#F4C430',
    flexDirection: 'row',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
    justifyContent: 'space-around',
    width: '100%',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  tabLabelActive: {
    color: '#1F3B6D',
    fontWeight: 'bold',
  },
});

export default PusatBantuan;