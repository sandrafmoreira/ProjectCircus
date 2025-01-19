import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dyefvza7m', 
    api_key: '242339361376955', 
    api_secret: 'uUKDcePuMYlElNkn-GEONUBOqqM'
});

// Configuração do armazenamento com multer
const storage = multer.memoryStorage(); // Armazenar o arquivo na memória
const upload = multer({ storage: storage });

// Configuração do servidor e endpoints
const app = express();
app.use(bodyParser.json());

// Endpoint para upload de imagem
app.post('/api/upload', upload.single('image'), async (req, res) => {
  console.log('Arquivo recebido:', req.file); // Verifique se o arquivo chegou corretamente  
  try {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
    }

    const result = await cloudinary.uploader.upload_stream(
        { public_id: req.body.publicId },
        (error, uploadResult) => {
            if (error) {
                return res.status(500).json({ error: 'Falha ao enviar imagem para o Cloudinary' });
            }
            res.json({
                message: 'Imagem enviada com sucesso!',
                url: uploadResult.secure_url,
            });
        }
    );

    // Envia a imagem para o Cloudinary
    result.end(req.file.buffer); // Envia o buffer de imagem para o Cloudinary

} catch (error) {
    console.error('Erro ao enviar imagem:', error);
    res.status(500).json({ error: 'Falha ao enviar imagem' });
}
});

// Funções para manipulação de imagens
async function uploadImage(imageUrl, publicId) {
    try {
      const result = await cloudinary.uploader.upload(imageUrl, {
        public_id: publicId,
      });
      return result;
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw error;
    }
  }

(async function() {

    // Configuration
    
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();



// export async function get(apiBaseUrl, endpoint) {
//     try {
//         const response = await fetch(`${apiBaseUrl}/${endpoint}`);
//         return handleResponse(response);
//     } catch (error) {
//         console.error(`Error fetching ${endpoint}:`, error);
//         throw error;
//     }
// }

// export async function post(apiBaseUrl, endpoint, data) {
//     try {
//         const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });
//         return handleResponse(response);
//     } catch (error) {
//         console.error(`Error posting to ${endpoint}:`, error);
//         throw error;
//     }
// }

// export async function put(apiBaseUrl, endpoint, data) {
//     try {
//         const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data),
//         });
//         return handleResponse(response);
//     } catch (error) {
//         console.error(`Error updating ${endpoint}:`, error);
//         throw error;
//     }
// }

// export async function del(apiBaseUrl, endpoint) {
//     try {
//         const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
//             method: "DELETE",
//         });
//         if (!response.ok) {
//             const errorMessage = await response.text();
//             throw new Error(`API request failed with status ${response.status}: ${errorMessage}`);
//         }
//         return true; // DELETE geralmente nÃ£o retorna um corpo
//     } catch (error) {
//         console.error(`Error deleting ${endpoint}:`, error);
//         throw error;
//     }
// }

// async function handleResponse(response) {
//     if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(
//             `API request failed with status ${response.status}: ${errorMessage}`
//         );
//     }
//     const data = await response.json();
//     return data;
// }

