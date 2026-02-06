import axiosClient from "./axiosClient";

async function addNewProcedureTitle(data) {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "post",
      url: "/procedure_titles/new",
      data: data,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function getProcedureTitles() {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "get",
      url: `/procedure_titles`,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}
async function getProcedureTitlesForType(type) {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "get",
      url: `/procedure_titles/${type}`,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function editProcedureTitle(data) {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "post",
      url: `/procedure_titles/edit`,
      data: data,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

async function deleteProcedureTitle(id) {
  let err,
    response = undefined;
  try {
    response = await axiosClient({
      method: "delete",
      url: `/procedure_titles/${id}`,
    });
  } catch (e) {
    console.log(e.response.data);
    err = e.response.data;
  } finally {
    return [response, err];
  }
}

export {
  addNewProcedureTitle,
  getProcedureTitles,
  getProcedureTitlesForType,
  editProcedureTitle,
  deleteProcedureTitle,
};
