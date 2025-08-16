# 📝 ToDo App – React Native

A **feature-rich To-Do List app** built with **React Native**, helping you manage tasks efficiently. Supports **custom colors, due dates, tags, priorities, and timestamps**, offering a complete and visually appealing task management experience.  

---

## ✨ Features

- ✅ **Add, Edit, and Remove Tasks** – Easily manage your to-do items.  
- 🎨 **Custom Color Selection** – Choose a color for each task for quick categorization.  
- 📅 **Optional Due Date** – Set a due date to stay organized.  
- 🏷️ **Tags** – Add multiple tags for better filtering and organization.    
- ⏰ **Timestamps** – Automatically tracks creation date.  
- ✔️ **Completed Status** – Mark tasks as completed with visual indicators.  
- 📜 **Scrollable Task List** – Smooth scrolling with FlatList.  
- 📱 **Responsive UI** – Card-based design with checkmarks, colors, and tags.  

---

## 🖼️ Screens

1. **Task List Screen** – Shows all tasks in a scrollable list with colors, tags, priorities, and creation dates.  
2. **Add Task Screen** – Allows adding new tasks with optional description, color, due date, tags, and priority.  

---

## 🚀 Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
Install dependencies:

bash
Copia
Modifica
npm install
Run the app (iOS):

bash
Copia
Modifica
npx react-native run-ios
Or (Android):

bash
Copia
Modifica
npx react-native run-android
📦 Dependencies
React Native – core framework

React Navigation – for screen navigation

@react-native-community/datetimepicker – for due dates

react-native-vector-icons – for icons like checkmarks

🗂️ Folder Structure
```bash
   css
   Copia
   Modifica
   project-root/
   ├── src/
   │   ├── components/
   │   │   └── ToDoCard.tsx
   │   ├── screens/
   │   │   ├── ToDoListScreen.tsx
   │   │   └── AddToDoScreen.tsx
   │   ├── assets/
   │   ├── hooks/
   │   └── styles/
   ├── App.tsx
   └── package.json

📝 How to Use
Launch the app.

View tasks on the Task List Screen.

Tap the ➕ button to add a new task.

Fill in the title, optional description, choose a color, set a due date, add tags, and choose priority.

Save the task and see it appear in the list.

Tap a tag or color to filter tasks (optional future enhancement).

🤝 Contributing
Contributions are welcome! Feel free to submit issues or pull requests to improve the app.

📄 License
This project is licensed under the MIT License.
