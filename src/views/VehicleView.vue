<template>

    <div class="container">
        <h1>{{ data.name }}</h1>
        <h2>Generals</h2>
        <p>Model: <span>{{ data.model }}</span></p>
        <p>Length: <span>{{ data.length }}</span></p>
        <p>Manufacturer: <span>{{ data.manufacturer }}</span></p>
        <p>max_atmosphering_speed: <span>{{ data.max_atmosphering_speed }}</span></p>
        <p>Cargo capacity: <span>{{ data.cargo_capacity }}</span></p>
        <p>Crew: <span>{{ data.crew }}</span></p>
        <p>Passengers: <span>{{ data.passengers }}</span></p>
        <section class="container__Footer">
            <h2>Films in which he participated</h2>
            <ul>
                <li v-for="(dato, index)  in this.Films.RouterLink" :key="dato" class="List_Character">
                    <router-link :to="{ name: 'film', params: { id: GetIdCharacter(dato) } }">{{ this.Films.Name[index] }}</router-link>
                </li>
            </ul>
        </section>
    </div>

</template>
  
<script>

export default {
    data() {
        return {
            data: {},
            Films: {
                RouterLink: [],
                Name: []
            }
        }
    },
    mounted() {
        this.GetFilms(),
        this.GetData()
    },
    methods: {
        GetData: async function () {
                try {
                    await fetch("https://swapi.dev/api/vehicles/" + this.$route.params.id + "/", { method: 'GET' })
                        .then(response => {
                            response.json().then(res =>this.data = res);
                        });
                } catch (error) {
                    console.log(error);
                }
        },
        GetFilms: async function () {
            await fetch("https://swapi.dev/api/people/" + this.$route.params.id + "/", { method: 'GET' })
            .then(response => response.json().then(data => this.Films.RouterLink = data.films))

            for (const index in this.Films.RouterLink) {
                await fetch("https://swapi.dev/api/films/" + this.GetIdCharacter(this.Films.RouterLink[index]) + "/", { method: 'GET' })
                    .then(response => response.json()).then(res => this.Films.Name.push(res.title))
            }
        },
        GetIdCharacter(url) {
            return url.split("/")[5]
        }
    }

}

</script>