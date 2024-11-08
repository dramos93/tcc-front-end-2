import { getAuth, LogoutAuth } from "../routes/CheckAuth";

export const getTokenAPI = async (user_nickname: string, user_password: string) => {
  try {
    const body = {
      "user_nickname": user_nickname,
      "user_password": user_password
    };
    const response = await fetch("http://localhost:5000/auth", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'mode': 'cors',
        // 'credentials': 'include'
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
    return await response.json();
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error');
    return { token: "" };
  }
};

export const authTokenAPI = async () => {
  try {
    // const body = {
    //   "user_nickname": user_nickname,
    //   "user_password": user_password
    // };
    const token = await getAuth();
    const init = {
      method: 'GET',
      headers: { 'token': token, 'Content-Type': 'application/json', }
    };

    const response = await fetch("http://localhost:5000/auth", init);
    const responseJson = await response.json();

    if (responseJson.token == token) {
      // throw new Error('Authentication failed');
      return true;
    }
    
    else {
      LogoutAuth();
      return false;
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error');
    return false;
  }
};