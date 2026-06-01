import { useNavigate } from "react-router-dom";
import { Button } from "#components/ui/button";


export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/login")}>Login</Button>
      <br />
      <br />
      <Button onClick={() => navigate("/register")}>Register</Button>
    </div>
  );
}