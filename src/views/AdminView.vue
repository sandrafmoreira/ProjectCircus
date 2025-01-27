<template>
    <div class="go-back-section">
        <button @click="back" style="margin-top: 100px;"> 
            <v-icon>
                    mdi-arrow-left
            </v-icon></button>
    </div>
    <h1 id="admin-title" style="margin-top: -80px;">Dashboard de Admins!</h1>
    <v-card class="w-100">
        <div class="d-flex flex-row">
            <v-tabs v-model="tab" color="primary" direction="vertical" class="left-tabs">
                <v-tab text="Utilizadores" value="1"></v-tab>
                <v-tab text="Giftshop" value="2"></v-tab>
                <v-tab text="Publicações" value="3"></v-tab>
                <v-tab text="Notícias" value="4"></v-tab>
            </v-tabs>

            <v-tabs-window v-model="tab" class="windows">
                <!--Tab de Utilizadores-->
                <v-tabs-window-item value="1">
                    <h2>Gerir Utilizadores</h2>
                    <h3>Nº total de utilizadores: {{ this.userStore.usersNum }}</h3>
                    <v-container class="bg-surface-variant">
                        <v-row no-gutters v-for="user in userStore.users">
                            <v-col cols="12">
                                {{ user.firstName + " " + user.lastName }}
                                <v-btn v-if="!user.adminPermission" @click="removeUser(user.id, user.firstName, user.lastName)">Remover Conta</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-tabs-window-item>

                <!--Tab de Produtos-->
                <v-tabs-window-item value="2">
                    <h2>Gerir produtos!</h2>
                    <h3>Nº total de produtos exclusivos: {{ this.productStore.exclusiveProducts }}</h3>
                    <h3>Nº total de produtos com desconto: {{ this.productStore.discountedProducts }}</h3>
                    <h2>Lista de produtos:</h2>
                    <v-container class="bg-surface-variant">
                        <v-row no-gutters v-for="product in productStore.products">
                            <v-col cols="12">
                                {{ product.name }}
                                <v-btn @click="removeProduct(product.id, product.name)">Remover Produto</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>

                    <h2>Adicionar Produto:</h2>
                    <v-form @submit.prevent="addProduct">
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="productName" label="Nome" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-file-input v-model="productImage" label="Foto" show-size truncate-length="15" accept="image/*" required></v-file-input>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model="productPrice" label="Preço" type="number" required></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-checkbox v-model="productExclusivity" label="Exclusivo" type="checkbox"></v-checkbox>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea v-model="productDescription" label="Descrição" required></v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn @click="addProduct" type="submit" block>Adicionar Produto</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>

                    <h2>Editar Produto:</h2>
                    <v-form @submit.prevent="editProduct">
                        <v-container class="bg-surface-variant">
                            <v-select
                            v-model="selectedProductEdit"
                            label="Selecionar Produto"
                            :items="productStore.products"
                            item-title="name"
                            item-value="id"
                            @update:modelValue="searchForProduct"
                            ></v-select>

                            <v-col cols="12">
                                <v-text-field label="Nome" required v-model="productNameEdit"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input label="Foto" show-size truncate-length="15" accept="image/*" required v-model="productImageEdit"></v-file-input>
                                <v-img 
                                    v-if="productImageEdit" 
                                    :src="productImageEdit" 
                                    max-width="200" 
                                    max-height="200" 
                                    class="mt-4">
                                </v-img>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Preço" type="number" required v-model="productPriceEdit"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-checkbox label="Exclusivo" type="checkbox" v-model="productExclusivityEdit"></v-checkbox>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Desconto" type="number" v-model="productDiscountEdit"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea label="Descrição" required v-model="productDescriptionEdit"></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-btn @click="editProduct(selectedProductEdit)" type="submit" block>Editar Produto</v-btn>
                            </v-col>
                        </v-container>
                    </v-form>

                    <h2>Adicionar Desconto:</h2>
                    <v-form @submit.prevent="addDiscount">
                        <v-container class="bg-surface-variant">
                            <v-select
                            v-model="selectedProduct"
                            label="Selecionar Produto"
                            :items="productStore.products"
                            item-title="name"
                            item-value="id"
                            ></v-select>

                            <v-text-field v-model="productDiscount" label="Desconto (em percentagem)" type="number" max="100" required></v-text-field>

                            <p><b>Preço base -> {{ productSelectedPrice }} €</b></p>
                            <p><b>Preço com desconto -> {{ discountedPrice }} €</b></p>
                            <v-btn type="submit" block>Adicionar Desconto</v-btn>
                        </v-container>
                    </v-form>
                </v-tabs-window-item>

                <!--Tab de Publicações-->
                <v-tabs-window-item value="3">
                    <h2>Gerir Publicações</h2>
                    <h3>Nº total de publicações: {{this.userStore.postsNum}}</h3>
                    <v-container class="bg-surface-variant">
                        <v-row no-gutters v-for="post in userStore.userPosts" :key="post.id" cols="3">
                            <v-col cols="4">
                                <v-card width="250px" variant:="plain" flat="true" color="white">
                                    <v-img :src="post.image"></v-img>
                                    <v-card-text>
                                        <p>{{ post.author }}</p>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="red" @click="this.userStore.removePost(true, post.id)" icon>
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-tabs-window-item>
                
                <!--Tab de Notícias-->
                <v-tabs-window-item value="4">
                    <h2>Nº total de notícias: {{ this.newsStore.articles.length }}</h2>
                    <h2>Lista de Artigos:</h2>
                    <v-container class="bg-surface-variant">
                        <v-row no-gutters v-for="article in newsStore.articles">
                            <v-col cols="12">
                                {{ article.title }}
                                <v-btn @click="removeArticle(article.id, article.title)">Remover Artigo</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>

                    <h2>Adicionar Artigo:</h2>
                    <v-form @submit.prevent="addArticle">
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="articleTitle" label="Título" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-file-input v-model="articleImage" label="Foto" show-size truncate-length="15" accept="image/*" required></v-file-input>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model="articleDate" label="Data" required></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model="articleAuthor" label="Autor(a)" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea v-model="articleText" label="Texto" required></v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn @click="addArticle" type="submit">Adicionar Artigo</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>

                    <h2>Editar Artigo:</h2>
                    <v-form @submit.prevent="editArticle">
                        <v-container class="bg-surface-variant">
                            <v-select
                            v-model="selectedArticle"
                            label="Selecionar Artigo"
                            :items="newsStore.articles"
                            item-title="title"
                            item-value="id"
                            @update:modelValue="searchForArticle">
                            </v-select>

                            <v-col cols="12">
                                <v-text-field v-model="articleTitleEdit" label="Título" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input v-model="articleImageEdit" show-size truncate-length="15" accept="image/*" label="Foto" required></v-file-input>
                                <v-img
                                v-if="articleImageEdit"
                                :src="articleImageEdit"
                                max-width="200"
                                max-height="200"
                                class="mt-4"
                                ></v-img>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="articleDateEdit" label="Data" required></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="articleAuthorEdit" label="Autor(a)" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="articleTextEdit" label="Texto" required></v-textarea>
                            </v-col>
                            <v-cols cols="12">
                                <v-btn @click="editArticle(selectedArticle)" type="submit" block>Editar Artigo</v-btn>
                            </v-cols>
                        </v-container>
                    </v-form>
                </v-tabs-window-item>
            </v-tabs-window>
        </div>
    </v-card>
    
