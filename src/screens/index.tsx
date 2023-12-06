import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Text, View, Alert, TextInput } from 'react-native';
import { Empty } from '../components/Empty';
import { Header } from '../components/Header';
import { Task } from '../components/Task';
import { TaskDTO } from '../dtos/TaskDTO';
import { uuid } from '../utils/uuid';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function HomeScreen() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [newTask, setNewTask] = useState('');
  const newTaskInputRef = useRef<TextInput>(null);

  // Função para salvar as tarefas no AsyncStorage
  const saveTasksToStorage = async (tasks: TaskDTO[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Erro ao salvar tarefas no AsyncStorage:', error);
    }
  };

  // Função para carregar as tarefas do AsyncStorage
  const loadTasksFromStorage = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas do AsyncStorage:', error);
    }
  };

  useEffect(() => {
    // Carregar as tarefas do AsyncStorage ao montar o componente
    loadTasksFromStorage();
  }, []);

  function handleTaskAdd() {
    if (newTask !== '' && newTask.length >= 5) {
      const updatedTasks = [
        ...tasks,
        { id: uuid(), isCompleted: false, title: newTask.trim() },
      ];

      setTasks(updatedTasks);
      saveTasksToStorage(updatedTasks);

      setNewTask('');
      newTaskInputRef.current?.blur();
    }
  }

  function handleTaskDone(id: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });

    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  }

  function handleTaskDeleted(id: string) {
    Alert.alert('Excluir tarefa', 'Desejar excluir essa tarefa?', [
      {
        text: 'Sim',
        style: 'default',
        onPress: () => {
          const updatedTasks = tasks.filter((task) => task.id !== id);
          setTasks(updatedTasks);
          saveTasksToStorage(updatedTasks);
        },
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  }

  const totalTasksCreated = tasks.length;
  const totalTasksCompleted = tasks.filter(({ isCompleted }) => isCompleted).length;

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
    </View>
  );
}
