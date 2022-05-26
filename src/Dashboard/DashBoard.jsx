import { useAuthDispatchContext, useAuthStateContext } from "../AuthContext/AuthContext"
import { actionType } from "../AuthContext/AuthReducer";

export default function DashBoard() {
  const dispatch=useAuthDispatchContext();
  const {user}=useAuthStateContext();
  function handleLogout() {
    dispatch({
      type:actionType.logout_user
    });
    localStorage.removeItem("token")
  }
  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
        <h1 className="text-primary">DashBoard</h1>
        <h3>hi {user.name}</h3>
        <button onClick={handleLogout} className="btn btn-danger">logout</button>
    </div>
  )
}
