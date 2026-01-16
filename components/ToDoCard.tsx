import { ToDo } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ToDoCard({
    id,
    title,
    description,
    color,
    dueDate,
    completed,
    tags = [],
}: ToDo) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [isCompleted, setIsCompleted] = useState(completed);

    const handleLongPress = () => setMenuVisible(true);
    const handleClose = () => setMenuVisible(false);

    const handleEdit = () => {
        setMenuVisible(false);
        console.log("Modifica todo");
    };

    const handleDelete = () => {
        setMenuVisible(false);
        console.log("Elimina todo");
    };

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
        } catch (error) {
            console.error("Errore aggiornando completed:", error);
        }
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.card}
                onLongPress={handleLongPress}
                onPress={() => router.push(`/todo/${id}`)}
            >
                <View style={styles.cardGrid}>
                    {/* Barra colore */}
                    <View style={[styles.cardColor, { backgroundColor: color }]} />

                    {/* Contenuto testo */}
                    <View style={styles.textContainer}>
                        {/* Header con titolo e checkbox */}
                        <View style={styles.headerRow}>
                            <Text
                                style={[
                                    styles.title,
                                    isCompleted && {
                                        textDecorationLine: "line-through",
                                        color: "#999",
                                    },
                                ]}
                            >
                                {title}
                            </Text>

                            {/* Checkbox */}
                            <TouchableOpacity
                                style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}
                                onPress={toggleComplete}
                            >
                                {isCompleted && (
                                    <Ionicons name="checkmark" size={16} color="white" />
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Descrizione */}
                        <Text
                            style={[styles.description, isCompleted && { color: "#aaa" }]}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {description}
                        </Text>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <FlatList
                                data={tags}
                                horizontal
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.tag}>
                                        <Text style={styles.tagText}>{item}</Text>
                                    </View>
                                )}
                                showsHorizontalScrollIndicator={false}
                                style={{ marginVertical: 6 }}
                            />
                        )}

                        {/* Data di scadenza */}
                        {dueDate && (
                            <Text style={styles.dueDate}>
                                📅 {new Date(dueDate).toLocaleDateString()}
                            </Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>

            {/* Menu contestuale */}
            <Modal
                transparent
                visible={menuVisible}
                animationType="fade"
                onRequestClose={handleClose}
            >
                <TouchableOpacity style={styles.overlay} onPress={handleClose}>
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={handleEdit} style={styles.menuItem}>
                            <Text>✏️ Modifica</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete} style={styles.menuItem}>
                            <Text>🗑️ Elimina</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        borderRadius: 15,
        overflow: "hidden",
        backgroundColor: "white",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardGrid: {
        flexDirection: "row",
        flex: 1,
    },
    cardColor: {
        width: 10,
    },
    textContainer: {
        flex: 1,
        padding: 14,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        flex: 1,
        marginRight: 10,
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginTop: 6,
    },
    dueDate: {
        fontSize: 12,
        color: "",
        marginTop: 4,
    },
    checkbox: {
        width: 22,
        height: 22,
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
    tag: {
        backgroundColor: "#e6e6e6",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 6,
    },
    tagText: {
        fontSize: 12,
        color: "#333",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    menu: {
        backgroundColor: "white",
        borderRadius: 12,
        width: 160,
        paddingVertical: 8,
    },
    menuItem: {
        padding: 12,
    },
});
