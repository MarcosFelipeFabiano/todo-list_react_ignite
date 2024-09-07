import Clipboard from './assets/Clipboard.svg';
import styles from './App.module.css';
import { Header } from './components/Header';
import { Task, TaskType } from './components/Task';
import { useState, ChangeEvent, FormEvent, InvalidEvent } from 'react';
import { PlusCircle } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';

import './global.css';

function App() {
  const [tasksList, setTasksList] = useState<TaskType[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0);

  function handleNewTaskText(event: ChangeEvent<HTMLInputElement>){
    event?.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function hendleCreateNewTask(event: FormEvent){
    event?.preventDefault();

    if (newTaskText.trim() === '') {
      return;
    }

    const newTask: TaskType = {
      id: uuidv4(),
      content: newTaskText,
      taskCompleted: false
    };

    const updatedTasksList = [...tasksList, newTask];

    setTasksList(updatedTasksList);
    setTotalTasks(updatedTasksList.length);
    
    setNewTaskText('');
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>){
    event?.target.setCustomValidity('Esse campo é obrigatório');
  }

  function toggleCompletedTask(id_taskToToggleCheck: string){
    const tasksListWithCheckToggle = tasksList.map(task => {
      return {
        id: task.id,
        content: task.content,
        taskCompleted: task.id==id_taskToToggleCheck ? !task.taskCompleted : task.taskCompleted,
      }
    });

    setTasksList(tasksListWithCheckToggle);
    setTotalTasksCompleted(tasksListWithCheckToggle.filter(task => task.taskCompleted==true).length);
  }

  function deleteTask(id_taskToDelete: string){
    const updatedTasksList = tasksList.filter(task => task.id !== id_taskToDelete);
  
    setTasksList(updatedTasksList);
    
    setTotalTasks(updatedTasksList.length);
    setTotalTasksCompleted(updatedTasksList.filter(task => task.taskCompleted==true).length);
  }

  const isTaskListEmpty = tasksList.length==0;

  return (
    <>
      <Header />
      
      <div className={styles.newTask}>
        <form className={styles.formTask} onSubmit={hendleCreateNewTask}>
          <input
            type="text"
            name='taskContent'
            value={newTaskText}
            placeholder="Adicione uma nova tarefa"
            className={styles.inputTask}
            onChange={handleNewTaskText}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button
            type="submit"
            className={styles.buttonTask}
            title='Criar nova tarefa'
          >Criar <PlusCircle size={20}/></button>
        </form>
      </div>

      <main className={styles.tasks}>
        <header className={styles.headerTasks}>
          <div className={styles.createdTasks}>
            Tarefas criadas <span className={styles.infoTasks}>{totalTasks}</span>
          </div>
          <div className={styles.completedTasks}>
            Concluídas <span className={styles.infoTasks}>{totalTasksCompleted} de {totalTasks}</span>
          </div>
        </header>

        {isTaskListEmpty ? (
          <div className={styles.taskListIsEmpty}>
            <img src={Clipboard} alt="" />

            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : (
          <div className={styles.taskList}>
            {tasksList.map(task => {
              return <Task
                key={task.id}
                task={task}
                onToggleCompletedTask={toggleCompletedTask}
                onDeleteTask={deleteTask}
              />
            })}
          </div>
        )}
      </main>
    </>
  )
}

export default App
