<template>
  <div id="render-layout" class="center divcol" style="gap: 30px;">
    <section style="margin-inline: calc(50% - 50vw) !important; width: 100vw!important;">
      <v-carousel cycle color="#DB107C" :show-arrows="false">
        <v-carousel-item>
          <img src="@/assets/sources/images/banner-3.svg" alt="Banner" class="banner-img">
        </v-carousel-item>

        <v-carousel-item>
          <img src="@/assets/sources/images/banner-2.svg" alt="Banner" class="banner-img">
        </v-carousel-item>

        <v-carousel-item>
          <img src="@/assets/sources/images/banner-1.svg" alt="Banner" class="banner-img">
        </v-carousel-item>
      </v-carousel>
    </section>

    <section v-if="$route.name != 'Home'" class="section2-home">
      <div class="member-container">
        <div class="center mobile-div-member" style="gap: 10px;">
          <img
            :src="imgDao"
            alt="Members"
            style="max-width: 60px; $size: 58px; width: $size; height: $size; border-radius: 50%; border: 3.5px solid rgb(var(--v-theme-primary)); background: linear-gradient(-145deg, rgb(var(--v-theme-primary)), #62C3D7); object-fit: cover;"
            class="dao-image mx-auto">
          <span style="font-weight: 700!important; line-height: 1.6ch;">
            Dao: <br> <br>
            <span style="font-size: 13px; font-weight: 400 !important;">{{ walletDao }}</span>
            <!-- <span style="font-size: 1.5rem;" v-if="result">{{ result?.serie?.supply }}</span> -->
          </span>
        </div>

        <v-form v-model="formValid" @submit.prevent="delegate">
        <v-text-field
          v-model="amount_near"
          id="amount_near"
          variant="solo"
          flat
          type="number"
          class="container-input-search"
          :rules="required"
          required
          @keydown="(e) => {
            if (['e', 'E', '-'].includes(e.key)) e.preventDefault()
          }"
        >
          <template #prepend>
            <v-select
              v-model="selectedToken"
              :items="tokens"
              item-title="name"
              item-value="name"
              class="token-selector disable-title"
              :menu-props="{ class: 'disable-title' }"
              variant="solo"
              hide-details
            >
              <template #selection="{ item }">
                <div class="token-logo mr-2">
                  <img style="height: 20px; width: 20px;" :src="item.raw.icon" :alt="`${item.raw.name} icon`">
                </div>

                <span>{{ item.raw.name }}</span>
              </template>

              <template #item="{ item, props }">
                <v-list-item v-bind="props">
                  <aside class="d-flex align-center pa-1">
                    <div class="token-logo mr-2">
                      <img style="height: 20px; width: 20px;" :src="item.raw.icon" :alt="`${item.raw.name} icon`">
                    </div>

                    <span>{{ item.raw.name }}</span>
                  </aside>
                </v-list-item>
              </template>
            </v-select>
          </template>

          <template #append-inner>
            <v-btn
              class="btn-donar"
              style="font-weight: 700!important;"
              @click="delegate()"
            >Donar</v-btn>
          </template>
        </v-text-field>
      </v-form>



        <div class="center" style="gap: 10px;">
          <!--<v-icon color="#fff">mdi-instagram</v-icon>
          <v-icon color="#fff">mdi-share-variant</v-icon>
           <v-btn
            color="rgb(var(--v-theme-tertiary))"
          >
            <img src="@/assets/sources/icons/plus.svg" alt="plus icon" class="mr-1" style="width: 10px;">
            Follow
          </v-btn> -->
        </div>
      </div>

      <div
        v-if="daoActive"
        class="bottom-options"
      >
        <v-tabs v-model="tab" center-active slider-color="transparent">
          <v-tab v-for="(item, i) in dataTabs" :key="i" :class="{ active: canActive && i === tab }" @click="routeRedirect(item.to)" >
            <img :src="item.icon" :alt="`${item.name} icon`" class="mr-2" style="width: 20px;">
            {{ item.name }}
          </v-tab>
        </v-tabs>

        <v-tooltip
          v-if="create_proposal"
          location="top center"
          content-class="tooltip"
        >
          <template #activator="{ props }">
            <v-tab v-bind="props" style="background-color: rgba(50, 92, 151, .8);" min-width="75" @click="createProposal()">
              <img src="@/assets/sources/icons/plus.svg" alt="create proposal" style="width: 20px;">
            </v-tab>
          </template>

          <span>Crear propuesta</span>
        </v-tooltip>
      </div>
    </section>

    <router-view />
  </div>
