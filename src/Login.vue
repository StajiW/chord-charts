<script setup lang='ts'>
import { ref } from 'vue'
import { supabase } from './scripts/supabaseClient.ts'
import { useRouter } from 'vue-router'

let email: string = ''
let password: string = ''
let errorMessage = ref('')
const router = useRouter()

async function login() {
    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if (error) {
        errorMessage.value = error.message
    }
    else {
        router.push('/editor')
    }
}
</script>

<template>

<form @submit.prevent='login()'>
    <div id='header'>Admin Login</div>
    <input type='text' v-model='email' placeholder='email' />
    <input type='password' v-model='password' placeholder='password' />
    <input type='submit' value='Log in'/>
    <div id='errorMessage' v-if='errorMessage'>{{ errorMessage }}</div>
</form>

</template>

<style scoped>
#header {
    margin-bottom: 1rem;

    text-align: center;

    font-size: 1.25rem;
    font-weight: bold;
}

form {
    margin: auto;
    width: 20rem;
    padding: 1rem;

    border-radius: .25rem;

    box-shadow: 0 0 1rem #DDDDDD;
}

input {
    box-sizing: border-box;
    display: block;
    width: 100%;

    padding: .5rem;
    margin-bottom: 1rem;
    
    font-size: 1rem;

    border: 1px solid #BBBBBB;
    border-radius: .25rem;

    font-family: inherit;
	font-optical-sizing: inherit;
	font-weight: inherit;
	font-style: inherit;
}

input:focus {
    outline: 1px solid #BBBBBB;
}

input[type=submit] {
    width: 5rem;
    margin-bottom: 0;

    font-weight: bold;

    border: none;
}

#errorMessage {
    padding-top: 1rem;
    
    font-style: italic;
    color: red;
}
</style>
