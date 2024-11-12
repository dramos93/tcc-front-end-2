import { GroupOfStudents } from "../pages/dashboard/example";
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
      return responseJson;
    }

    else {
      LogoutAuth();
      return {};
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error');
    return {};
  }
};

export interface PostGame {
  user_id: number | null;
  class_id: number | null;
  multiplication_table: number;
  round: number;
  errors: number;
}

export const postGameAPI = async (data: PostGame, token: string | null): Promise<Response> => {
  const url = 'http://localhost:5000/multiplication-game';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token as string
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      alert('Erro na requisição');
      throw new Error('Erro na requisição');
    }

    return response;
  } catch (error) {
    console.error('Erro ao realizar a requisição:', error);
    throw error;
  }
};

export const getGameAPI = async (token: string | null, userId: number | null, classId: number | null): Promise<PostGame[]> => {
  const url = `http://localhost:5000/multiplication-game?user_id=${userId}&class_id=${classId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token as string
      }
    });

    if (!response.ok) {
      alert('Erro na requisição');
      throw new Error('Erro na requisição');
    }

    return response.json();
  } catch (error) {
    console.error('Erro ao realizar a requisição:', error);
    throw error;
  }
};

export const getClassFromTeacher = async (token: string | null, userId: number | null): Promise<GroupOfStudents[]> => {
  const url = `http://localhost:5000/get_class_from_teacher?user_id=${userId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token as string
      }
    });

    if (!response.ok) {
      alert('Erro na requisição');
      throw new Error('Erro na requisição');
    }
    const response_json = await response.json()
    console.log(response_json)
    return response_json;
  } catch (error) {
    console.error('Erro ao realizar a requisição:', error);
    throw error;
  }
};