</template>

<script>
    import { useUserStore } from '@/stores/users';
    import { useProductStore } from '@/stores/products';
    import { useNewsStore } from '@/stores/news';

    export default {
        data() {
            return {
                //Stores
                userStore: useUserStore(),
                productStore: useProductStore(),
                newsStore: useNewsStore(),
                tab: 1,
                //Adicionar um produto novo
                productName: "",
                productDescription: "",
                productImage: "",
                productPrice: 0,
                productExclusivity: false,
                productDiscount: 0,
                //Adicionar desconto a um produto
                selectedProduct: 0,
                //Editar um produto existente
                selectedProductEdit: 0,
                productNameEdit: "",
                productDescriptionEdit: "",
                productImageEdit: "",
                productPriceEdit: "",
                productExclusivityEdit: false,
                productDiscountEdit: 0,
                //Adicionar um artigo novo
                articleImage: "",
                articleAuthor: "",
                articleDate: "",
                articleTitle: "",
                articleText: "",
                //Editar um artigo existente
                selectedArticle: 0,
                articleImageEdit: "",
                articleAuthorEdit: "",
                articleDateEdit: "",
                articleTitleEdit: "",
                articleTextEdit: "",
            }
        },

        created () {
            this.userStore.getAllPosts;
        },

        computed: {
            //Para encontrar o produto selecionado na store dos produtos (para depois poder se encontrar o preço do produto selecionado)
            findProductSelected() {
                return this.productStore.products.find(product => product.id == this.selectedProduct) 
            },

            //Para encontrar o preço do produto selecionado
            productSelectedPrice(){
                if (this.findProductSelected) {
                    return this.findProductSelected.price
                }
            },

            //Para adicionar o desconto ao produto e retornar o preço do produto com o desconto incluido
            discountedPrice() {
                let price = this.productSelectedPrice
                if (this.findProductSelected && this.productDiscount) {
                    let discount = this.productDiscount / 100;
                    return (price * (1 - discount)).toFixed(2)
                }
            }
        },

        methods: {
            //Remover um utilizador
            removeUser(id, firstName, lastName) {
                this.userStore.removeAccount(id)
                alert(`O utilizador ${firstName} ${lastName} foi removido com sucesso!`)
            },

            //Adicionar um novo produto à giftshop
            addProduct() {
                try {
                    this.productStore.addProduct(this.productName, this.productDescription, this.productPrice, this.productImage.name)
                    alert(`O produto ${this.productName} foi adicionado!`)
                } catch (error) {
                    alert('Este produto ja existe!');
                    
                }
            },

            //Remover um produto da giftshop
            removeProduct(id, name) {
                this.productStore.removeProduct(id)
                alert(`O produto '${name}' foi removido com sucesso!`)
            },

            //Encontrar os detalhes sobre o produto selecionado no form para Editar o Produto
            searchForProduct(id) {                
                let productSelected = this.productStore.products.find(product => product.id == id)
                
                this.productNameEdit = productSelected.name
                this.productDescriptionEdit = productSelected.description
                this.productPriceEdit = productSelected.price
                this.productExclusivityEdit = productSelected.exclusive
                this.productImageEdit = productSelected.image
                this.productDiscountEdit = productSelected.discount
                
            },

            //Editar detalhes do produto
            editProduct(id) {                                
                try {
                    this.productStore.editProduct(id, this.productNameEdit, this.productDescriptionEdit, this.productPriceEdit, this.productExclusivityEdit, this.productImageEdit.name, this.productDiscountEdit)
                } catch (error) {
                }
            },

            //Adicionar um desconto ao produto selecionado no form de Adicionar Desconto
            addDiscount() {
                if (this.discountedPrice) {                    
                    this.productStore.addDiscount(this.selectedProduct, parseInt(this.productDiscount))
                } else {
                    alert(`Desconto inválido! Tente de novo!`)
                }
            },

            //Adicionar um novo artigo aos Destaques
            addArticle() {
                try {
                    this.newsStore.addArticle(this.articleTitle, this.articleText, this.articleAuthor, this.articleDate, this.articleImage.name)
                } catch (error) {
                    alert(`Este artigo já existe!`)
                }
            },

            //Remover um artigo
            removeArticle(id, title) {
                this.newsStore.removeArticle(id)
                alert(`O artigo '${title}' foi removido com sucesso!`)
            },

            //Encontrar os detalhes sobre o artigo selecionado no form para Editar o Artigo
            searchForArticle(id) {
                let articleSelected = this.newsStore.articles.find(article => article.id == id)

                this.articleTitleEdit = articleSelected.title
                this.articleTextEdit = articleSelected.text
                this.articleDateEdit = articleSelected.date
                this.articleAuthorEdit = articleSelected.author
                this.articleImageEdit = articleSelected.src
            },
            
            //Editar detalhes do artigo
            editArticle(id) {
                try {
                    this.newsStore.editArticle(id, this.articleTitleEdit, this.articleTextEdit, this.articleAuthorEdit, this.articleDateEdit, this.articleImageEdit.name)
                } catch (error) {
                    
                }
            },

            back() {
                /**
                 * Voltar para a página do perfil
                 */
                this.$router.push({name: 'account', params: {id: this.userStore.userInfo.id}})
            },
        },
    }
</script>

<style lang="scss" scoped>
#admin-title{
    padding:0px 10px;
}

.go-back-section{
    padding: 10px 10px;
    margin-top: 8%;
}

.go-back-section button{
    background-color: #e63946;
    color: white;
    width: 44px;
    height: 44px;
    border-radius: 30px;
}

.w-100 {
    background-color: #F4EDE4;
    border: none !important;
    box-shadow: none !important;

}

.windows {
    margin-left: 80px;
    width: 100%;
}

.v-card{
    background-color: transparentize($color: #f7f1f1, $amount: 1);
}

.v-form{
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>