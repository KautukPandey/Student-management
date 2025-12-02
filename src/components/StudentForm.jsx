import { useState, useEffect } from "react";
import { api } from "../api";

export default function StudentForm({ fetchStudents, editingStudent, setEditingStudent }) {
  const [student, setStudent] = useState({
    name: "",
    roll: "",
    section: "A",
    result: 0
  });

  useEffect(() => {
    if (editingStudent) setStudent(editingStudent);
  }, [editingStudent]);

  const onChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingStudent) {
      await api.put(`/students/${student.id}`, student);
      setEditingStudent(null);
    } else {
      await api.post("/students", student);
    }

    fetchStudents();
    setStudent({ name: "", roll: "", section: "A", result: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">
        {editingStudent ? "Update Student" : "Add Student"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Student Name"
        value={student.name}
        onChange={onChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="roll"
        placeholder="Roll Number"
        value={student.roll}
        onChange={onChange}
        className="w-full p-2 border rounded"
        required
      />

      <select
        name="section"
        value={student.section}
        onChange={onChange}
        className="w-full p-2 border rounded"
      >
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>

      <input
        type="number"
        name="result"
        placeholder="Result Marks"
        value={student.result}
        onChange={onChange}
        className="w-full p-2 border rounded"
        required
      />

      <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {editingStudent ? "Update" : "Add"}
      </button>
    </form>
  );
}
