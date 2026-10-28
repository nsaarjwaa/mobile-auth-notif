import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getMe } from '../../services/authService';

export default function ProfileScreen() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (!token) {
          Alert.alert('Error', 'Token tidak ditemukan. Silakan login ulang.');
          return;
        }
        const data = await getMe(token);
        setProfile(data);
      } catch (error) {
        Alert.alert('Gagal memuat profil', error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [token]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Pengguna</Text>
      <Text style={styles.label}>Nama: {profile?.nama}</Text>
      <Text style={styles.label}>Email: {profile?.email}</Text>
      <Text style={styles.label}>ID User: {profile?.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 10, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  label: { fontSize: 18 },
});