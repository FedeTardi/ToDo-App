import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#f9bc0c',
            tabBarInactiveTintColor: "#bfbfbf",
            headerShown: false,

        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="add"
                options={{
                    title: '',
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                position: 'absolute',
                                top: -30, // fa "uscire" il cerchio dalla tab bar
                                backgroundColor: '#f9bc0c',
                                borderRadius: 999,
                                width: 100,
                                height: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <FontAwesome
                                name="plus"
                                size={24}
                                color="white"
                            />
                            <Text style={{ color: 'white', fontSize: 12, marginTop: 2 }}>
                                Add
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
        </Tabs>
    );
}