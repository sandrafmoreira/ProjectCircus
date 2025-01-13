// modelo para fazer uma requisição de dados a API 
const ACCESS_KEY = 'y39lGmU1vRKl45G6rfmQ6daukd-AHulwbkLMBLUfNlE'
const API_KEY = 'sTvzXgLzKcATFWhYQb4IcaNm0hAgIp4WYAoEFBMwftIakPGCzcBkYKuu'
// export async function get(apiBaseUrl, endpoint) {
//     try {
        

//         const response = await fetch(`${apiBaseUrl}/${endpoint}`, {

//             headers: {
//                 Authorization: `Client-ID ${ACCESS_KEY}`
                
//             },
//         });
        

//         return handleResponse(response);
//     } catch (error) {
//         console.error(`Error fetching ${endpoint}:`, error);
//         throw error;
//     }
// }

export async function get(apiBaseUrl, endpoint) {
    try {
        console.log('kkkkk');

        const response = await fetch(`${apiBaseUrl}/${endpoint}`, {

            headers: {
                Authorization: API_KEY
                
            },
        });
        console.log('entrou');

        return handleResponse(response);
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
    }
}


// lidar com a resposta 
async function handleResponse(response) {
    if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
    `API request failed with status ${response.status}: ${errorMessage}`
    );
    }
    const data = await response.json();
    return data;
    }