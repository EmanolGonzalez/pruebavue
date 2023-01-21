<template>
    <h1>Lista de Peliculas de Star Wars</h1>
    <div>
        <ul v-for="(film, index) in peliculas" :key="film.episode_id">
          <li><router-link :to="{name:'film', params:{id:index+1}}">Home{{ film.title }}</router-link></li>
        </ul>  
    </div> 
 
</template>

<script>

export default {
        data(){
          return {
            peliculas: []
          };
        },
        mounted(){
          this.GetFilms();
        },
        methods:{
          GetFilms(){
            const GetData = async ()=>{
            try {
                  await fetch("https://swapi.dev/api/films/",{method: 'GET'})
                  .then(response => 
                  {response.json()
                    .then(res => this.peliculas= res.results);
                  });
                } catch (error) {
                  console.log(error);
                } 
            };
            GetData();
          }
        }

    }

</script>
