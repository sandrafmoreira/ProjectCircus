<template>
    <h1>Dashboard de Admins!</h1>

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
                    <h2>Gerir utilizadores</h2>
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
                                    <v-file-input label="Foto" show-size truncate-length="15" accept="image/*" v-model="productImage" required></v-file-input>
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
                    Gerir Publicações
                </v-tabs-window-item>
                
                <!--Tab de Notícias-->
                <v-tabs-window-item value="4">
                    Gerir Notícias
                </v-tabs-window-item>
            </v-tabs-window>
        </div>
    </v-card>
    
</template>

<script>
    import { useUserStore } from '@/stores/users';
    import { useProductStore } from '@/stores/products';

    export default {
        data() {
            return {
                //Stores
                userStore: useUserStore(),
                productStore: useProductStore(),
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
                productDiscountEdit: 0
            }
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
                console.log(id);
                              
                try {
                    this.productStore.editProduct(id, this.productNameEdit, this.productDescriptionEdit, this.productPriceEdit, this.productExclusivityEdit, this.productImageEdit, this.productDiscountEdit)
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
            }
        },
    }
</script>

<style lang="scss" scoped>
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