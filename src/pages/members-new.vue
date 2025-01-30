<template>
  <div id="members">
    <h5>
      Miembros Totales: <span class="text-primary">#{{ membersTotal }}</span>
    </h5>

    <section class="container-members mt-4">
      <h6>Grupos</h6>

      <v-tabs v-model="tab" slider-color="transparent">
        <v-btn min-width="45" min-height="48" class="pa-0" :class="{ active: true }" style="pointer-events: none;">
          <v-icon size="30">mdi-account-multiple</v-icon>
        </v-btn>

        <v-tab v-for="(item, i) in dataTabs" :key="i" :class="{ active: i == tab}">
          {{ item.name }}
        </v-tab>
      </v-tabs>

      <!--<v-select
        v-model="filter"
        :items="filters"
        item-title="name"
        item-value="value"
        variant="solo"
        class="custom-select my-4"
        hide-details
      ></v-select> -->

      <h6 class="mt-6 mb-2">Filtrar por miembro</h6>
      <v-text-field
        v-model="filterMember"
        placeholder="metademocracia_dao.near"
        append-inner-icon="mdi-magnify"
        class="flex-grow-0"
        variant="solo"
        hide-details
      ></v-text-field>


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
import variables from '@/mixins/variables';

const
router = useRouter(),
route = useRoute(),
{ groupsDefaults, groupAllDefault, groupAlls } = variables,
tab = ref(0),
dataTabs = ref([
  /*{
    name: "Concejal",
    value: "Concejal"
  }*/
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
totalMembersListOld = ref(0),
paginatedDataMembers = ref(0),
nextIndex = ref(0),
membersTotal = ref(0),
filterMember = ref(undefined)



onBeforeMount(getData)

watch(page, async (newPage, oldPage) => {
  nextIndex.value = (newPage - 1) * elementosPorPagina.value;

  if(newPage < oldPage) {
    totalMembersList.value = totalMembersListOld.value - totalMembersList.value;
    totalMembersList.value = totalMembersList.value <= 0 ? 0 : totalMembersList.value;
  }

  getData()
})

watch(filterMember, async (newVal, oldVal) => {
  nextIndex.value = 0
  filterMember.value = !newVal ? undefined : newVal.trim() == "" ? undefined : newVal.trim();
  getData()
})

watch(tab, async (newTab, oldTap) => {
  nextIndex.value = 0;
  totalMembersList.value = 0;
  getData()
})

watch(filterMember, async (newVal, oldVal) => {
  nextIndex.value = 0
  totalMembersList.value = 0;
  filterMember.value = !newVal ? undefined : newVal.trim() == "" ? undefined : newVal.trim();
  getData()
})


async function getData() {
  //buscar grupos
  const queryGroup = `query MyQuery($contractId: String) {
    groups(where: {dao: $contractId}) {
      group
    }
  }`;

  const responseGroup = await graphQl.getQueryDaoV2(queryGroup, {contractId: route.query?.dao})

  if(!responseGroup) return

  const groups = responseGroup.data?.data?.groups

  if(groups.length <= 0) return

  const excludeGroup = groupAlls
  dataTabs.value = groups.filter((item) => !excludeGroup.find((elem) => elem == item.group)).map((item) => {
    return {
      name: item.group,
      value: item.group
    }
  });


  //buscar miembros
  const memberLike = !filterMember.value ? '' : 'where: {member_contains: "' + filterMember.value + '"},';
  const query = `query MyQuery($contractId: String, $group: String, $limit: Int, $index: Int) {
    dao(id: $contractId) {
      total_members
      groups(where: {group: $group} ) {
        group
        members( ${memberLike}
        orderBy: votes,
        orderDirection: desc,
        skip: $index,
        first: $limit) {
          member
          votes
        }
      }
    }
  }`;

  const tabIndex = tab.value;

  const variables = {
    contractId: route.query?.dao,
    group: dataTabs.value[tabIndex].value,
    limit: elementosPorPagina.value,
    index: nextIndex.value
  }

  await graphQl.getQueryDaoV2(query, variables).then(async response => {
    const dao = response.data?.data?.dao

    if(!dao) return
    if(dao.groups.length <= 0) return

    const group = dao.groups[0];
    const members = group.members;

    membersTotal.value = dao.total_members;


    //paginacion
    nextIndex.value = (page.value) * elementosPorPagina.value;
    const variablesLast = {
      contractId: route.query?.dao,
      group: dataTabs.value[tabIndex].value,
      limit: elementosPorPagina.value,
      index: nextIndex.value
    }
    const lastResult = await graphQl.getQueryDaoV2(query, variablesLast)
    const lasRegistersTotal = !lastResult ? 0 : lastResult.data.data.dao.groups.length <= 0 ? 0 : lastResult.data.data.dao.groups[0].members.length;

    totalMembersList.value = members.length <= 0 ? 0 : (totalMembersList.value + ((page.value == 1 ? members.length : 0) + lasRegistersTotal));
    totalMembersListOld.value = lasRegistersTotal <= 0 ? totalMembersListOld.value : lasRegistersTotal;
    paginatedDataMembers.value = Math.ceil(totalMembersList.value / elementosPorPagina.value);




    /*totalMembersList.value = membersTotal.value;
    paginatedDataMembers.value = Math.ceil(totalMembersList.value / elementosPorPagina.value);
    nextIndex.value = (page.value) * elementosPorPagina.value;*/

    //pintado miembros
    dataMembers.value = members.map((item) => {
      return {
        avatar: avatarIcon,
        group: group.group,
        user: item.member,
        votes: item.votes
      }
    });

  })
}
</script>
