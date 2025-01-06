<template>
    <v-btn
      :color="color"
      :class="[customClass, 'default-btn']"
      @click="onClick"
      variant="flat"
      rounded="xl"
      :size="size"
      
      >
      <slot></slot>
    </v-btn>
  </template>
  
  <script>
  export default {
    name: 'customBtn',
    props: {
      color: {
        type: String,
        default: 'default'
      },
      size: {
        type: String,
        default: 'default'
      },
      customClass: {
        type: String,
        default: 'default-red-btn'
      }
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .v-btn {
  width: 150px !important; /* Forçando a largura do botão */
}

  .default-red-btn {
    font-family: var(--font-Lexend);
    text-transform: capitalize;
    min-width: 1% !important; 
    background-color: var(--color-red-btn) !important;
    color: white !important;
    // padding: 0.5rem 1rem;
    font-size: 1rem;
    transition: background-color 0.3s ease-in-out;
  }
  
  .default-red-btn:hover {
    background-color: var(--color-red-btn-hover) !important;
  }
  
  .default-btn {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  