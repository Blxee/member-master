import { UserContext } from "../App";
import { useContext } from "react";

export default function Dashboard() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className='w-100 d-flex flex-row' style={{height: 1500}}>
      <h1 className="flex-grow-1">hello from dashboard</h1>
      <h1 className="position-sticky top-0 align-self-start">hello from dashboard</h1>
    </div>
  )
}
