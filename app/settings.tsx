import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* TopBar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Section 1 */}
        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>

        {/* Section 2 */}
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.optionRow} onPress={() => console.log("Change username")}>
          <Text style={styles.optionText}>Change Username</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow} onPress={() => console.log("Logout")}>
          <Text style={styles.optionText}>Logout</Text>
          <Ionicons name="log-out-outline" size={20} color="#888" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: '600'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#555'
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  optionText: {
    fontSize: 16
  }
});
