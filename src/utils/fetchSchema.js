import axios from "axios";

const fetchSingleSchema = async (token, schemaId, setResult) => {
  const url = `${
    import.meta.env.VITE_DOMAIN
  }/pi-entity-service/v1.0/schemas/${schemaId}`;

  if (schemaId === "") {
    setResult("Schema ID can't be empty!!!");
    return;
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setResult(JSON.stringify(response.data, null, 4));
  } catch (error) {
    setResult(error?.response?.data?.errorMessage);
  }
};

const fetchMultipleSchemas = async (token, schemaId, setResults) => {
  const url = `${
    import.meta.env.VITE_DOMAIN
  }/pi-entity-service/v1.0/schemas/${schemaId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setResults((prevResults) => ({
      ...prevResults,
      [schemaId]: JSON.stringify(response.data, null, 4),
    }));
  } catch (error) {
    setResults((prevResults) => ({
      ...prevResults,
      [schemaId]: error?.response?.data?.errorObject?.errorMessage,
    }));
  }
};

export { fetchSingleSchema, fetchMultipleSchemas };
