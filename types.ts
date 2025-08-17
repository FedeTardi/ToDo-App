export type ToDo = {
    id: string;
    title: string;
    description: string;
    color: string;
    dueDate?: string;
    tags: string[];
    createdAt: string;
    completed: boolean;
};

export type RootStackParamList = {
    index: { newTodo?: ToDo } | undefined; // può ricevere opzionalmente un nuovo ToDo
    add: undefined; // non riceve parametri
};








