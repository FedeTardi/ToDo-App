import { ToDo } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [todo, setTodo] = useState<ToDo | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleComplete = async () => {
        try {
            const newValue = !isCompleted;
            setIsCompleted(newValue);

            // prendo i todos salvati
            const todosJson = await AsyncStorage.getItem("todos");
            let todos: ToDo[] = todosJson ? JSON.parse(todosJson) : [];

            // aggiorno solo quello con lo stesso id
            todos = todos.map((t) =>
                t.id === id ? { ...t, completed: newValue } : t
            );

            // salvo di nuovo
            await AsyncStorage.setItem("todos", JSON.stringify(todos));

            // aggiorno anche lo stato locale
            if (todo) {
                setTodo({ ...todo, completed: newValue });
            }
        } catch (error) {
            console.error("Errore aggiornando completed:", error);
        }
    };

    useEffect(() => {
        loadTodo();
    }, [id]);

    const loadTodo = async () => {
        try {
            const todosJson = await AsyncStorage.getItem('todos');
            const todos: ToDo[] = todosJson ? JSON.parse(todosJson) : [];
            const foundTodo = todos.find(t => t.id === id);

            if (foundTodo) {
                setTodo(foundTodo);
                setIsCompleted(foundTodo.completed); // inizializzo qui
            } else {
                router.back();
            }
        } catch (error) {
            console.error('Errore nel caricamento del todo:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!todo) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Todo non trovato</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.body}>
            {/* TopBar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <View></View>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={24} onPress={() => setMenuVisible(true)} />
                </TouchableOpacity>
            </View>

            <Modal
                transparent
                visible={menuVisible}
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity style={styles.overlay} onPress={() => setMenuVisible(false)}>
                    <View style={styles.menu}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name='create-outline' size={18} style={styles.menuItemIcon} />
                            <Text style={styles.menuItemText}>Modifica</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name='trash-outline' size={18} style={styles.menuItemIcon} />
                            <Text style={styles.menuItemText}>Elimina</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Corpo */}
            <View style={{ paddingVertical: 20, paddingHorizontal: 4 }}>
                {/* Titolo + colore + checkbox */}
                <View style={styles.headerRow}>
                    {/* Box colore */}
                    <View style={[styles.colorBox, { backgroundColor: todo.color }]} />

                    {/* Titolo */}
                    <Text style={styles.title}>{todo.title}</Text>

                    {/* Checkbox */}
                    <TouchableOpacity
                        style={[
                            styles.checkbox,
                            isCompleted && styles.checkboxCompleted
                        ]}
                        onPress={toggleComplete}
                    >
                        {isCompleted && (
                            <Ionicons name="checkmark" size={18} color="white" />
                        )}
                    </TouchableOpacity>
                </View>

                {/* --- il resto come prima --- */}
                <Text style={styles.label}>Description</Text>
                <View style={styles.box}>
                    <Text style={styles.text}>{todo.description || "No description"}</Text>
                </View>

                <Text style={styles.label}>Status</Text>
                <View style={styles.box}>
                    <Text style={styles.text}>
                        {isCompleted ? "✅ Completed" : "🕒 To do"}
                    </Text>
                </View>

                <Text style={styles.label}>Created</Text>
                <View style={styles.box}>
                    <Text style={styles.text}>
                        {new Date(todo.createdAt).toLocaleDateString()}
                    </Text>
                </View>

                {todo.dueDate && (
                    <>
                        <Text style={styles.label}>Due Date</Text>
                        <View style={styles.box}>
                            <Text style={styles.text}>
                                {new Date(todo.dueDate).toLocaleDateString()}
                            </Text>
                        </View>
                    </>
                )}

                {todo.tags && todo.tags.length > 0 && (
                    <>
                        <Text style={styles.label}>Tags</Text>
                        <FlatList
                            data={todo.tags}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ marginTop: 6 }}
                            renderItem={({ item }) => (
                                <View style={styles.tag}>
                                    <Text style={styles.tagText}>{item}</Text>
                                </View>
                            )}
                        />
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topBar: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    body: {
        flex: 1,
        padding: 16,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    colorBox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        marginRight: 10,
    },
    title: {
        flex: 1,
        fontSize: 26,
        fontWeight: "bold",
    },
    checkbox: {
        width: 26,
        height: 26,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxCompleted: {
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50",
    },
    label: {
        fontSize: 14,
        color: "#888",
        marginTop: 12,
        marginBottom: 4,
    },
    box: {
        backgroundColor: "#f8f8f8",
        padding: 12,
        borderRadius: 12,
    },
    text: {
        fontSize: 16,
        color: "#333",
    },
    tag: {
        backgroundColor: "#e0e0ff",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
    },
    tagText: {
        fontSize: 14,
        color: "#333",
    },
    overlay: {
        flex: 1,
    },
    menu: {
        backgroundColor: "white",
        borderRadius: 12,
        width: 160,
        paddingVertical: 8,
    },
    menuItem: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuItemIcon: {
        alignSelf: 'flex-start',
    },
    menuItemText: {
        fontSize: 16,
        paddingLeft: 5
    }
});
