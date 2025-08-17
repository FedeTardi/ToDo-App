import ToDoCard from '@/components/ToDoCard';
import { ToDo } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  { id: "1", title: "Fare la spesa", description: "Comprare pane, latte, frutta..." },
  { id: "2", title: "Studiare", description: "Ripassare algebra e fisica" },
  // ... altre card
];

export default function Index() {

  const [todos, setTodos] = useState<ToDo[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTodos(); // ricarica i dati
    setRefreshing(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const stored = await AsyncStorage.getItem("todos");
      if (stored) {
        setTodos(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error loading todos", e);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View style={styles.topBar}>
        <View/>
        <Text style={styles.title}>Your To-Do</Text>
        <TouchableOpacity>
          <Ionicons name='options' size={24} color={"#bfbfbf"} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ToDoCard title={item.title} description={item.description} color={item.color} />
        )}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',

  },
  title: {
    color: '#bfbfbf',
    fontSize: 20
  }
})