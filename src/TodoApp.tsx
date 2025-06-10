
import { useState } from 'react';
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Calendar } from "./components/ui/calendar";
import { Checkbox } from "./components/ui/checkbox";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";

interface Task {
  title: string;
  completed: boolean;
  date: Date;
}

interface TaskList {
  name: string;
  tasks: Task[];
}

export default function TodoApp() {
  const [lists, setLists] = useState<TaskList[]>([{ name: "Default", tasks: [] }]);
  const [selectedList, setSelectedList] = useState<number>(0);
  const [newTask, setNewTask] = useState<string>("");
  const [newListName, setNewListName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const addTask = () => {
    if (!newTask.trim()) return;
    const updatedLists = [...lists];
    updatedLists[selectedList].tasks.push({
      title: newTask,
      completed: false,
      date: selectedDate,
    });
    setLists(updatedLists);
    setNewTask("");
  };

  const toggleComplete = (taskIndex: number) => {
    const updatedLists = [...lists];
    const task = updatedLists[selectedList].tasks[taskIndex];
    task.completed = !task.completed;
    setLists(updatedLists);
  };

  const editTask = (index: number, title: string) => {
    const updatedLists = [...lists];
    updatedLists[selectedList].tasks[index].title = title;
    setLists(updatedLists);
  };

  const addList = () => {
    if (!newListName.trim()) return;
    setLists([...lists, { name: newListName, tasks: [] }]);
    setNewListName("");
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">📝 Task Organizer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3 items-center">
            <Input
              placeholder="Create a new list..."
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addList}>Add List</Button>
          </div>
          <div className="flex gap-3 flex-wrap">
            {lists.map((list, i) => (
              <Button
                key={i}
                variant={i === selectedList ? "default" : "outline"}
                onClick={() => setSelectedList(i)}
              >
                {list.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Add New Task</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Task Title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded border"
          />
          <Button className="w-full md:col-span-2" onClick={addTask}>Add Task</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Tasks in "{lists[selectedList].name}"</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {lists[selectedList].tasks.length === 0 && (
            <p className="text-muted-foreground">No tasks available. Start by adding one!</p>
          )}
          {lists[selectedList].tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 border rounded-lg p-3 shadow-sm"
            >
              <div className="flex items-center gap-3 flex-1">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleComplete(index)}
                />
                <Input
                  className="flex-1"
                  value={task.title}
                  onChange={(e) => editTask(index, e.target.value)}
                />
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {format(new Date(task.date), 'PPP p')}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
