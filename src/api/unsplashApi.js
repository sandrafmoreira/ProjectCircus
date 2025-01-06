
const ACCESS_KEY = 'y39lGmU1vRKl45G6rfmQ6daukd-AHulwbkLMBLUfNlE'


// modelo para fazer uma requisição de dados a API 
// export async function get(query) {
                   
//     try {
//       const response = await fetch(`${UNSPLASH_API_BASE_URL}/search/photos?query=${query}`,{
//         headers:{
//             Authorization: `Client-ID ${ACCESS_KEY}`
//         }
//       });
//       return handleResponse(response);
//     } catch (error) {
//       console.error(`Erro ao buscar fotos do Unsplash para: ${query}:`, error);
//       throw error;
//     }
//   }

export async function get(apiBaseUrl, endpoint) {
    
try {
const response = await fetch(`${apiBaseUrl}/${endpoint}`, { 
    headers:{
    Authorization: `Client-ID ${ACCESS_KEY}`
}
});
return handleResponse(response);
} catch (error) {
console.error(`Error fetching ${endpoint}:`, error);
throw error;
}
}

 
  
  // modelo para enviar dados para a API se a mesma permitir
//   export async function post(apiBaseUrl, endpoint, data) {
//     try {
//       const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       return handleResponse(response);
//     } catch (error) {
//       console.error(`Error posting to ${endpoint}:`, error);
//       throw error;
//     }
//   }
  
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