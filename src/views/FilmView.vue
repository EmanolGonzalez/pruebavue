<template>

    <div class="container">
        <h1>{{ data.title}}</h1>
        <section class="container__boddy">
        <h3>Release Date: {{ data.release_date }}</h3>
        <div class="container__creators">
          <h3>Directed by:</h3><p> {{ data.director }}</p> ,
          <h3>Produced by:</h3><p> {{ data.producer }}</p>
        </div>
        <div class="container__openning">
            <span>{{ data.opening_crawl }}</span>
        </div>
        </section>
        <section class="container__Footer">
            <ListCharacter></ListCharacter>
            <ListPlanets></ListPlanets>
            <ListVehicle></ListVehicle>
        </section>
    </div>

</template>
  
<script>
import ListCharacter from '@/components/ListCharacter.vue';
import ListPlanets from '@/components/ListPlanets.vue';
import ListVehicle from '@/components/ListVehicle.vue';
export default {
        data(){
          return { 
                data:{}
            }
        },
        components:{ListCharacter,ListPlanets,ListVehicle},
        mounted(){
          this.GetFilms();
        },
        methods:{
          GetFilms(){
            const GetData = async ()=>{
            try {
                  await fetch("https://swapi.dev/api/films/"+this.$route.params.id+"/",{method: 'GET'})
                  .then(response => 
                  {response.json()
                    .then(res => 
                    this.data = res);
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