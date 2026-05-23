import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { type BillDetails } from "../types";


export default function Bill() { 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bill, setBill] = useState<BillDetails>();
  const { id } = useParams();
  const path = `/api/bills/${id}`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchBill() {
      try {
        const response = await fetch(path, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        setBill(data);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchBill();
  }, []);

  return (
    <div>
      <Link to="/">Home</Link>
      <br /> <br />
      <h2>{bill?.bill.name}</h2>
      { loading && <p>Loading</p>}
      { error && <p>{error}</p> }
      { !loading && !error && bill &&
        <div>
          <p>{bill.bill.amount ? `$${bill.bill.amount}` : "Unknown"}</p>
          <p>{new Date(bill.bill.dueDate).toLocaleDateString()}</p>
          <p>{bill.bill.recurrence}</p>
          <br />
          <h2>Members</h2>
          {bill.members.map(member => (
            <div key={member.userId}>
              <p>{member.userName}</p>
              <p>{member.email}</p>
              <br />
            </div>
          ))}
          <br />
          <h2>Rules</h2>
          {bill.rules.map(rule => (
            <div key={rule.id}>
              <p>{rule.daysBeforeDue}</p>
              <br />
            </div>
          ))}
        </div>
      }
    </div>
  ); 
}
