import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "#components/ui/label";
import { Input } from "#components/ui/input";
import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { apiFetch } from "../utils/auth";


export type UserFormProps = {
  path: string;
  title: string;
  redirect: string;
  reqMethod: string;
  submitBtnName: string;
}


export default function UserForm(props: UserFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    try {
      const response = await apiFetch(props.path, { 
        method: props.reqMethod, 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, email, password }) 
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      navigate(props.redirect);
    } catch {
      setError("Something went wrong");
    } 
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label>username</Label>
              <Input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div>
              <Label>email</Label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div>
              <Label>password</Label>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            { error && <p>{error}</p> }
            <Button>{props.submitBtnName}</Button>
          </form>
        </CardContent>
      </Card>
    </div>    
  );
}
