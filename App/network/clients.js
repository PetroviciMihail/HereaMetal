import axiosClient from "./axiosClient";

async function registerNewClient(data) {
  let err,
    response = undefined;
  try {
    console.log("data in api client:");
    console.log(data);
    response = await axiosClient({
      method: "post",
      url: "/clients/newClient",
      data: data,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function getClients() {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "get",
      url: "/clients",
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function getClient(name) {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "get",
      url: `/clients/${name}`,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

export { registerNewClient, getClients, getClient };
