<template>
    <h2>Vehicles</h2>
    <ul>
        <li v-for="(vehicles, index)  in Vehicles.RouterLink" :key="vehicles" class="List_Character">
            <router-link :to="{name:'vehicle', params:{id:GetIdCharacter(vehicles)}}">{{ Vehicles.Names[index] }}</router-link>
        </li>
    </ul>
</template>
  <script>

    export default {
            data(){
            return {
                Vehicles:{
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
                    .then(response => response.json().then(res => this.Vehicles.RouterLink = res.vehicles));

                    for (const index in this.Vehicles.RouterLink ) {
                        await fetch("https://swapi.dev/api/vehicles/"+this.GetIdCharacter(this.Vehicles.RouterLink[index])+"/",{method: 'GET'})
                    .then(response =>response.json()).then(res =>this.Vehicles.Names.push( res.name)) 
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