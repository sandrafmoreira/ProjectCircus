
const API_KEY = 'sTvzXgLzKcATFWhYQb4IcaNm0hAgIp4WYAoEFBMwftIakPGCzcBkYKuu'

export async function get(apiBaseUrl, endpoint) {
    try {
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