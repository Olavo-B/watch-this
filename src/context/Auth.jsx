import { createContext, useEffect, useState } from "react";
import { createUser, fetchUserList, handleUserLogin } from "../api/userData";


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const asyncEffect = async () => {
      const userToken = localStorage.getItem("user_token");
      const usersStorage = await fetchUserList();

      if (userToken && usersStorage) {
        const hasUser = usersStorage?.filter(
          (user) => user.id === JSON.parse(userToken).id
        );

        if (hasUser) setUser(JSON.parse(userToken));
      }
    }
    asyncEffect();
  }, []);

  const signin = async (email, password) => {
    const usersStorage = await fetchUserList(); // <-- API call to fetch users list


    const hasUser = usersStorage?.filter((user) => user.email === email);

    const responseLogin = await handleUserLogin(email, password); // <-- API call to handle login

    if (hasUser?.length) {
      if (responseLogin) {
        const token = Math.random().toString(36).substring(2);
        const id    = hasUser[0].id;
        localStorage.setItem("user_token", JSON.stringify({ id, token }));
        setUser({ id, token });
        return;
      } else {
        throw new Error( "E-mail ou senha incorretos");
      }
    } else {      
      throw new Error( "Usuário não cadastrado");
    }
  };

  const  signup = async (email, password) => {
    const usersStorage = await fetchUserList();

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      throw new Error( "Já tem uma conta com esse E-mail");
    } else {
      console.log("Usuário cadastrado com sucesso");
      await createUser({ email, password, catalog: [] });
    }

    return;
  };


  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};