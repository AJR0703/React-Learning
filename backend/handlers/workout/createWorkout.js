import {DynamoDBDocumentClient, PutCommand} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (event) => {
    const userId = event.requestContext.authorizer.jwt.claims.sub;
    const body = JSON.parse(event.body || "{}");

    const exercises = Array.isArray(body.exercises) ? body.exercises : [];

    const item = {
        userId,
        workoutId: randomUUID(),
        workoutName: body.workoutName,
        exercises,
        createdAt: new Date().toISOString(),
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