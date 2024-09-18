import React, { useState, useRef, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Empty } from "../components/Empty";
import { Header } from "../components/Header";
import { Task } from "../components/Task";
import { TaskDTO } from "../dtos/TaskDTO";
import { uuid } from "../utils/uuid";
import { styles } from "./styles";

const STORAGE_KEY = "@tasks";

export function HomeScreen() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [newTask, setNewTask] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<TaskDTO | null>(null);

  const newTaskInputRef = useRef<TextInput>(null);

  // Carregar as tarefas salvas no AsyncStorage ao iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  // Função para carregar as tarefas do AsyncStorage
  async function loadTasks() {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas do AsyncStorage:", error);
    }
  }

  // Função para salvar as tarefas no AsyncStorage
  async function saveTasks(tasks: TaskDTO[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Erro ao salvar tarefas no AsyncStorage:", error);
    }
  }

  function handleTaskAdd() {
    if (newTask.trim().length >= 5) {
      const newTaskObject = { id: uuid(), isCompleted: false, title: newTask.trim() };
      const updatedTasks = [...tasks, newTaskObject];
      setTasks(updatedTasks);
      saveTasks(updatedTasks); // Salvar as tarefas ao adicionar uma nova
      setNewTask("");
      newTaskInputRef.current?.blur();
    }
  }

  function handleTaskDone(id: string) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks); // Salvar as tarefas ao marcar como concluída
  }

  function handleTaskDeleted(id: string) {
    setTaskToDelete(tasks.find((task) => task.id === id) || null);
    setModalVisible(true);
  }

  function confirmDeleteTask() {
    if (taskToDelete) {
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
      setTasks(updatedTasks);
      saveTasks(updatedTasks); // Salvar as tarefas ao excluir
      setModalVisible(false);
      setTaskToDelete(null);
    }
  }

  const totalTasksCreated = tasks.length;
  const totalTasksCompleted = tasks.filter(({ isCompleted }) => isCompleted)
    .length;

  return (
    <View style={styles.container}>
      <Header
        inputRef={newTaskInputRef}
        task={newTask}
        onChangeText={setNewTask}
        onPress={handleTaskAdd}
      />
      <View style={styles.tasksContainer}>
        <View style={styles.info}>
          <View style={styles.row}>
            <Text style={styles.tasksCreated}>Criadas</Text>
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>{totalTasksCreated}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.tasksDone}>Concluídas</Text>
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>{totalTasksCompleted}</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(task) => task.id}
          renderItem={({ item }) => (
            <Task
              key={item.id}
              onTaskDone={() => handleTaskDone(item.id)}
              onTaskDeleted={() => handleTaskDeleted(item.id)}
              {...item}
            />
          )}
          ListEmptyComponent={<Empty />}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Excluir tarefa</Text>
            <Text style={styles.modalMessage}>
              Deseja realmente excluir a tarefa "{taskToDelete?.title}"?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={confirmDeleteTask}
              >
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
