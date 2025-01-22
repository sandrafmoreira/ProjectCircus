import { mount } from '@vue/test-utils'
import router from '@/router'
import GiftshopView from '@/views/GiftshopView.vue'
import { createPinia } from 'pinia'
import { vi } from 'vitest'
import { useProductStore } from '@/stores/products'
import { setActivePinia, createPinia } from 'pinia'
import { useNewsStore } from '@/stores/news'

describe('News Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('should add a new article', () => {
    const newsStore = useNewsStore()

    // Verifica o estado inicial (deve ter 3 artigos)
    expect(newsStore.articles.length).toBe(3)

    // Adiciona um novo artigo
    newsStore.addArticle('Novo Artigo', 'Texto do novo artigo', 'Autor Teste', '22/01/25', '1.png')

    // Verifica se o artigo foi adicionado
    expect(newsStore.articles.length).toBe(4)
    expect(newsStore.articles[3].title).toBe('Novo Artigo')
  })

  it('should throw error if adding an article with duplicate title', () => {
    const newsStore = useNewsStore()

    // Verifica se um erro é lançado ao tentar adicionar um artigo com título duplicado
    expect(() => {
      newsStore.addArticle('O circo sustentável', 'Texto duplicado', 'Autor Teste', '22/01/25', '2.png')
    }).toThrowError()
  })

  it('should remove an article', () => {
    const newsStore = useNewsStore()

    // Verifica o estado inicial (deve ter 3 artigos)
    expect(newsStore.articles.length).toBe(3)

    // Remove o artigo com id 1
    newsStore.removeArticle(1)

    // Verifica se o artigo foi removido
    expect(newsStore.articles.length).toBe(2)
    expect(newsStore.articles.find(article => article.id === 1)).toBeUndefined()
  })

  it('should edit an article', () => {
    const newsStore = useNewsStore()

    // Edita um artigo existente
    newsStore.editArticle(1, 'Novo Título', 'Texto Editado', 'Novo Autor', '23/01/25', '3.png')

    // Verifica se as mudanças foram aplicadas corretamente
    const editedArticle = newsStore.articles.find(article => article.id === 1)
    expect(editedArticle).toBeDefined()
    expect(editedArticle?.title).toBe('Novo Título')
    expect(editedArticle?.text).toBe('Texto Editado')
  })

  it('should throw error when editing non-existent article', () => {
    const newsStore = useNewsStore()

    // Tenta editar um artigo com id inexistente (id 999)
    expect(() => {
      newsStore.editArticle(999, 'Título Inexistente', 'Texto', 'Autor', '24/01/25', '4.png')
    }).toThrowError()
  })

  it('should return the last article id using the getter', () => {
    const newsStore = useNewsStore()

    // Verifica se o getter retorna o id do último artigo
    const lastArticleId = newsStore.findLastArticle
    expect(lastArticleId).toBe(3)  // O último artigo inicialmente é o de id 3
  })
})