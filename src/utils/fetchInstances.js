import axios from "axios";

const fetchInstancesSingleSchemas = async (token, schemaId, setResult) => {
  const url = `https://ig.gov-cloud.ai/tf-entity-ingestion/v1.0/schemas/${schemaId}/instances/list`;

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

    const entitiesLength = response.data.entities.length;
    setResult(entitiesLength);
  } catch (error) {
    setResult(error?.response?.data?.errorObject?.errorMessage);
  }
};

const fetchInstancesMultipleSchemas = async (token, schemaId, setResults) => {
  const url = `https://ig.gov-cloud.ai/tf-entity-ingestion/v1.0/schemas/${schemaId}/instances/list`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const entitiesLength = response.data.entities.length;
    setResults((prevResults) => ({
      ...prevResults,
      [schemaId]: entitiesLength,
    }));
  } catch (error) {
    setResults((prevResults) => ({
      ...prevResults,
      [schemaId]: error?.response?.data?.errorObject?.errorMessage,
    }));
  }
};

export { fetchInstancesMultipleSchemas, fetchInstancesSingleSchemas };
