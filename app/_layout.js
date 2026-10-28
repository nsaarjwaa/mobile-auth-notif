import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';

function Navigator() {
  const { token, loading } = useAuth();
  if (loading) return null;

  return (
    <Stack>
      {!token ? (
        // Jika belum login, arahkan ke halaman sign-in
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      ) : (
        // Jika sudah login, masuk ke folder grup (app)
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="register" options={{ title: 'Daftar Akun' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}