<template>
  <nav id="navbar" class="flex-center">
    <div id="menu-navbar">
      <v-menu
        v-model="menuToggle" content-class="menu-toggle"
        :close-on-content-click="false" transition="slide-x-transition"
        height="100vh"

      >
        <div class="divcol center relative">
          <v-icon
          color="#fff" large
          style="position:absolute;top: 0px; right: 0px; border-radius: 50%; border: 3px solid var(--primary);"
          @click="menuToggle = false"
          >
            mdi-close
          </v-icon>
          <img src="@/assets/sources/logos/white-logo.svg" @click="$router.push('/'), menuToggle = false" alt="Logo" class="logo mt-14" style="cursor: pointer; width: 200px;">

          <div class="divcol center mt-8 pt-6" style="gap: 40px;">
            <a
              class="text-a-menu"
              @click="$router.push('/'), menuToggle = false">
              Home
            </a>

            <v-menu location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn color="transparent" flat v-bind="props" class="btn-list list-font-btn mt-0">
                  Organizaciones <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>

              <v-card class="divcol card-menu">
                <a @click="$router.push('/daos')">Todos</a>
                <a @click="$router.push('/my-daos')">Mis DAOs</a>
                <a class="d-flex" style="white-space: nowrap;" @click="$router.push('/create-dao')">
                  Crear
                  <img class="ml-2" src="@/assets/sources/icons/plus.svg" alt="plus icon">
                </a>
              </v-card>
            </v-menu>

            <a
              v-for="(item, i) in dataNavbar" :key="i"
              class="text-a-menu"
              :href="item.ref" target="_blank"
              @click="$router.push(item.link), menuToggle = false">
              {{item.name}}
            </a>

            <!-- <v-menu location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn color="transparent" flat v-bind="props" class="btn-list list-font-btn mt-0">
                  dApps <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>

              <v-card class="divcol card-menu">
                <a v-for="(item,index) in dataLinks" :key="index" :href="item.ref" target="blank">{{ item.name }}</a>
              </v-card>
            </v-menu> -->
          </div>

          <!--<v-btn class="btn mt-10" @click="openDialog()">{{ titleBtnLogin }}</v-btn>-->
          <span class="mt-10" @click="() => { if(!isLogin) { menuToggle = false } }">
            <connectWallet></connectWallet>
          </span>


        </div>
      </v-menu>
    </div>

    <div class="absolute-img">
      <img src="@/assets/sources/logos/black-logo.svg" alt="Logo" @click="$router.push('/')" style="cursor: pointer; width: 120px;">
    </div>


    <div class="center divrow delete-mobile" style="gap: 20px; margin-left: 140px">
      <a
        class="text-a-menu"
        @click="$router.push('/'), menuToggle = false"
        style="cursor: pointer; font-weight: 700!important;"
        >
        <v-icon color="white mr-1">mdi-home-outline</v-icon> Home
      </a>

      <!-- <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn color="transparent" flat v-bind="props" class="btn-list">
            <v-icon color="white mr-1">mdi-file-edit-outline</v-icon> Propuestas <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-card class="divcol card-menu">
          <a @click="$router.push('/proposals')" style="cursor: pointer;">Propuestas</a>
          <a @click="goCreateProposal()" style="cursor: pointer;">Crear propuesta</a>
        </v-card>
      </v-menu> -->

      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn color="transparent" flat v-bind="props" class="btn-list mt-0">
            <img
              src="@/assets/sources/icons/daos.svg"
              alt="daos icon"
              class="mr-2"
              style="width: 16px;">
              Organizaciones <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-card class="divcol card-menu">
          <a @click="$router.push('/daos')">Todos</a>
          <a @click="$router.push('/my-daos')">Mis DAOs</a>
          <a class="d-flex" style="white-space: nowrap;" @click="$router.push('/create-dao')">
            Crear
            <img class="ml-2" src="@/assets/sources/icons/plus.svg" alt="plus icon">
          </a>
        </v-card>
      </v-menu>

      <a v-for="(item, index) in dataNavbar" :key="index" style="color: #fff; cursor: pointer; font-weight: 700!important;" @click="$router.push(item.link)" :href="item.ref" target="_blank">
        <v-icon color="white mr-1">{{ item.icon }}</v-icon> {{ item.name }}
      </a>

      <!-- <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn color="transparent" flat v-bind="props" class="btn-list">
            <img
              src="@/assets/sources/icons/dapps.svg"
              alt="dapps icon"
              class="mr-2"
              style="width: 16px;">
            dApps <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-card class="divcol card-menu">
          <a v-for="(item,index) in dataLinks" :key="index" :href="item.ref" target="blank">{{ item.name }}</a>
        </v-card>
      </v-menu> -->
    </div>

    <div class="center divrow delete-mobile" style="gap: 10px;">
      <!--<v-select
        v-model="selectedLang"
        :items="['ENG', 'ES']"
        variant="solo"
        flat
        menu-icon="mdi-chevron-down"
        class="select"
        bg-color="transparent"
        hide-details
        style="color: white;"
      ></v-select>-->
      <!--<v-btn class="btn" @click="openDialog()">{{ titleBtnLogin }}</v-btn>-->
      <!--<v-btn class="btn" @click="dialogConnect = true">Conectar Wallet2</v-btn>-->

      <connectWallet></connectWallet>
    </div>

    <v-btn class="btn show-mobile" style="width: 50px!important; height: 50px!important;" @click="menuToggle = true">
      <v-icon style="font-size: 25px;">mdi-menu</v-icon>
    </v-btn>


  </nav>

  <v-row justify="center">
    <v-dialog
      v-model="alert2"
      persistent
      width="auto"
      content-class="dialog-dao"
    >
      <v-card>
        <v-card-title class="text-h5">
          <v-icon>mdi-alert-circle</v-icon> Advertencia
        </v-card-title>
        <v-card-text>Debe ser miembro para poder votar, solicite su membresía.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            class="btn"
            @click="alert2 = false"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script setup>

