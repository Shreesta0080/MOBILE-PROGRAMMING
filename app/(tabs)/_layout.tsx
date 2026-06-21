import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#1677FF',
      tabBarInactiveTintColor: '#94A3B8',
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderTopColor: '#E2E8F0',
        paddingBottom: 8,
        paddingTop: 6,
        height: 64,
      },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
    }}>
      <Tabs.Screen name="home" options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) =>
          <Ionicons name="home-outline" size={size} color={color} />,
      }} />
      <Tabs.Screen name="map" options={{
        title: 'Map',
        tabBarIcon: ({ color, size }) =>
          <Ionicons name="map-outline" size={size} color={color} />,
      }} />
      <Tabs.Screen name="notifications" options={{
        title: 'Alerts',
        tabBarIcon: ({ color, size }) =>
          <Ionicons name="notifications-outline" size={size} color={color} />,
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) =>
          <Ionicons name="person-outline" size={size} color={color} />,
      }} />
    </Tabs>
  );
}