</template>

<script>
import '@/assets/styles/layouts/render-layout.scss';
import proposalIcon from '@/assets/sources/icons/proposal.svg';
import MetademocraciaImage from '@/assets/sources/images/metademocracia-image.png';
import fundsIcon from '@/assets/sources/icons/funds.svg';
import membersIcon from '@/assets/sources/icons/members.svg';
import settingsIcon from '@/assets/sources/icons/settings.svg';
import nearIcon from '@/assets/sources/logos/near.svg';
import usdtIcon from '@/assets/sources/icons/tether-icon.svg';
import WalletP2p from '../services/wallet-p2p';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
// import moment from 'moment';
// import graphQl from '@/services/graphQl';

export default {
  setup(){
    return{
      route: "",
      routes: [
        '', '/', 'Home'
        /*'Proposals',
        'proposals',
        'proposal-details',
        'create-proposal',
        'members',
        'funds',
        'settings',
        'general-settings',
        'policy-settings',
        'proposals-meta',
        'create-proposal-meta',
        'proposal-details-meta',
        'funds-meta'*/
      ],
      tab: ref(0),
      dialog: ref(false),
      required: [v => !!v || 'Ingrese un monto'],
      toggle: ref(0),
      dataTabs: ref([]),
      tokens: [
        { name: "NEAR", icon: nearIcon},
        { name: "USDT", icon: usdtIcon}
      ],
      selectedToken: ref("NEAR"),
      amount_near: ref(null),
      create_proposal: ref(false),
      // route_dao: ref(null),
      walletDao: ref(null),
      formValid: ref(false),
      imgDao: ref(MetademocraciaImage),
      account_id: ref(null)
    }
  },
  mounted(){
    //console.log("aqui: ", atob("eyJwdXJwb3NlIjoiZGRkZyIsImJvbmQiOiIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLCJ2b3RlX3BlcmlvZCI6IjYwNDgwMDAwMDAwMDAwMCIsImdyYWNlX3BlcmlvZCI6Ijg2NDAwMDAwMDAwMDAwIiwicG9saWN5Ijp7InJvbGVzIjpbeyJuYW1lIjoiY291bmNpbCIsImtpbmQiOnsiR3JvdXAiOlsiaHJwYWxlbmNpYS5uZWFyIl19LCJwZXJtaXNzaW9ucyI6WyIqOioiXSwidm90ZV9wb2xpY3kiOnt9fV0sImRlZmF1bHRfdm90ZV9wb2xpY3kiOnsid2VpZ2h0X2tpbmQiOiJSb2xlV2VpZ2h0IiwicXVvcnVtIjoiMCIsInRocmVzaG9sZCI6WzEsMl19LCJwcm9wb3NhbF9ib25kIjoiMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwicHJvcG9zYWxfcGVyaW9kIjoiNjA0ODAwMDAwMDAwMDAwIiwiYm91bnR5X2JvbmQiOiIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLCJib3VudHlfZm9yZ2l2ZW5lc3NfcGVyaW9kIjoiNjA0ODAwMDAwMDAwMDAwIn0sImNvbmZpZyI6eyJwdXJwb3NlIjoiZGRkZyIsIm5hbWUiOiJnZGZnZGYiLCJtZXRhZGF0YSI6ImV5SnpiM1ZzUW05MWJtUlViMnRsYmtsemMzVmxjaUk2SWlJc0lteHBibXR6SWpwYlhTd2labXhoWjBOdmRtVnlJam9pYUhSMGNITTZMeTlwY0daekxtNWxZWEl1YzI5amFXRnNMMmx3Wm5NdlltRm1hM0psYVdOa04zZHRhbVpwZW5Oc2VEY3llV050Ym5OdGJ6ZHROMjF1ZG1aemVYSjNObmRuYUhOaGMyVnhORFY1WW5Oc1ltVnFkbmtpTENKbWJHRm5URzluYnlJNkltaDBkSEJ6T2k4dmFYQm1jeTV1WldGeUxuTnZZMmxoYkM5cGNHWnpMMkpoWm10eVpXbGhaRFZqTkhJemJtZHRibTAzY1RaMk5USnFiMkY2TkhsMGFUZHJaM05uYnpac2N6VndabUp6YW5wamJHeHFjSFp2Y25OMUlpd2laR2x6Y0d4aGVVNWhiV1VpT2lKblpHWm5aR1lpTENKc1pXZGhiQ0k2ZXlKc1pXZGhiRk4wWVhSMWN5STZJaUlzSW14bFoyRnNUR2x1YXlJNklpSjlmUT09In19"))

  },
  computed: {
    canActive() {
      return this.$route.name != "Home" && this.$route.name != "CreateProposal"
    },

    async daoActive() {
      this.route = this.$route.path.replace("/", "");
      const dao = this.route == "" ? process.env.CONTRACT_DAO : this.$route.query?.dao

      // const excludeRoute = this.routes.find((routeFind) => routeFind === this.route)

      // this.routes.find((route) => route === route)

      if(dao) {
        if (process.env.CONTRACT_DAO !== dao) {
          this.dataTabs = [
            {
              name: "Propuestas",
              icon: proposalIcon,
              to: "proposals"
            },
            {
              name: "Fondos",
              icon: fundsIcon,
              to: "funds"
            },
            {
              name: "Miembros",
              icon: membersIcon,
              to: "members"
            },
            {
              name: "Configuración",
              icon: settingsIcon,
              to: "settings"
            }
          ]
        } else {

          this.dataTabs = [
            {
              name: "Propuestas",
              icon: proposalIcon,
              to: "proposals"
            },
            {
              name: "Fondos",
              icon: fundsIcon,
              to: "funds"
            },
            {
              name: "Miembros",
              icon: membersIcon,
              to: "members"
            }
          ]
        }

        this.walletDao = dao;
        // this.route_dao = dao;
        this.create_proposal = true;
        this.loadImgDao(dao);

        return true

      }

      this.walletDao = process.env.CONTRACT_DAO;
      this.loadImgDao(process.env.CONTRACT_DAO);

      return false
    }
  },


  beforeMount() {
    /* this.route = window.location.pathname.split('/').at(-1);

    //console.log("query: ", this.$route.query.dao)
    const dao = this.$route.query?.dao

    if(dao) {
      this.walletDao = dao
      this.create_proposal = true;
    } */



    switch (this.$route.name) {
      case 'Funds':
        this.tab = 1
        break;
      case 'Members':
        this.tab = 2
        break;
      case 'Settings':
        this.tab = 3
        break;
      default:
        this.tab = 0
        break;
    }
  },


  methods: {
    async getAccountId() {
      const accounId = await WalletP2p.getAccountId();
      this.account_id = accounId
    },

    /* isRouteValid() {
      return this.routes.find((route) => route === this.route)
    }, */
    async loadImgDao(dao) {
      if(dao == process.env.CONTRACT_DAO) {
        this.imgDao = MetademocraciaImage
      } else {
        const responseConfig = await WalletP2p.view({
            contractId: dao,
            methodName: "get_config"
          });

        const metadata = JSON.parse(atob(responseConfig.metadata));

        this.imgDao = metadata?.img ? metadata.img : MetademocraciaImage;
      }

    },

    routeRedirect(route){
      if(!this.walletDao) return

      if(process.env.CONTRACT_DAO == this.walletDao /* this.$route.query?.dao*/ ) {
        this.$router.push({ path: route+'-meta', query: {dao: this.walletDao}  })
      } else {
        this.$router.push({ path: route, query: {dao: this.walletDao}  })
      }
    },

    createProposal() {
      if(process.env.CONTRACT_DAO == this.walletDao) {
        this.$router.push({ path: 'create-proposal-meta', query: {dao: this.walletDao}  })
      } else {
        this.$router.push({ path: 'create-proposal', query: {dao: this.walletDao}  })
      }
    },
    async openDialog() {
      if(!this.account_id) {
        this.$toast('Debe conectar su wallet primero para poder donar')
        return
      }

      const valid = this.formValid

      if(valid) {
        this.dialog = true;
      }
    },

    async verifyLogin() {
      const accounId = await WalletP2p.getAccountId();
      if(accounId) {
        return true;
      }

      return false;
    },

    async delegate(){
      const verifyLoginUser = await this.verifyLogin();

      if(!verifyLoginUser) {
        useToast().info("Debes iniciar sesión para poder donar");
        return
      }

      if(!this.formValid) return
      // console.log("token: ", this.selectedToken)
      //this.walletDao = process.env.CONTRACT_DAO
      switch (this.selectedToken) {
        case 'NEAR': {
          const contractId = this.walletDao == process.env.CONTRACT_DAO ? process.env.CONTRACT_DAO : process.env.CONTRACT_FACTORY;
          const delegateAccount = this.walletDao == process.env.CONTRACT_DAO ? this.account_id : this.walletDao;

          const amount = WalletP2p.parseNearAmount(this.amount_near).toString();
          const deposit = WalletP2p.parseNearAmount(this.amount_near).toString();


          const json = {
            contractId: contractId,
            methodName: "delegate",
            args: {
              account_id: delegateAccount,
              amount: amount
            },
            gas: "300000000000000",
            attachedDeposit: deposit
          };

          // 1000000000000000000000
          WalletP2p.call(json);
        }
          break;

        case 'USDT': {
          // console.log("deposit usdt")

          const amount = BigInt(Math.round(Number(this.amount_near) * Math.pow(10, 6))).toString(); //(BigInt(this.amount_near.toString()) * BigInt("1000000")).toString()


          const usdtIsActive = await WalletP2p.view({
            contractId: process.env.CONTRACT_USDT,
            methodName: "storage_balance_of",
            args: { account_id: this.walletDao }
          });


          if(!usdtIsActive){
            const transactions = [
              {
                receiverId: process.env.CONTRACT_USDT,
                actions: [
                  {
                    type: "FunctionCall",
                    params: {
                      methodName: "storage_deposit",
                      args: {
                        account_id: this.walletDao,
                      },
                      gas: "30000000000000",
                      deposit: "1250000000000000000000"
                    }
                  },
                  {
                    type: "FunctionCall",
                    params: {
                      methodName: "ft_transfer",
                      args: {
                        receiver_id: this.walletDao,
                        amount: amount
                      },
                      gas: "15000000000000",
                      deposit: "1"
                    }
                  }
                ]
              }
              /*{
                receiverId: process.env.CONTRACT_USDT,
                functionCalls: [
                  {
                    methodName: "storage_deposit",
                    args: {
                      account_id: this.walletDao,
                    },
                    gas: "30000000000000",
                    attachedDeposit: "1250000000000000000000"
                  },
                  {
                    methodName: "ft_transfer",
                    args: {
                      receiver_id: this.walletDao,
                      amount: amount
                    },
                    gas: "15000000000000",
                    attachedDeposit: "1"
                  }
                ]
              },*/
            ];

            await WalletP2p.callBatchTransactions(transactions);
          } else {
            const json = {
              contractId: process.env.CONTRACT_USDT,
              methodName: "ft_transfer",
              args: {
                receiver_id: this.walletDao,
                amount: amount
              },
              gas: "300000000000000",
              attachedDeposit: "1"
            };
            await WalletP2p.call(json);
          }
          // 1000000000000000000000
        }
          break;
      }

    },
  }
}
</script>
<style lang="scss">
.v-window__controls {
  margin-top: -50px !important; /* Adjust this value as needed */
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
.dao-image {
  $size: 58px;
  width: $size;
  height: $size;
  border-radius: 50%;
  border: 3.5px solid rgb(var(--v-theme-primary));
  background: linear-gradient(-145deg, rgb(var(--v-theme-primary)), #62C3D7);
  object-fit: cover;
}
</style>
