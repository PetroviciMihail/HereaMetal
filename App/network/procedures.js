import { Platform } from "react-native";
import { storage } from "../config/storage";
import axiosClient from "./axiosClient";
import { buildFormData } from "./utils";

async function addNewProcedureToItemId(data, images) {
  let err,
    response = undefined;
  data.added_by_user = await storage.get("user_name");

  const formData = await buildFormData(data, images);

  try {
    response = await axiosClient({
      method: "post",
      url: "/procedures/new",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(formData);
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    console.log(
      "am TRIMIT REQUEST CĂTRE:",
      `http://192.168.1.2:3000/procedures`,
    );
    return [response, err];
  }
}

async function getProceduresForItemId(id) {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "get",
      url: `/procedures/${id}`,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function completeProcedure(data) {
  let err,
    response = undefined;
  data.completed_by_user = await storage.get("user_name");
  console.log("data in api complte procedure:");
  console.log(data);
  try {
    response = await axiosClient({
      method: "post",
      url: `/procedures/complete`,
      data: data,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function editProcedure(data) {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "post",
      url: `/procedures/edit`,
      data: data,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function deleteProcedure(data) {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "delete",
      url: `/procedures/${data.id}`,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function getNextProcedures() {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "get",
      url: `/procedures/nextProcedures`,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

export {
  addNewProcedureToItemId,
  getProceduresForItemId,
  completeProcedure,
  editProcedure,
  getNextProcedures,
  deleteProcedure,
};
