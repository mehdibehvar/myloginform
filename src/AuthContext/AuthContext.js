import { createContext,useContext,useReducer } from "react";
import AuthReducer, { initialState } from "./AuthReducer";

 const AuthStateContext=createContext();
const AuthDispatchContext=createContext();
export const useAuthStateContext=()=>{
    const context=useContext(AuthStateContext);
    if(!context){
        throw Error("Authstatecontext must  use authprovider");
    }
    return context;
}
export const useAuthDispatchContext=()=>{
    const context=useContext(AuthDispatchContext);
    if(!context){
        throw Error("AuthDispatchContext must  use authprovider");
    }
    return context;
}
function AuthProvider({children}) {
    const [state, dispatch] = useReducer(AuthReducer,initialState)
    return <AuthDispatchContext.Provider value={dispatch}>
<AuthStateContext.Provider value={state}>
{children}
</AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
}
export default AuthProvider;