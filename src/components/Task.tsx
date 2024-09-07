import styles from './Task.module.css';
import { Check, Trash } from 'phosphor-react';

export interface TaskType {
    id: string;
    content: string;
    taskCompleted: boolean;
}

interface TaskProps {
    task: TaskType,
    onToggleCompletedTask: (id_taskToToggleCheck: string) => void
    onDeleteTask: (id_taskToDelete: string) => void
}

export function Task({ task, onToggleCompletedTask, onDeleteTask }: TaskProps){
    const { id, content, taskCompleted } = task;

    function handleTaskToggle(){
        onToggleCompletedTask(id);
    }

    function hendleDeleteTask(){
        onDeleteTask(id);
    }

    const checkboxCheckedClassname = taskCompleted
        ? styles['checkbox-checked']
        : styles['checkbox-unchecked']
    const paragraphCheckedClassname = taskCompleted
        ? styles['paragraph-checked']
        : ''
    
    return (
        <article className={styles.task}>
            <label htmlFor="checkbox" onClick={(handleTaskToggle)}>
                <input type="checkbox" checked={taskCompleted}  readOnly/>
                <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
                    {taskCompleted && <Check size={12} />}
                </span>

                <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>{content}</p>
            </label>

            <button
                className={styles.btnDeleteTask}
                title="Deletar tarefa"
                onClick={hendleDeleteTask}
            >
                <Trash size={16} />
            </button>
        </article>
    );
}