import { useWindowScroll } from '@vueuse/core';
import WalletP2p from '../services/wallet-p2p';
import connectWallet from '@/components/connect-wallet.vue';
import formatHtml from "../components/format-html.vue";
import moment from 'moment';
import utilsDAO from '@/services/utils-dao';
import { useToast } from 'vue-toastification';
import { ref, computed, onBeforeMount, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import walletP2p from '../services/wallet-p2p';
//import { Link } from '@inertiajs/inertia-vue3';

const toast = useToast(),
  router = useRouter(),
  route = useRoute(),
  // isMember = ref(utilsDAO.isMember()),
  menuToggle = ref(false),
  selectedLang = 'ES',
  dialogConnect = ref(false),
  alert2 = ref(false),
  dataNavbar = [
  //  { icon: "mdi-home-variant-outline", name: 'Home', link: '/' },
  //  { icon: 'mdi-file-edit-outline', name: 'Propuestas', link: 'proposals' },
  //  { icon: 'mdi-circle-multiple-outline', name: 'Fondos', link: 'funds' },
    { icon: 'mdi-account-group-outline', name: 'Foro', ref: 'https://foro.metademocracia.social/'}
    // { icon: 'mdi-information-outline', name: 'Metainfo', ref: 'https://metademocracia.com/' }
  ],

  dataLinks = [
    {
      name: 'WhatsGPT',
      ref: 'https://t.me/WhatsGPTFree_bot'
    },
    {
      name: 'NearP2P',
      ref: 'https://nearp2p.com/',
    },
    {
      name: 'Billetera',
      ref: 'https://mi.arepa.digital/'
    }
  ],
  titleBtnLogin = ref("Conectar Billetera"),
  isLogin = ref(false);


onBeforeMount(verifyResponse)

onMounted(verifyLogin)

async function verifyLogin() {
  const accounId = await WalletP2p.getAccountId();
  if(accounId) {
    isLogin.value = true;
  }
}

async function goCreateProposal() {
  const isMember = await utilsDAO.isMember(); // isMember.value();
  alert2.value = !isMember || false;

  if(isMember) {
    router.push('create-proposals');
  }
}

async function verifyResponse() {
  try {
    const transactionHashes = route.query?.transactionHashes;
    if(!transactionHashes) return

    /* const now = moment(new Date()); //todays date
    const end = moment(response_json.date_time*1000); // another date
    const duration = moment.duration(now.diff(end));
    const minutes = duration.asMinutes(); */

    // if(minutes > 0.7) return

    console.log("transactionHashes: ", transactionHashes)

    let dataAlert = `<p style="font-size:1.875em; color: white"><b>Transacción ejecutada</b></p>
    <p class="mt-5" style="font-size: 1em">
      <span style="color: white; font-size: 1em">
        <b>Hash:</b>
      </span>
      <a href="${process.env.ROUTER_EXPLORER_NEAR_HASH}/transaction-viewer/${transactionHashes}" target="_blank" class="ellipsis-box" style="font-size: 1em; --lines: 2"> ${transactionHashes} </a>
    </p>`;

    if(transactionHashes.split(',').length > 1) {
      const account_id = await walletP2p.getAccountId()
      dataAlert = `<p style="font-size:1.875em; color: white"><b>Transacción ejecutada</b></p>
      <center><p class="mt-5" style="font-size: 1em">
        <a style="font-size:1.5625em;" href="${process.env.ROUTER_EXPLORER_NEAR_HASH}/wallet-explorer/${account_id}" target="_blank"> Ver explorador </a>
      </p></center>`;
    }

    toast.success({component: formatHtml,
      props:  {
          html: dataAlert
      }
    });

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("response");
    urlParams.delete("transactionHashes");

    let newUrl = window.location.pathname.split('/').at(-1);
    newUrl = urlParams.size > 0 ? newUrl + "?"+urlParams.toString() : newUrl;

    history.pushState(null, "", newUrl);

    // location.href = 'http://127.0.0.1:3002/metademocracia/proposals';

  } catch (error) {
    console.log("error al cargar mensaje", error.toString());
  }


}

/* function verifySession(){
  let dataSession = localStorage.getItem("session");


  if(dataSession) {
    const account = WalletP2p.getAccoun t();

    if(!account.address || !account.privateKey) {
      logout()
      return
    }

    const dataSessionJson = JSON.parse(dataSession);
    const wallet = dataSessionJson.email || dataSessionJson.wallet
    initSession(wallet)
    return
  }



  const token = route.query?.token

  if(!token) return

  dataSession = window.atob(token)

  localStorage.setItem("session", dataSession)
  const dataSessionJson = JSON.parse(dataSession);
  const wallet = dataSessionJson.email || dataSessionJson.wallet || dataSessionJson.privateKey
  this.initSession(wallet)

  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete("token");
  //console.log(urlParams.toString(), window.location.pathname.split('/').at(-1)+"?"+urlParams.toString())
  let newUrl = window.location.pathname.split('/').at(-1);
  newUrl = urlParams.size > 0 ? newUrl + "?"+urlParams.toString() : newUrl;

  history.pushState(null, "", newUrl);
}

function initSession(wallet) {
  const wallet_final = wallet.length > 20 ? wallet.substring(0,6)+"..."+wallet.substring((wallet.length - process.env.NETWORK.length - 7), wallet.length) : wallet;
  titleBtnLogin.value = wallet_final;
}

function openDialog() {
  if(localStorage.getItem("session")) {
    dialogConnect.value = true

    return
  }

  this.dialog = true
}

function login() {
  WalletP2p.login(process.env.CONTRACT_DAO);
}

async function logout() {
  titleBtnLogin.value = "Conectar Billetera";
  dialogConnect.value = false;

  await WalletP2p.logout();

  // window.open(window.location.origin + window.location.pathname, "_self");
} */

</script>


<style lang="scss">
@use '@/assets/styles/main.scss' as *;

#navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-inline: var(--margin-global);
  background: transparent;
  padding-block: 20px;
  position: relative;

  a {
    color: #000 !important;
    * { color: #000 !important; }
  }

  .absolute-img{
    position: absolute;
  }

  .delete-mobile{
    @include media(max, 960px){
      display: none;
    }
  }

  .show-mobile{
    display: none;

    @include media(max, 960px){
      display: block;
    }
  }

  .select{
    .v-field__input{
      padding-left: 0px;
    }

    i{
      color: $primary;
    }
  }
}

.btn-list{
  width: max-content;
  padding-inline: 0px;
  border-radius: 5px!important;
  span{
    font-weight: 700;
    font-size: 15px;
    color: #000;
  }
}

.list-font-btn{
  min-height: 1px!important;
  height: max-content!important;
  span{
    font-size: 20px;
  }
}

.card-menu{
  background-image: linear-gradient(145deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-accent)))!important;
  padding: 15px 10px!important;
  border-radius: 12px!important;
  box-shadow: inset 0 3 6 #231f204d;
  display: flex;
  flex-direction: column;
  justify-content: space-between !important;

  > *:not(:first-of-type, :last-child) { margin-top: 20px; }
  * {
    font-weight: 600 !important;
    cursor: pointer;
    color: #fff;
  }
}

