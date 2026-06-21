import { Amplify } from "aws-amplify";


Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: "eu-west-2_Jr6wYrucP",
            userPoolClientId: "5stnskm0aj3j8g66an3ovkjii6",
        },
    },
});

export const API_BASE_URL = "https://xmvsz25oeg.execute-api.eu-west-2.amazonaws.com";