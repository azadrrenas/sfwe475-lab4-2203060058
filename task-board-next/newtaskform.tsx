import React, { useState } from "react";
import { CreateTaskSchema, type CreateTaskInput } from "./schemas";

interface NewTaskFormProps {
  onAddTask: (data: CreateTaskInput) => void;
}

function NewTaskForm({ onAddTask }: NewTaskFormProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Zod doğrulaması (Strand 2 Step 3)
    const result = CreateTaskSchema.safeParse({ title, dueDate });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    onAddTask(result.data);
    setTitle("");
    setDueDate("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* Strand 3 Step 1: Label kullanımı */}
        <label htmlFor="title">Task title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {/* Strand 2 Step 4: Hatayı doğrudan alanın altına yazdırma */}
        {errors.title && (
          <p id="title-error" style={{ color: "red" }}>
            {errors.title[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="dueDate">Due date</label>
        <input
          id="dueDate"
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit">Add task</button>
    </form>
  );
}

export default NewTaskForm;