.dialog-dao{
  .v-card{
    background-image: linear-gradient(45deg, rgb(var(--v-theme-primary)) 30%, rgb(var(--v-theme-accent)) 80%);

    .v-card-title{
      color: #fff;
    }

    .v-card-text{
      color: #fff;
    }
  }
}

.v-alert{
  background: linear-gradient(45deg, rgb(var(--v-theme-primary)) 30%, rgb(var(--v-theme-accent)) 60%)!important;
  width: 40%;
  margin-inline: auto;
  @include media(max, 900px){
    width: 90%;
  }

  a{
    color: #fff;
    text-decoration: underline;
  }
  .mdi-close{
    font-size: 20px;
  }
}

.dialog-connect{
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;

    .card-dialog{
      padding: 25px;
      padding-block: 20px!important;
      background-image: linear-gradient(135deg, rgb(var(--v-theme-primary)) 30%, rgb(var(--v-theme-secondary)) 80%)!important;
      width: 60%;

      @include media(max, 1400px){
        width: 80%;
      }

      .div-card{
        background-image: linear-gradient(45deg, rgb(var(--v-theme-accent)) 30%, rgba(var(--v-theme-accent), .7) 80%)!important;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 20px;
        padding-block: 30px;
        border-radius: 10px;
        position: relative;
        max-height: 80%;
        overflow-y: scroll;

        .sheet-dialog{
          background-color: rgba(0,0,0,0.5);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          padding: 10px 20px 10px 20px;
          min-width: 150px;
          position: relative;

          span{
            font-size: 14px;
          }

          .icon{
            transform: rotate(135deg);
            position: absolute;
            top: 5px;
            right: 5px;
            color: rgb(var(--v-theme-accent));
            font-size: 20px;
          }
        }
      }
    }
  }

.menu-toggle{
  height: 400vh!important;
  min-height: 100%!important;
  width: 100vw;
  max-width: 100%;
  padding-inline: 30px;
  padding-block: 30px;
  background-image: linear-gradient(45deg, rgb(var(--v-theme-primary)) 30%, rgb(var(--v-theme-accent)) 80%);
  top: 0!important;
  left: 0;
  z-index: 100;

  * {
      color: #fff !important;
    }
  .text-a-menu{
    --fs: 20px!important;
    --fw: 700;
    font-weight: 700!important;
    color: #fff !important;
  }
}
</style>
