import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "#components/ui/label";
import { Input } from "#components/ui/input";
import { Button } from "#components/ui/button";


export default function NewBill() { 
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const path = "/api/bills/";
    try {
      const response = await fetch(path, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          name,
          dueDate,
          recurrence,
          amount
        })
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong");
    }
    
  }
  return (
    <form onSubmit={handleSubmit}>
      <Label>Bill Name</Label>
      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <Label>Due Date</Label>
      <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <br />
      <Label>Amount</Label>
      <Input type="number" value={amount ?? ""} 
        onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : undefined)} 
      />
      <br />
      <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
        <option value="">Select recurrence</option>
        <option value="once">Once</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <br />
      <Button type="submit">Submit</Button>
      {error && <p>{error}</p>}
    </form>
  ); 
}
