import { setActivePinia, createPinia } from 'pinia'
import { usePhotoStore } from '@/stores/photo'
import * as api from '@/api/photosApi'
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('Photo Store', () => {
    let photoStore
  
    beforeEach(() => {
      setActivePinia(createPinia())
      photoStore = usePhotoStore()
    })
  
    it('fetches photos from Pexels API', async () => {
      // "Mocking" a resposta da API
      const mockResponse = {
        photos: [
          { id: 1, src: { original: 'photo1.jpg' } },
          { id: 2, src: { original: 'photo2.jpg' } }
        ]
      }
  
      //Cria uma versão "mock" da função get da API
      vi.spyOn(api, 'get').mockResolvedValue(mockResponse)
  
      await photoStore.pexelsFetchCircusPhotos()
  
      // Verifica se os dados foram armazenados corretamente na store
      expect(photoStore.Photos).toHaveLength(2)
      expect(photoStore.Photos[0].id).toBe(1)
      expect(photoStore.Photos[1].src.original).toBe('photo2.jpg')
    })
  
    it('handles error when fetching photos', async () => {
      // "Mocking" a API para lançar um erro
      vi.spyOn(api, 'get').mockRejectedValue(new Error('Failed to fetch photos'))
  
      // Esperar que lance um erro
      await expect(photoStore.pexelsFetchCircusPhotos()).rejects.toThrow('Failed to fetch photos')
    })
  })