import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (event) => {
    const userId = event.requestContext.authorizer.jwt.claims.sub;
    const workoutId = event.pathParameters?.workoutId;

    if (!workoutId) {
        return { statusCode: 400, body: JSON.stringify({ message: "workoutId is required" }) };
    }

    await client.send(new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { userId, workoutId },
    }));

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Workout deleted", workoutId }),
    };
};