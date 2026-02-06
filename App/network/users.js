import axiosClient from "./axiosClient";
import * as SecureStore from "expo-secure-store";

async function registerNewUser(data) {
  try {
    console.log("data in api");
    console.log(data);
    const response = await axiosClient({
      method: "post",
      url: "/users/register",
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return response;
  } catch (e) {
    console.log(e);
    console.log(e.response.data);
  } finally {
  }
}
async function logIn(data) {
  let response,
    err = undefined;
  try {
    console.log("\nLOG in attempt");
    console.log(data);
    console.log("\n");
    response = await axiosClient({
      method: "post",
      url: "/users/login",
      data: {
        name: data.name,
        password: data.password,
      },
    });
    const { token } = response.data;
    await SecureStore.setItemAsync("jwt_token", token);
    await SecureStore.setItemAsync("user_name", data.name);
  } catch (e) {
    //console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function getUsers() {
  let response,
    err = undefined;
  try {
    response = await axiosClient({
      method: "get",
      url: "/users",
    });
  } catch (e) {
    //console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function getUserProcedures(data) {
  let response,
    err = undefined;
  try {
    response = await axiosClient({
      method: "post",
      url: `/users/getProcedures`,
      data: data,
    });
  } catch (e) {
    err = e.reponse.data;
  } finally {
    return [response, err];
  }
}

async function checkJWT() {
  let response,
    err = undefined;
  try {
    console.log("   \n     check JWT \n ");

    response = await axiosClient({
      method: "get",
      url: "/users/me",
    });
  } catch (e) {
    //console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

export { registerNewUser, logIn, getUsers, getUserProcedures, checkJWT };
