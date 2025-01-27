
const API_KEY = 'sTvzXgLzKcATFWhYQb4IcaNm0hAgIp4WYAoEFBMwftIakPGCzcBkYKuu'
const PEXELS_API_BASE_URL= 'https://api.pexels.com/v1'

// modelo para fazer uma requisição de dados a API 
export async function get(query) {
                    //O endereço base da API (por exemplo, https://dog.ceo/api) + A parte específica da API que queremos acessar (ex.: breeds/list/all).
    try {
      const response = await fetch(`${PEXELS_API_BASE_URL}/search?query=${query}`,{
        headers:{
            Authorization: API_KEY
        }
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Erro ao buscar fotos do Unsplash para: ${query}:`, error);
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