import ToDoCard from '@/components/ToDoCard';
import { ToDo } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

import {
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTodos();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadTodos();
    }, [])
  );

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

  // Filtri per sezioni
  const now = new Date();
  const sections = [
    {
      title: "To do",
      icon: "list-outline",
      data: todos.filter(
        (t) => !t.completed && (!t.dueDate || new Date(t.dueDate) >= now)
      ),
    },
    {
      title: "Completed",
      icon: "checkmark-done-outline",
      data: todos.filter((t) => t.completed),
    },
    {
      title: "Expired",
      icon: "stopwatch-outline",
      data: todos.filter(
        (t) => !t.completed && t.dueDate && new Date(t.dueDate) < now
      ),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* TopBar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => console.log("Filters")} style={styles.topBarButton}>
          <Ionicons name="options-outline" size={22} color={"#333"} />
        </TouchableOpacity>
        <Text style={styles.title}>Your To-Do</Text>
        <TouchableOpacity onPress={() => router.push("/settings")} style={styles.topBarButton}>
          <Ionicons name="settings-outline" size={22} color={"#333"} />
        </TouchableOpacity>
      </View>

      {/* Lista con sezioni */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ToDoCard
            id={item.id}
            title={item.title}
            description={item.description}
            color={item.color}
            dueDate={item.dueDate}
            createdAt={item.createdAt}
            tags={item.tags}
            completed={item.completed}
          />
        )}
        renderSectionHeader={({ section: { title, icon, data } }) =>
          data.length > 0 ? (
            <View style={styles.sectionHeader}>
              <View style={styles.divider} />
              <Ionicons name={icon} color={'#b6b6b6'} size={20} />
              <Text style={styles.sectionHeaderText}>{title}</Text>
              <View style={styles.divider} />
            </View>
          ) : null
        }
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Bottone add */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add")}
      >
        <Ionicons name="add" color={"white"} size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  title: {
    color: "#333",
    fontSize: 22,
  },
  topBarButton: {
    width: 44,
    height: 44,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#f9bc0c",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionHeader: {
    marginBottom: 15,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
    justifyContent: 'center',
    marginHorizontal: 10,
    overflow: 'hidden'
  },
  sectionHeaderText: {
    fontSize: 18,
    color: '#b6b6b6ff',
    marginRight: 4
  },
  divider: {
    height: 1,
    backgroundColor: '#b6b6b6',
    marginHorizontal: 10,
    flex: 1
  },
});
