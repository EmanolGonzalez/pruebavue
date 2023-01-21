<template>
    <h2>Characters</h2>
    <ul>
        <li v-for="(charater, index)  in Personajes.RouterLink" :key="charater" class="List_Character">
            <router-link :to="{name:'character', params:{id:GetIdCharacter(charater)}}">{{ Personajes.Names[index] }}</router-link>
        </li>
    </ul>
</template>
  
<script>

export default {
        props: {
        enlaces: []
        },
        data(){
          return {
            Personajes:{
                RouterLink:[],
                Names:[]
            }, 
            Names:[]
            }
        },
        mounted(){
          this.GetCharacters()
        },
        methods:{
            GetCharacters: async function(){
             await fetch("https://swapi.dev/api/films/"+this.$route.params.id+"/",{method: 'GET'})
                .then(response => response.json().then(res => this.Personajes.RouterLink = res.characters));

                for (const index in this.Personajes.RouterLink ) {
                    await fetch("https://swapi.dev/api/people/"+this.GetIdCharacter(this.Personajes.RouterLink[index])+"/",{method: 'GET'})
                   .then(response =>response.json()).then(res =>this.Personajes.Names.push( res.name))
                }
            },
            GetIdCharacter(url){
                return url.split("/")[5]
            }
        }

    }
  
  
</script>
<style>
.List_Character{
    list-style: none;
    display: inline-block;
    margin: 5px;
}
</style>