
export default function HalamanMasuk() {
  const router = useRouter();
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.replace('./HalamanBeranda');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <Image source={require('../../../assets/images/LOGO-PUPR2.png')} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>Selamat Datang!</Text>
        <Text style={styles.subtitle}>Silahkan masuk untuk melanjutkan</Text>

        <Image source={require('../../../assets/images/orang.png')} style={styles.illustration} resizeMode="contain" />

        <View style={styles.formContainer}>
          <View style={styles.inputBox}>
            <MaterialIcons name="person-outline" size={20} color="#999" />
            <TextInput placeholder="Nama Pengguna" style={styles.input} value={nama} onChangeText={setNama} />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color="#999" />
            <TextInput placeholder="Kata Sandi" secureTextEntry={!showPassword} style={styles.input} value={password} onChangeText={setPassword} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.forgot} 
            onPress={() => router.push('./HalamanLupaSandi')}
          >
            <Text style={styles.forgotText}>Lupa kata sandi?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>Masuk</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.registerRow} onPress={() => router.push('./HalamanRegister')}>
          <Text style={styles.registerText}>Belum punya akun? </Text>
          <Text style={styles.registerLink}>Daftar Sekarang</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { flexGrow: 1, padding: 25, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 150, height: 60, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2B3990', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  illustration: { width: '90%', height: 180, marginBottom: 20 },
  formContainer: { width: '100%' },
  inputBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#DDD', borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, height: 50 },
  input: { flex: 1, marginLeft: 10, fontSize: 14 },
  forgot: { alignSelf: 'flex-end', marginBottom: 20 },
  forgotText: { color: '#2B3990', fontSize: 12 },
  loginBtn: { backgroundColor: '#E6B84C', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  loginText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  registerRow: { flexDirection: 'row', marginTop: 20 },
  registerText: { color: '#666', fontSize: 12 },
  registerLink: { color: '#E6B84C', fontWeight: 'bold', fontSize: 12 },
});