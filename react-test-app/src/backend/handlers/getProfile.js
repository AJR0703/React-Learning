import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (event) => {
    const userId = event.requestContext.authorizer.jwt.claims.sub;

    const result = await client.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: { userId: userId },
    }));

    if (!result.Item) {
        return { statusCode: 404, body: JSON.stringify({ message: "Profile not found" }) };
    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( result.Item ),
    };
};