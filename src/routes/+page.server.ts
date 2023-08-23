// import {VITE_OPENAI_API_KEY} from "$env/static/private";
// import {VITE_OPENAI_ENDPOINT} from "$env/static/private";
// import axios from "axios";
//
// export async function getChatGPTResponse(playerMove: string) {
//     try {
//         const response = await axios.post(
//             VITE_OPENAI_ENDPOINT,
//             {
//                 prompt: `Player chose ${playerMove}. ChatGPT:`,
//                 max_tokens: 50,
//                 temperature: 0.7
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${VITE_OPENAI_API_KEY}`,
//                 },
//             }
//         );
//
//         return response.data.choices[0].text;
//     } catch (error) {
//         console.error('Error calling OpenAI API:', error);
//         throw error;
//     }
// }