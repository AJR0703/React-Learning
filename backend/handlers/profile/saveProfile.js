import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// TODO: Check if email already exists

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (event) => {
    const userId = event.requestContext.authorizer.jwt.claims.sub;
    const body = JSON.parse(event.body || "{}");

    const item = {
        userId,
        name: body.name,
        email: body.email,
    };

    await client.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
    }));

    return {
        statusCode: 201,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    };
};