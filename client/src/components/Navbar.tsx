import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";


export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const hideDashboardLink = ["/dashboard"].includes(location.pathname);

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }
  
  return (
    <div>
      {!hideDashboardLink && <Link to="/dashboard">Dashboard</Link>}
      <Link to="bills/new">+ New Bill</Link>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}


