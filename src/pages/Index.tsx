import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Task, TaskType } from "@/components/Task";
import { Timer } from "@/components/Timer";
import { KawaiiIcon } from "@/components/KawaiiIcon";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { PlusCircle, Bell } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState("");
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [isBreak, setIsBreak] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const { toast } = useToast();

  // Load tasks from localStorage on initial load
  useEffect(() => {
    const savedTasks = localStorage.getItem("kawaii-tasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error("Error loading tasks from localStorage:", e);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("kawaii-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const newTaskItem: TaskType = {
      id: uuidv4(),
      title: newTask,
      completed: false,
      inProgress: false,
    };

    setTasks([...tasks, newTaskItem]);
    setNewTask("");

    toast({
      title: "Task added!",
      description: `"${newTask}" has been added to your tasks.`,
    });
  };

  const startTask = (id: string) => {
    setTasks(
      tasks.map((task) => ({
        ...task,
        inProgress: task.id === id,
      }))
    );
    setActiveTaskId(id);
    
    const activeTask = tasks.find(task => task.id === id);
    if (activeTask) {
      toast({
        title: "Timer started!",
        description: `Working on "${activeTask.title}"`,
      });
    }
  };

  const completeTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, inProgress: false }
          : task
      )
    );
    
    // If we're completing the active task, cancel the timer
    if (activeTaskId === id) {
      setActiveTaskId(null);
    }
    
    const task = tasks.find(t => t.id === id);
    if (task && !task.completed) {
      setCompletedCount(prev => prev + 1);
      toast({
        title: "Task completed!",
        description: `Great job completing "${task.title}"!`,
      });
    }
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    
    setTasks(tasks.filter((task) => task.id !== id));
    
    // If we're deleting the active task, cancel the timer
    if (activeTaskId === id) {
      setActiveTaskId(null);
    }
    
    if (taskToDelete) {
      toast({
        title: "Task deleted",
        description: `"${taskToDelete.title}" has been removed.`,
      });
    }
  };

  const handleTimerComplete = () => {
    if (isBreak) {
      // Break timer finished
      setIsBreak(false);
      setActiveTaskId(null);
    } else {
      // Work timer finished, start break
      setIsBreak(true);
      
      // Mark task as completed
      if (activeTaskId) {
        completeTask(activeTaskId);
      }
    }
  };

  const cancelTimer = () => {
    setTasks(
      tasks.map((task) => ({
        ...task,
        inProgress: false,
      }))
    );
    setActiveTaskId(null);
  };

  const activeTask = activeTaskId ? tasks.find(task => task.id === activeTaskId)?.title : undefined;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-3xl font-pixel text-pixel-dark pixel-border bg-pixel-lightBlue py-2 px-4 inline-block">
              PIXEL TIMER
            </h1>
          </div>
          <p className="text-pixel-dark font-pixel text-xs mt-4">
            ADD TASKS. SET TIMERS. STAY FOCUSED.
          </p>
          {completedCount > 0 && (
            <div className="mt-4 bg-pixel-blue inline-block py-1 px-3 pixel-border">
              <span className="text-white font-pixel text-xs">
                {completedCount} TASKS DONE! 
                <span className="ml-1">★</span>
              </span>
            </div>
          )}
        </header>

        {(activeTaskId || isBreak) && (
          <Timer 
            isBreak={isBreak} 
            onTimerComplete={handleTimerComplete} 
            onCancel={cancelTimer}
            activeTask={activeTask}
          />
        )}

        {!isBreak && (
          <>
            <form onSubmit={addTask} className="mb-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="ADD NEW TASK..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="rounded-none border-2 border-black focus:border-pixel-blue font-pixel text-xs"
                />
                <Button
                  type="submit"
                  className="bg-pixel-blue hover:bg-pixel-darkBlue text-white kawaii-button font-pixel text-xs"
                >
                  <PlusCircle size={16} className="mr-1" /> ADD
                </Button>
              </div>
            </form>

            <div className="kawaii-card bg-pixel-lightBlue">
              <h2 className="text-xl font-pixel mb-4 flex items-center text-pixel-dark">
                <Bell size={18} className="mr-2 text-pixel-blue" />
                MY TASKS
              </h2>

              {tasks.length === 0 ? (
                <div className="text-center py-8 border-2 border-black bg-white">
                  <p className="font-pixel text-xs text-pixel-gray">
                    NO TASKS YET! ADD SOME TO GET STARTED.
                  </p>
                  <div className="mx-auto mt-4 w-16 h-16 bg-pixel-blue pixel-animate"></div>
                </div>
              ) : (
                tasks.map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    onStart={startTask}
                    onComplete={completeTask}
                    onDelete={deleteTask}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
