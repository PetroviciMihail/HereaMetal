import { storage } from "../config/storage";
import axiosClient from "./axiosClient";

async function createNewOrder(data) {
  let err,
    response = undefined;
  try {
    data.added_by_user = await storage.get("user_name");
    console.log("data in api create new Order:");
    console.log(data);
    response = await axiosClient({
      method: "post",
      url: "/orders/newOrder",
      data: data,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function getOrders() {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "get",
      url: "/orders",
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function getCompletedOrders() {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "get",
      url: "/orders/completedOrders",
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function completeOrder(data) {
  let err,
    response = undefined;
  if (data.completed_by_user === "delete") {
    data.completed_by_user = "";
  } else {
    data.completed_by_user = await storage.get("user_name");
  }
  console.log("data in api finish order:");
  console.log(data);
  try {
    response = await axiosClient({
      method: "post",
      url: "/orders/complete",
      data: data,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function deleteOrder(data) {
  let err,
    response = undefined;

  console.log("data in api delete order:");
  console.log(data);
  try {
    response = await axiosClient({
      method: "delete",
      url: `/orders/${data.id}`,
      data: data,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function deliverOrder(data) {
  let err,
    response = undefined;
  console.log("data in api update delivery order:");
  console.log(data);
  try {
    response = await axiosClient({
      method: "post",
      url: "/orders/deliverOrder",
      data: data,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

export {
  createNewOrder,
  getOrders,
  completeOrder,
  getCompletedOrders,
  deliverOrder,
  deleteOrder,
};
