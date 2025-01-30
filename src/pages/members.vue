<template>
  <div id="members">
    <h5>
      Miembros Totales: <span class="text-primary">#{{ membersTotal }}</span>
    </h5>

    <section class="container-members mt-4 ">
      <h6>Grupos</h6>

      <v-tabs v-model="tab" slider-color="transparent">
        <v-btn min-width="45" min-height="48" class="pa-0" :class="{ active: true }" style="pointer-events: none;">
          <v-icon size="30">mdi-account-multiple</v-icon>
        </v-btn>

        <v-tab v-for="(item, i) in dataTabs" :key="i" :class="{ active: i == tab}">
          {{ item.name }}
        </v-tab>
      </v-tabs>

      <h6 class="mt-6 mb-2">Filtrar por miembro</h6>
      <v-text-field
        v-model="filterMember"
        placeholder="metademocracia_dao.near"
        append-inner-icon="mdi-magnify"
        class="flex-grow-0"
        variant="solo"
        hide-details
      ></v-text-field>

      <!--<v-select
        v-model="filter"
        :items="filters"
        item-title="name"
        item-value="value"
        variant="solo"
        class="custom-select my-4"
        hide-details
      ></v-select> -->


      <aside class="grid mt-7">
        <v-sheet v-for="(item, i) in dataMembers" :key="i">
          <v-card class="clear-overlay">
            <v-btn
              icon="mdi-open-in-new"
              color="rgba(var(--v-theme-primary))"
              size="18"
            />

            <v-img
              :src="item.avatar"
              cover
              width="50"
              height="50"
              class="elevation-5 flex-grow-0"
            ></v-img>

            <a>{{ item.group }}</a>
            <h6 class="mb-0">{{ item.user }}</h6>

            <div v-if="item?.votes" class="mt-auto">
              <v-divider thickness="1.5" color="#8A5FA4" style="opacity: .5 !important;" />
              <span>Votos Emitidos: {{ item?.votes }}</span>
            </div>
          </v-card>
        </v-sheet>
      </aside>

      <v-pagination
        v-model="page"
        class="my-16"
        :length="paginatedDataMembers"
      ></v-pagination>
    </section>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/members.scss'
import avatarIcon from '@/assets/sources/images/avatar.jpg'
import { ref, onBeforeMount, watch  } from 'vue'
import graphQl from '@/services/graphQl';
import { useRouter, useRoute } from 'vue-router';

const
router = useRouter(),
route = useRoute(),
tab = ref(0),
dataTabs = ref([
  {
    name: "Ciudadanos",
    value: "Ciudadanos"
  }
]),
filter = ref('actives'),
filters = [
  {
    name: "Más activos",
    value: "actives"
  }
],
dataMembers = ref([]),
page = ref(1),
elementosPorPagina = ref(16),
totalMembersList = ref(0),
paginatedDataMembers = ref(0),
nextIndex = ref(0),
membersTotal = ref(0),
filterMember = ref(undefined)



onBeforeMount(getData)

watch(page, async (newPage, oldPage) => {
  nextIndex.value = (newPage - 1) * elementosPorPagina.value;
  getData()
})

watch(filterMember, async (newVal, oldVal) => {
  nextIndex.value = 0
  filterMember.value = !newVal ? undefined : newVal.trim() == "" ? undefined : newVal.trim();;
  getData()
})


async function getData() {
  const memberLike = !filterMember.value ? '' : ', owner_id_contains: "' + filterMember.value + '"';
  const query = `query MyQuery($limit: Int, $index: Int) {
    datanft(id: "1") {
    total_owners
    owners(
      where: {total_mft_gt: "0", ${memberLike}}
      orderBy: votes
      orderDirection: desc
      skip: $index
      first: $limit
    ) {
      owner_id
      votes
    }
  }
  }`;


  const variables = {
    limit: elementosPorPagina.value,
    index: nextIndex.value
  }

  await graphQl.getQuery(query, variables).then(async response => {
    const datanft = response.data.data.datanft

    membersTotal.value = !datanft?.total_owners ? "0" : datanft.total_owners;

    //paginacion
    totalMembersList.value = membersTotal.value;
    paginatedDataMembers.value = Math.ceil(totalMembersList.value / elementosPorPagina.value);
    nextIndex.value = (page.value) * elementosPorPagina.value;


    dataMembers.value = datanft.owners.map((item) => {
      return {
        avatar: avatarIcon,
        group: "Ciudadanos",
        user: item.owner_id,
        votes: item.votes,
      }
    });

  })
}
</script>
