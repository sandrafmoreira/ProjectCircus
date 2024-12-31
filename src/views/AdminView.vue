<template>
    <h1>Dashboard de Admins!</h1>

    <div>
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
    </div>
    <div>
        <h2>Gerir produtos!</h2>
        <h3>Nº total de produtos exclusivos: {{ this.productStore.exclusiveProducts }}</h3>
        <h3>Nº total de produtos com disconto: {{ this.productStore.discountedProducts }}</h3>
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
                        <v-text-field v-model="productImageSrc" label="Imagem" required></v-text-field>
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
    </div>
</template>

<script>
    import { useUserStore } from '@/stores/users';
    import { useProductStore } from '@/stores/products';

    export default {
        data() {
            return {
                userStore: useUserStore(),
                productStore: useProductStore(),
                productName: "",
                productDescription: "",
                productImageSrc: "",
                productPrice: 0,
                productExclusivity: false,
                productDiscount: 0,
                selectedProduct: 0,
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
            removeUser(id, firstName, lastName) {
                this.userStore.removeAccount(id)
                alert(`O utilizador ${firstName} ${lastName} foi removido com sucesso!`)
            },

            addProduct() {
                try {
                    this.productStore.addProduct(this.productName, this.productDescription, this.productPrice, this.productImageSrc)
                    alert(`O produto ${this.productName} foi adicionado!`)
                } catch (error) {
                    alert('Este produto ja existe!');
                    
                }
            },

            removeProduct(id, name) {
                this.productStore.removeProduct(id)
                alert(`O produto '${name}' foi removido com sucesso!`)
            },

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

</style>