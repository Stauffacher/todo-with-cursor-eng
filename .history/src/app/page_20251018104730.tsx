"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Edit2, Check, X } from "lucide-react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState("")

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue.trim(),
          completed: false,
        },
      ])
      setInputValue("")
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const startEditing = (id: number, text: string) => {
    setEditingId(id)
    setEditingText(text)
  }

  const saveEdit = (id: number) => {
    if (editingText.trim()) {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: editingText.trim() } : todo)))
      setEditingId(null)
      setEditingText("")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText("")
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      action()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center">My Todo List</h1>
          <p className="text-center text-sm mt-2 opacity-90">Stay organized and productive</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Add Todo Input */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add a new task..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, addTodo)}
                  className="flex-1"
                />
                <Button onClick={addTodo}>Add Task</Button>
              </div>
            </CardContent>
          </Card>

          {/* Todo List */}
          <div className="space-y-3">
            {todos.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <p className="text-center text-muted-foreground">No tasks yet. Add one to get started!</p>
                </CardContent>
              </Card>
            ) : (
              todos.map((todo) => (
                <Card key={todo.id} className="transition-all hover:shadow-md">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleComplete(todo.id)}
                        className="mt-0.5"
                      />

                      {editingId === todo.id ? (
                        <Input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, () => saveEdit(todo.id))}
                          className="flex-1"
                          autoFocus
                        />
                      ) : (
                        <span
                          className={`flex-1 ${
                            todo.completed ? "line-through text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {todo.text}
                        </span>
                      )}

                      <div className="flex gap-2">
                        {editingId === todo.id ? (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => saveEdit(todo.id)}
                              className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={cancelEdit}
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => startEditing(todo.id, todo.text)}
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => deleteTodo(todo.id)}
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Stats */}
          {todos.length > 0 && (
            <Card className="bg-muted/50">
              <CardContent className="py-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Total tasks: {todos.length}</span>
                  <span>Completed: {todos.filter((t) => t.completed).length}</span>
                  <span>Remaining: {todos.filter((t) => !t.completed).length}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 px-4 mt-auto">
        <div className="max-w-3xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Todo App. Built with Next.js and shadcn/ui</p>
          <p className="mt-1">Stay productive, stay organized ✨</p>
        </div>
      </footer>
    </div>
  )
}
