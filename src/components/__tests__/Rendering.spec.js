import { mount } from '@vue/test-utils'
import router from '@/router'
import About from '@/views/AboutView.vue'

describe('AboutView.vue', () => {
    it('renders About component when the route is /', async () => {
        const wrapper = mount(About, {
            global: {
                plugins: [router]
            }
        })

    await router.push('/')
    await router.isReady()

    expect(wrapper.text()).toContain('Sobre o Illusionni')
    })
})