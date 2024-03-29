import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";

export default function Profile() {
  const { userId } = useParams();
  const {userId: id } = useContext(UserContext);

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/users/current', {
  //     method: 'GET',
  //     mode: 'cors',
  //     credentials: 'include',
  //   }).then((res) => {
  //     if (res.ok) {
  //       res.json().then((json) => setUserId(json));
  //     }
  //   });
  // }, []);

  return (
    <div>
      {id}
      <h1>hello from profile</h1>
    </div>
  )
}
