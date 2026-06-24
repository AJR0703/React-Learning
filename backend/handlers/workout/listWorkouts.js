import {DynamoDBDocumentClient, QueryCommand} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (event) => {
    const userId = event.requestContext.authorizer.jwt.claims.sub;

    const result = await client.send(new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": userId },
    }));

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.Items ?? []),
    };
};