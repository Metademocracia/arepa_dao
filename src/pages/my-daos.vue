<template>
  <div id="my-daos">
    <span v-if="!accounId"><connectWallet></connectWallet></span>
    <span v-if="accounId">
      <aside class="toolbar-search">
      <div class="toolbar-search__wrapper">
        <v-text-field
          v-model="likeWalletDao"
          placeholder="Buscar"
          variant="solo"
          hide-details
        >
          <template #prepend-inner>
            <v-icon icon="mdi-magnify" size="23" class="text-primary" />
          </template>

          <template #append-inner>
            <v-btn
              height="38"
              class="bg-secondary px-7"
              @click="getData()"
            >Buscar</v-btn>
          </template>
        </v-text-field>
      </div>
    </aside>

      <toolbar title="Mis DAOs" content-class="flex-spaceb">
        <v-btn class="bg-tertiary px-2 ml-auto" style="font-size: 12px;" @click="router.push({ name: 'CreateDao' })">
          <v-icon icon="mdi-plus" class="text-white" />
          Crear Dao
        </v-btn>
      </toolbar>

      <div class="mt-10" style="color: white !important;" v-if="loading"><center>Cargando daos...</center><br/><v-progress-linear  indeterminate class="full-width" fluid></v-progress-linear></div>
      <v-divider v-if="!loading" thickness="1.5" color="#fff" class="my-8" style="opacity: .5 !important;" />

      <section id="my-daos__content" class="mt-10">
        <div class="daos">
          <dao-card
            v-for="(item, i) in daos"
            :key="i"
            :dao="item"
            :class="{ limited: daos.length <= 2 }"
            @pressed="view(item)"
          />
        </div>

        <v-pagination
          v-model="page"
          class="mt-10 mb-16"
          :length="paginatedDaos"
        ></v-pagination>
      </section>
    </span>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/daos.scss'
import DaoCard from '@/components/dao-card.vue'
import MetademocraciaImage from '@/assets/sources/images/metademocracia-image.png'
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import graphQl from '@/services/graphQl';
import WalletP2p from '../services/wallet-p2p';
import axios from 'axios';
import connectWallet from '@/components/connect-wallet.vue';

const
  router = useRouter(),

page = ref(1),
daos = ref([]),
paginatedDaos = computed(() => (daos.value.length || 3) / 3),
listDaos = ref([]),
likeWalletDao = ref(undefined),
accounId = ref(null) // WalletP2p.getA ccount()?.address
const loading = ref(true);


onBeforeMount(getData)

function view(item) {
  router.push({ path: 'Proposals', query: {dao: item.wallet_dao}  })
}

