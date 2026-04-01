import { storage } from "../config/storage";
import axiosClient from "./axiosClient";

async function addNewItem(data) {
  let err,
    response = undefined;
  data.added_by_user = await storage.get("user_name");
  console.log("data in api add new Item:");
  console.log(data);
  try {
    response = await axiosClient({
      method: "post",
      url: "/items/newItem",
      data: data,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function getItemsForOrderId(id) {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "get",
      url: `/items/${id}`,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function deleteItem(data) {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "delete",
      url: `/items/${data.id}`,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

export { addNewItem, getItemsForOrderId, deleteItem };
