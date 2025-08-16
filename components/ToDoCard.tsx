import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ToDoCard({ title, description }: { title: string; description: string }) {
    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.cardGrid}>
                <View style={styles.cardColor} />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description} numberOfLines={2}        // massimo 2 righe
                        ellipsizeMode="tail"
                    >
                        {description}
                    </Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 120,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    cardGrid: {
        flexDirection: 'row',
        flex: 1
    },
    textContainer: {
        padding: 16
    },

    title: {
        fontSize: 18,
    },
    description: {
        fontSize: 14,
        color: '#808080',
        marginVertical: 10
    },
    cardColor: {
        backgroundColor: 'green',
        height: '100%',
        width: 12,
    }
});