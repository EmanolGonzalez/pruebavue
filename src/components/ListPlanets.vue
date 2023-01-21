<template>
    <h2>Planets</h2>
    <ul>
        <li v-for="(planets, index)  in Planetas.RouterLink" :key="planets" class="List_Character">
            {{ Planetas.Names[index] }}
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
            Planetas:{
                RouterLink:[],
                Names:[]
            }
            }
        },
        mounted(){
          this.GetCharacters()
        },
        methods:{
            GetCharacters: async function(){
             await fetch("https://swapi.dev/api/films/"+this.$route.params.id+"/",{method: 'GET'})
                .then(response => response.json().then(res => this.Planetas.RouterLink = res.planets));

                for (const index in this.Planetas.RouterLink ) {
                    await fetch("https://swapi.dev/api/planets/"+this.GetIdCharacter(this.Planetas.RouterLink[index])+"/",{method: 'GET'})
                   .then(response =>response.json()).then(res =>this.Planetas.Names.push( res.name)) 
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