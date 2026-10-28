import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { savePushToken } from '../../services/pushService';
import { registerForPushNotificationsAsync } from '../../utils/notifications';

export default function HomeScreen() {
  const { user, token, signOut } = useAuth();
  const [expoToken, setExpoToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (pushToken) => {
      if (pushToken && token) {
        setExpoToken(pushToken);
        try {
          await savePushToken(pushToken, token);
          console.log('Push token berhasil dikirim ke backend');
        } catch (e) {
          console.log('Gagal menyimpan token ke backend:', e.message);
        }
      }
    });
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halo, {user?.nama || 'Pengguna'}</Text>
      <Text style={styles.subtitle}>Sistem JWT & Push Notification Aktif.</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/profile')}>
        <Text style={styles.buttonText}>Lihat Profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => Alert.alert('Info Token', expoToken ? 'Token siap!' : 'Belum ada token')}>
        <Text style={styles.buttonTextSecondary}>Cek Push Token</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.dangerButton} onPress={() => signOut()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center', gap: 16 },
  title: { fontSize: 26, fontWeight: '700' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 20 },
  primaryButton: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, width: '100%', alignItems: 'center' },
  secondaryButton: { backgroundColor: '#34C759', padding: 14, borderRadius: 8, width: '100%', alignItems: 'center' },
  dangerButton: { backgroundColor: '#FF3B30', padding: 14, borderRadius: 8, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  buttonTextSecondary: { color: '#fff', fontSize: 16, fontWeight: '600' },
});