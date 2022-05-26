import { useEffect, useLayoutEffect, useState } from "react";
import {
  useAuthDispatchContext,
  useAuthStateContext,
} from "../AuthContext/AuthContext";
import { actionType } from "../AuthContext/AuthReducer";

import { get, post } from "../services/axios";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error, loading } = useAuthStateContext();
  const [token, setToken] = useState();

  const dispatch = useAuthDispatchContext();

  function handleLoginSubmit(event) {
    event.preventDefault();
    dispatch({
      type: actionType.login_request,
    });
    

    post("login",{username,password}).then((response) => {
      const { success, data, error } = response;
      if (!success) {
        dispatch({
          type: actionType.login_error,
          payload: {
            error,
          },
        });
      } else {
        setToken(data);
      }
    });
  }

  useEffect(() => {
  if(token){
    get('users/me',{ headers: { authorization: token}})
    .then(({ success, data }) => {
      if (success) {
        dispatch({
          type: actionType.login_success,
          payload: {
            token,
            data,
          },
        });
        localStorage.setItem("token", token);
      }
    })
    .catch((error) => {
      dispatch({
        type: actionType.login_error,
        payload: {
          error,
        },
      });
    });
  }
  }, [dispatch, token]);
  //uselayouteffectبه اخرین رندر اشاره دارد
  //{//uselayouteffect is sync this means that wait until our sideeffect be`\done
  //,but useeffect is asynce,we use useeffect 95% and uselayouteffect 5%//}
  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({
        type: actionType.login_request,
      });
      setToken(token);
    }
  }, [dispatch]);
  return (
    <>
      <div className="login-form d-flex flex-column align-items-center">
        {loading ? (
          <div className="text-danger fs-1">loading......</div>
        ) : (
          <>
            <h1 className="text-success">login form</h1>
            <form
              onSubmit={handleLoginSubmit}
              action=""
              className="d-flex flex-column align-items-center "
            >
              <label htmlFor="user-name">username</label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                id="user-name"
                type="text"
                placeholder="inter your username"
              />
              <label htmlFor="pass">password</label>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                id="pass"
                type="text"
                placeholder="inter your password"
              />
              {error ? <p>{error}</p> : null}
              <button type="submit" className="btn btn-primary mt-2">
                submit
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