async function getData() {
  const accounIdresult = await WalletP2p.getAccountId();
  accounId.value = accounIdresult;

  if(!accounIdresult) return

  listDaos.value = [];

  /*const queryMeta = `query dao($owner_id: String) {
    proposaldata(id: "1") {
      proposal_actives
      proposal_total
    }

    delegations {
      total_amount
      id
    }

    serie(id: "1") {
      supply
    }

    owner(id: $owner_id) {
      total_mft
    }
  }`;*/

  const variables = { owner_id: accounId.value };

  /// dao metademocracia
  /*await graphQl.getQuery(queryMeta, variables).then(async response => {
    const owner = response.data.data?.owner;

    if(!owner) return
    if(Number(owner.total_mft) <= 0) return

    let total_balance = 0;
    const delegation_near = response.data.data?.delegations ? response.data.data?.delegations?.find(item => item.id == "NEAR")?.total_amount / 1000000000000000000000000 : 0;
    const delegation_usdt = response.data.data?.delegations ? response.data.data?.delegations?.find(item => item.id == "USDT")?.total_amount / 1000000 : 0;

    const balanceNearUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "NEAR"});
    total_balance += !balanceNearUsd ? 0 : Number((delegation_near * balanceNearUsd.data[0].value).toFixed(2));

    const balanceUsdtUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "USDT"});
    total_balance += !balanceUsdtUsd ? 0 : Number((delegation_usdt * balanceUsdtUsd.data[0].value).toFixed(2));

    listDaos.value.push({
      wallet_dao: process.env.CONTRACT_DAO,
      image: MetademocraciaImage,
      name: "Metademocracia",
      account: process.env.CONTRACT_DAO,
      description: "Metademocracia",
      funds: total_balance.toFixed(2),
      members: response.data.data?.proposaldata ? response.data.data?.serie?.supply : 0,
      groups: 1,
      activeProposals: response.data.data?.proposaldata ? response.data.data?.proposaldata?.proposal_actives : 0,
      totalProposals: response.data.data?.proposaldata ? response.data.data?.proposaldata?.proposal_total : 0,
    })
  })*/


  if(likeWalletDao.value) {
    likeWalletDao.value = likeWalletDao.value.trim() == '' ? undefined : likeWalletDao.value;
  }

  const _likeWalletDao = !likeWalletDao.value ? '' : 'where: {wallet_dao_contains: "' + likeWalletDao.value + '"},';

  const query = `query dao($owner_id: String) {
    members(where: {member: $owner_id }) {
      dao(${_likeWalletDao} orderBy: creation_date, orderDirection: desc) {
        owner_id
        wallet_dao
        total_members
        creation_date
        proposal_total
        proposal_actives
      }
    }
  }`;



  await graphQl.getQueryDaoV2(query, variables).then(async response => {
    const data = response.data.data.members

    for(let i = 0; i < data.length; i++) {
      /* const responseNearAmount = await WalletP2p.view({
        contractId: data[i].dao.wallet_dao,
        methodName: "get_available_amount"
      });

      const responseUsdtAmount = await WalletP2p.view({
        contractId: process.env.CONTRACT_USDT,
        methodName: "ft_balance_of",
        args: {account_id: data[i].dao.wallet_dao }
      });

      let total_balance = 0;
      const balanceUsdt = responseUsdtAmount ? responseUsdtAmount != "0" ? Number(responseUsdtAmount) / 1000000 : 0 : 0;//montousdt / 1000000;
      const balanceNear = responseNearAmount ? (Number(responseNearAmount) / 1000000000000000000000000) : 0;

      const balanceNearUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "NEAR"});
      total_balance += !balanceNearUsd ? 0 : Number((balanceNear * balanceNearUsd.data[0].value).toFixed(2));

      const balanceUsdtUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "USDT"});
      total_balance += !balanceUsdtUsd ? 0 : Number((balanceUsdt * balanceUsdtUsd.data[0].value).toFixed(2))


      const responseConfig = await WalletP2p.view({
        contractId: data[i].dao.wallet_dao,
        methodName: "get_config"
      });

      const responsePolicy = await WalletP2p.view({
        contractId: data[i].dao.wallet_dao,
        methodName: "get_policy"
      });

      const responseSupply = await WalletP2p.view({
        contractId: data[i].dao.wallet_dao,
        methodName: "get_supply"
      });

      let members = 0;
      for(let j=0; j < responsePolicy.roles.length; j++) {
        if(responsePolicy.roles[j].kind?.Group) {
          members += responsePolicy.roles[j].kind?.Group.length;
        }
      }

      const metadata = JSON.parse(atob(responseConfig.metadata)) */

      listDaos.value.push({
        wallet_dao: data[i].dao.wallet_dao,
        image: MetademocraciaImage, // metadata?.img ? metadata.img : MetademocraciaImage,
        name: undefined, // responseConfig.name,
        account: data[i].dao.wallet_dao,
        description: undefined, // atob(responseConfig.purpose), // responseConfig.purpose.split(" ").length > 0 ? responseConfig.purpose : atob(responseConfig.purpose),
        funds: undefined, // total_balance,
        members: data[i].dao.total_members,
        groups: undefined, // responsePolicy.roles.length,
        activeProposals: data[i].dao.proposal_actives, // responseSupply ? responseSupply[1] : 0,
        totalProposals: data[i].dao.proposal_total, // responseSupply ? responseSupply[0] : 0,
      })
    }
  });

  daos.value = listDaos.value;

  if(daos.value.length > 0) {
    loading.value = false;
  }

  const data = daos.value
  for(let i = 0; i < data.length; i++) {
    // omitir metademocracia
    if(process.env.CONTRACT_DAO == data[i].wallet_dao) continue;

    // sumar balance near en usd
    WalletP2p.view({
      contractId: data[i].wallet_dao,
      methodName: "get_available_amount"
    }).then(async (responseNearAmount) => {
      const balanceNear = responseNearAmount ? (Number(responseNearAmount) / 1000000000000000000000000) : 0;
      const balanceNearUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "NEAR"});
      const total_balance = !balanceNearUsd ? 0 : (balanceNear * Number(balanceNearUsd.data[0].value));

      daos.value[i].funds = ((!daos.value[i]?.funds ? 0 : Number(daos.value[i].funds)) + total_balance).toFixed(2);
    }).catch(error => {
      console.log("error", error)
    });


    //sumar balance usdt en usd
    WalletP2p.view({
      contractId: process.env.CONTRACT_USDT,
      methodName: "ft_balance_of",
      args: {account_id: data[i].wallet_dao }
    }).then(async (responseUsdtAmount) => {
      const balanceUsdt = responseUsdtAmount ? responseUsdtAmount != "0" ? Number(responseUsdtAmount) / 1000000 : 0 : 0;
      const balanceUsdtUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "USDT"});
      const total_balance = !balanceUsdtUsd ? 0 : (balanceUsdt * Number(balanceUsdtUsd.data[0].value));

      daos.value[i].funds = ((!daos.value[i]?.funds ? 0 : Number(daos.value[i].funds)) + total_balance).toFixed(2);
    }).catch(error => {
      console.log("error", error)
    });


    // cargae nombre, descripcion y imagen
    WalletP2p.view({
      contractId: data[i].wallet_dao,
      methodName: "get_config"
    }).then(async (responseConfig) => {
      const metadata = JSON.parse(atob(responseConfig.metadata))
      const purposeData =  responseConfig.purpose.split("|");

      daos.value[i].name = responseConfig.name;
      daos.value[i].description = purposeData.length > 1 ? atob(purposeData[0]) : atob(responseConfig.purpose);
      daos.value[i].image = metadata?.img ? metadata.img : MetademocraciaImage;
    }).catch(error => {
      console.log("error", error)
    });

    // cargar total de grupos
    WalletP2p.view({
      contractId: data[i].wallet_dao,
      methodName: "get_policy"
    }).then(async (responsePolicy) => {
      daos.value[i].groups = responsePolicy.roles.length;
    }).catch(error => {
      console.log("error", error)
    })

  }

}
</script>
<style lang="scss">
@import '@/assets/styles/main.scss';

.toolbar-search {
  // position: sticky;
  // top: 20px;

  position: relative;
  isolation: isolate;
  background: $primary !important;
  width: 100vw !important;
  min-height: 120px;
  display: flex;
  align-items: center;
  margin-inline: calc(50% - 50vw) !important;
  z-index: 2;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgb(#62C3D7, .58);
    translate: 20px 0px;
    scale: 1 2;
    filter: blur(50px);
    z-index: -1;
  }


  &__wrapper {
    max-width: calc(880px + var(--margin-global));
    width: 100%;
    margin-inline: auto;
    padding-inline: var(--margin-global);
    padding-block: 10px;
    display: flex;
    align-items: center;
  }

  .v-input {
    .v-field {
      padding-right: 0;
      border-radius: 30px;

      &__field {
        height: 38px;
      }

      input {
        min-height: 100% !important;
        height: 100% !important;
        font-size: 14px;
      }
    }

    i { color: $primary }
  }
}
</style>
