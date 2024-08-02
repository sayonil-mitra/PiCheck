import axios from "axios";

export default async function SchemaCreationApi(
  entityName,
  description,
  universe,
  attributes,
  primaryKey,
  setResult
) {
  const payload = {
    entityName,
    description,
    schemaReadAccess: "PUBLIC",
    dataReadAccess: "PUBLIC",
    dataWriteAccess: "PUBLIC",
    metadataReadAccess: "PUBLIC",
    metadataWriteAccess: "PUBLIC",
    universes: [universe],
    tags: {
      BLUE: ["VoxaCampaigns"],
    },
    attributes: attributes.map((attr) => ({
      name: attr.name,
      nestedName: attr.nestedName,
      type: { type: attr.type },
      required: attr.required,
      reference: false,
      childAttributes: [],
      access: "PUBLIC",
    })),
    primaryKey,
    execute: "PUBLIC",
    visibility: "PUBLIC",
  };
  try {
    const response = await axios.post(
      "https://ig.gov-cloud.ai/pi-entity-service/v1.0/schemas",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN_XPX}`,
        },
      }
    );
    setResult({
      statusCode: response.status,
      statusText: response.data.schemaId,
    });
  } catch (error) {
    setResult(error?.response?.data?.errorMessage || "An error occurred");
  }
}
