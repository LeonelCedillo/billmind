import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "#components/ui/label";
import { Input } from "#components/ui/input";
import { Button } from "#components/ui/button";


export default function Register() { 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const path = "/api/auth/register";
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      navigate("/login");
    } catch (err) {
      setError("Something went wrong");
    } 
  }

  return (
    <form onSubmit={handleSubmit}>
      <Label>username</Label>
      <Input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <br />
      <Label>email</Label>
      <Input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <br />
      <Label>password</Label>
      <Input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      { error && <p>{error}</p> }
      <Button>Register</Button>
    </form>
  );
}
