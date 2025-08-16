import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, FlatList, Touchable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = ["red", "#f58021", "#eac605", "green", "#008fff", "blue", "purple"];

export default function AddToDoScreen({ navigation, route }: any) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("red");
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    const handleAdd = () => {
        if (!title.trim()) {
            Alert.alert("Errore", "Inserisci un titolo");
            return;
        }

        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            color,
            createdAt: new Date(),
            dueDate,
            tags,
            completed: false
        };

        /*
        route.params?.onAdd?.(newTask);
        navigation.goBack();
        */
    };

    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const resetPage = () => {
        setTitle("");
        setDescription("");
        setColor("red");
        setDueDate(null);
        setShowDatePicker(false);
        setTags([]);
        setTagInput("");
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
                <View style={styles.topBar}>
                    <View />
                    <Text style={styles.pageTitle}>Add new task</Text>
                    <TouchableOpacity onPress={resetPage}>
                        <Ionicons name="trash-outline" size={24} color={"red"} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.label}>Titolo:</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Inserisci titolo..."
                />

                <Text style={styles.label}>Descrizione:</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Inserisci descrizione..."
                    multiline
                />

                <Text style={styles.label}>Colore:</Text>
                <View style={styles.colorContainer}>
                    {COLORS.map(c => (
                        <TouchableOpacity
                            key={c}
                            style={[styles.colorPicker, { backgroundColor: c }]}
                            onPress={() => setColor(c)}
                        >
                            {color === c && (
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Ionicons
                                        name="checkmark"
                                        size={20}
                                        color="white"
                                    />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Data scadenza (opzionale):</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                    <Text style={{}}>{dueDate ? dueDate.toLocaleDateString() : "Seleziona data"}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={dueDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) setDueDate(selectedDate);
                        }}
                    />
                )}

                <Text style={styles.label}>Tag:</Text>
                <View style={styles.tagInputContainer}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Aggiungi tag..."
                        value={tagInput}
                        onChangeText={setTagInput}
                        onSubmitEditing={addTag}
                    />
                    <TouchableOpacity style={styles.addTagButton} onPress={addTag}>
                        <Ionicons color={'white'} name="add" size={20} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={tags}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.tag}>
                            <Text style={{ color: "#fff", fontSize: 14 }}>{item}</Text>
                            <TouchableOpacity style={styles.removeTag} onPress={() => removeTag(item)}>
                                <Ionicons name="close" color={'white'} size={16} />
                            </TouchableOpacity>

                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                    style={{ marginVertical: 10 }}
                />


                <TouchableOpacity style={styles.button} onPress={handleAdd}>
                    <Text style={styles.buttonText}>Aggiungi To-Do</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    topBar: {
        paddingTop: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pageTitle: {
        fontSize: 20
    },

    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },

    label: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 6,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
    },

    multilineInput: {
        height: 120,
        textAlignVertical: "top",
    },

    button: {
        backgroundColor: "green",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 30,
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    colorContainer: {
        flexDirection: "row",
        marginVertical: 10,
        gap: 10,
    },

    colorPicker: {
        width: 30,
        height: 30,
        borderRadius: 5,
    },

    dateButton: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
    },

    tagInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginVertical: 10,
    },

    addTagButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 10,
    },

    tag: {
        backgroundColor: "#a9a9a9",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: 60
    },
    removeTag: {
        borderRadius: 999,
        marginLeft: 4,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

