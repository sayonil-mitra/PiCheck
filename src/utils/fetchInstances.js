const fetchData = async (schemaId) => {
  const url = `https://ig.gov-cloud.ai/tf-entity-ingestion/v1.0/schemas/${schemaId}/instances/list`;
  const token = "YOUR_TOKEN_HERE"; // Replace with your actual token

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
    console.error("Error fetching data:", error);
    setResults((prevResults) => ({
      ...prevResults,
      [schemaId]: "Error fetching data",
    }));
  }
};

export default fetchData;
