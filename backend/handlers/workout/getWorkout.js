import {DynamoDBDocumentClient, GetCommand} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (event) => {
    const userId = event.requestContext.authorizer.jwt.claims.sub;
    const workoutId = event.pathParameters?.workoutId;

    if (!workoutId) {
        return { statusCode: 400, body: JSON.stringify({ message: "workoutId is required" }) };
    }

    const result = await client.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: { userId, workoutId }
    }));

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.Item),
    };
};