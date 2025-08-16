import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToDoCard from '@/components/ToDoCard';

const DATA = [
  { id: "1", title: "Fare la spesa", description: "Comprare pane, latte, frutta..." },
  { id: "2", title: "Studiare", description: "Ripassare algebra e fisica" },
  // ... altre card
];

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ToDoCard title={item.title} description={item.description} />
        )}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      />
    </SafeAreaView>
  );
}
