<template>

    <div class="container">
        <h1>{{ data.name }}</h1>
        <section class="container__boddy">
            <h2>Generals</h2>
            <p>Birth Year: <span>{{ data.birth_year }}</span></p>
            <p>Gender: <span>{{ data.gender }}</span></p>
            <h2>Aspects</h2>
            <p>Height: <span>{{ data.height }}</span></p>
            <p>Mass: <span>{{ data.mass }}</span></p>
            <p>Hair color: <span>{{ data.hair_color }}</span></p>
            <p>Eye color: <span>{{ data.eye_color }}</span></p>
            <p>skin color: <span>{{ data.skin_color }}</span></p>

        </section>
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
        GetData() {
            const GetData = async () => {
                try {
                    await fetch("https://swapi.dev/api/people/" + this.$route.params.id + "/", { method: 'GET' })
                        .then(response => {
                            response.json()
                            .then(res =>
                                this.data = res);
                        });
                } catch (error) {
                    console.log(error);
                }
            };
            GetData();
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
