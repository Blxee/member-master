import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();

  useEffect(() => {
    fetch('http://localhost:5000/api/users/current', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        res.json().then((json) => setUserId(json));
      }
    });
  }, []);

  return (
    <div>
      {userId}
      <h1>hello from profile</h1>
    </div>
  )
}
