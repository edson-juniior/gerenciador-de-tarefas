import { useEffect, useState } from "react";
import AddTask from "./components/AddTasks";
import Tasks from "./components/Tasks";
import { v4 as uuidv4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  // ✅ Alternar tarefa concluída
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  // ✅ Excluir tarefa
  function onDeleteTasksClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  // ✅ Adicionar nova tarefa
  function onAddTaskSubmit(title, description) {
    const newTask = {
    id: uuidv4(),
    title,
    description,
    isCompleted: false,
  };
  setTasks([...tasks, newTask]);
}

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
      <Title>
          Gerenciador de Tarefas
      </Title>
    
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTasksClick={onDeleteTasksClick}
        />
      </div>
    </div>
  );
}

export default App;
