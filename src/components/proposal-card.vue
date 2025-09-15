<template>
  <v-sheet class="proposal-card" elevation="3">
    <v-card class="vertical-toolbar clear-overlay" @click="onPressProposal">
      <span>Propuesta ID:{{ proposal?.id }}</span>
      <img src="@/assets/sources/icons/leave.svg" alt="leave icon" style="width: 20px;">
    </v-card>

    <v-card class="flex-column" elevation="3" color="#FAFAFA">
      <v-card-title class="flex-column pa-0" style="gap: 20px; overflow: visible;">
        <div class="flex-space-center">
          <label>Tipo de propuesta: {{ mapType() }}</label>

          <!--<v-btn icon color="transparent" elevation="0" size="20px" class="relative clear-overlay" :ripple="false">
            <v-icon
              class="text-tertiary"
              icon="mdi-dots-horizontal"
              size="40px"
              style="translate: 0 -10px;"
            />
          </v-btn>-->
          <v-menu>
            <template v-slot:activator="{ props: menu }">
              <v-tooltip location="top">
                <template v-slot:activator="{ props: tooltip }">
                  <v-btn
                    icon
                    color="transparent"
                    elevation="0"
                    size="20px"
                    class="relative clear-overlay"
                    :ripple="false"
                    v-bind="mergeProps2(menu, tooltip)"
                  >
                    <v-icon
                      class="text-tertiary"
                      icon="mdi-dots-horizontal"
                      size="40px"
                      style="translate: 0 -10px;"
                    />
                  </v-btn>
                </template>
                <span>opciones</span>
              </v-tooltip>
            </template>
            <v-list>
              <v-list-item  @click="copy(proposal?.id)">
                <v-list-item-title> Copiar Link</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div class="flex-space-center flex-wrap">
          <v-btn
            v-if="proposal?.title"
            :text="proposal?.title"
            append-icon="mdi-link"
            class="title-linked px-0"
          />

          <span v-if="proposal?.date" class="text-tertiary ml-auto" style="--fs: 0.875em">Aprobado el: {{ proposal?.date }}</span>
        </div>
      </v-card-title>

      <hr class="my-3">

      <v-card-text class="pa-0 pr-1 d-flex flex-column">
        <div class="card__content">
          <img
            v-if="proposal?.status != 'InProgress'"
            :src="loadSrcLogo().src"
            :alt="loadSrcLogo().alt"
            class="mr-5"
            style="--w: clamp(4em, 12vw, 6.25em); width: var(--w); height: var(--w); float: right;"
          >

          <p class="label mb-2">Proponente</p>
          <p style="word-break: break-all;">{{ proposal?.proposer }}</p>


          <!-- if ChangeConfig  -->
          <span v-if="proposal?.type == 'ChangeConfig'">
            <p class="label mb-2">Motivo</p>
            <p class="ellipsis-box" style="--lines: 6; color: black !important;"> {{ proposal?.description }}</p>
            <!--<p class="ellipsis-box" style="--lines: 6; color: black !important;"> el motivo es</p>-->

            <span v-if="proposal?.title == 'Cambio de nombre y proposito del dao' || proposal?.title == 'Cambio de nombre y propósito del dao'">
              <p class="label mb-2">Nuevo nombre</p>
              <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.objectProposal?.config?.name }}</p>

              <p class="label mb-2">Nuevo propósito</p>
              <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.objectProposal?.config?.purpose }}</p>

              <p class="label mb-2">Tipo dao</p>
              <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.objectProposal?.config?.isPrivate }}</p>
            </span>

            <span v-if="proposal?.title == 'Cambio Estado legal y Documento'">
              <p class="label mb-2">Nuevo estado legal</p>
              <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.configMetadata?.kyc?.legacyState }}</p>

              <p class="label mb-2">Nuevo documento</p>
              <a :href="proposal?.configMetadata?.kyc?.proposalKyc" class="ellipsis-box" style="--lines: 6;" target="_blank"> {{ proposal?.configMetadata?.kyc?.proposalKyc }}</a>
            </span>

            <span v-if="proposal?.title == 'Cambio de redes sociales'">
              <p class="label mb-2">Nuevas redes sociales</p>
              <span v-if="proposal?.configMetadata?.social"  v-for="(item, i) in proposal?.configMetadata?.social" :key="i">
                <a :href="item" class="ellipsis-box" style="--lines: 6;" target="_blank"> {{ item }}</a>
              </span>
            </span>

            <span v-if="proposal?.title == 'Cambio de logo'">
              <p class="label mb-2">Nuevo logo</p>
              <a :href="proposal?.configMetadata.img" class="ellipsis-box" style="--lines: 6;" target="_blank"> {{ proposal?.configMetadata.img }}</a>
            </span>

          </span>

          <!-- if AddMemberToRole  or RemoveMemberFromRole  -->
          <span v-else-if="proposal?.type == 'AddMemberToRole' || proposal?.type == 'RemoveMemberFromRole'">
            <p class="label mb-2">Descripción</p>
            <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.description }} </p>

            <p class="label mb-2">Usuario</p>
            <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.objectProposal?.member_id }} </p>

            <p class="label mb-2">Rol</p>
            <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.objectProposal?.role }} </p>
          </span>


          <!-- if AddMembersToRole  -->
          <span v-else-if="proposal?.type == 'AddMembersToRole'">
            <p class="label mb-2">Descripción</p>
            <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.description }} </p>

            <center><p class="label mb-4">Lista de miembros a agregar</p></center>

            <div style="gap: 20px; display: grid; grid-template-columns: repeat(2, 1fr);">
                <p class="label mb-2">Usuarios</p>
                <p class="label mb-2">Roles</p>
            </div>
            <span v-for="(item, i) in proposal?.objectProposal?.members_id" :key="i">
              <div style="gap: 20px; display: grid; grid-template-columns: repeat(2, 1fr);">
                <p class="ellipsis-box" style="--lines: 6;"> {{item.split("|")[1]}} </p>
                <p class="ellipsis-box" style="--lines: 6;"> {{item.split("|")[0]}} </p>
              </div>
            </span>

          </span>


          <!-- if Transfer  -->
          <span v-else-if="proposal?.type == 'Transfer'">
            <p class="label mb-2">Descripción</p>
            <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.description }} </p>

            <p class="label mb-2">Usuario receptor</p>
            <p class="ellipsis-box" style="--lines: 6;"> {{ proposal?.objectProposal?.receiver_id }} </p>
          </span>

          <span v-else>
            <p class="label mb-2">Descripción</p>
            <v-div id="description" class="ellipsis-box" style="--lines: 6; color: black !important;" v-html="proposal?.description"></v-div>
          </span>


        </div>

        <a :href="proposal?.link" target="_blank" class="mb-4 mt-5">
          <v-icon icon="mdi-link" size="20" class="text-secondary" style="rotate: -45deg;" />
          {{ proposal?.link }}
        </a>

        <div class="card__bottom flex-space-center mt-auto" style="gap: clamp(20px, 3vw, 40px);">
          <aside class="flex-grow-1 d-flex flex-wrap flex-spacee justify-start" style="gap: clamp(20px, 3vw, 40px);">
            <div v-if="mapAmount()" class="flex-column" style="gap: 10px;">
              <label>Amount</label>
              <span class="flex-center" style="gap: 4px;">
                {{ mapAmount().amount }}
                <img
                  :src="iconMap[mapAmount().asset]"
                  alt="near logo"
                  style="width: 15px; height: 15px; translate: 0 -1px;"
                >
                {{ mapAmount().asset }}
              </span>
            </div>

            <div v-if="proposal?.claims" class="flex-column" style="gap: 10px;">
              <label>Reclamaciones disponibles</label>
              <span>{{ proposal?.claims }}</span>
            </div>

            <div class="flex-column" style="gap: 10px;">
              <label>Tiempo para completar</label>
              <span>{{ proposal?.remainingTime }}</span>
            </div>
          </aside>
        </div>
      </v-card-text>

      <aside v-if="proposal?.status == 'Failed' || proposal?.culminar" class="flex-center ml-auto" style="gap: 20px;">
        <div class="flex-center" style="gap: 10px;">
          <v-btn
            class="bg-tertiary"
            elevation="1"
            @click="finalize(proposal?.id, proposal?.contractId, proposal?.type)"
          >
          <h7 class="text-white" style="font-weight: 500">{{ proposal?.culminar ? 'Culminar vencida' : 'Culminar' }}</h7>
          </v-btn>
        </div>
      </aside>
      <aside v-else class="flex-center ml-auto" style="gap: 20px;">
        <div class="flex-center" style="gap: 10px;">
          <!--<v-btn
            icon
            :disabled="proposal?.vote || !['InProgress', 'Failed'].includes(proposal?.status)"
            :color="(proposal?.vote == 'VoteApprove' ? '#77f1a4' : '#EEE6F1')"
            elevation="0"
            size="29"
            @click="upvote(proposal?.id, proposal?.contractId, proposal?.type)"
          >-->
            <!--<v-icon icon="mdi-thumb-up" color="#DC7AAB" size="15" />-->
            <img
              :src="proposal?.vote == 'VoteApprove' ? VotoPositivoIcon : VotoPositivoGrisIcon"
              alt="voto positivo"
              class=""
              :style="'--w: clamp(2.23em, 12vw, 0.45em); width: var(--w); height: var(--w); float: right;'+(!proposal?.vote && proposal?.status == 'InProgress' ? 'cursor:pointer;' : '')"
              @click="() => {if(!proposal?.vote && proposal?.status == 'InProgress') {upvote(proposal?.id, proposal?.contractId, proposal?.type)}}"
            >
          <!--</v-btn>-->

          <span>{{ proposal?.likes }}</span>
        </div>

        <div class="flex-center" style="gap: 10px;">
          <!--<v-btn
            icon
            :disabled="proposal?.vote || !['InProgress', 'Failed'].includes(proposal?.status)"
            :color="proposal?.vote == 'VoteReject' ? '#77f1a4' : '#EEE6F1'"
            elevation="0"
            size="29"
            @click="downvote(proposal?.id, proposal?.contractId, proposal?.type)"
          >-->
            <!--<v-icon icon="mdi-thumb-down" color="#DC7AAB" size="15" />-->
            <img
              :src="proposal?.vote == 'VoteReject' ? VotoNegativoIcon : VotoNegativoGrisIcon"
              alt="voto positivo"
              class="mt-3"
              :style="'--w: clamp(2.23em, 12vw, 0.45em); width: var(--w); height: var(--w); float: right;'+(!proposal?.vote && proposal?.status == 'InProgress' ? 'cursor:pointer;' : '')"
              @click="() => {if(!proposal?.vote && proposal?.status == 'InProgress') {downvote(proposal?.id, proposal?.contractId, proposal?.type)}}"
            >
          <!--</v-btn>-->

          <span>{{ proposal?.dislikes }}</span>
        </div>
      </aside>
    </v-card>
  </v-sheet>
</template>

<script setup>
// import ApprovedIcon from '@/assets/sources/images/approved.svg'
import ApprovedIcon from '@/assets/sources/images/Iconos-propuestas-metadao-aprobado.png'
import ExpiradoIcon from '@/assets/sources/images/Iconos-propuestas-metadao-expirado.png'
import RechazadoIcon from '@/assets/sources/images/Iconos-propuestas-metadao-rechazado.png'
import VotoPositivoIcon from '@/assets/sources/images/voto-positivo.png'
import VotoPositivoGrisIcon from '@/assets/sources/images/voto-positivo-por-realizar.png'
import VotoNegativoIcon from '@/assets/sources/images/voto-negativo.png'
import VotoNegativoGrisIcon from '@/assets/sources/images/voto-negativo-por-realizar.png'
import FailedIcon from '@/assets/sources/images/Iconos-propuestas-metadao-FALLIDO.png'
import ARP from '@/assets/sources/icons/Arepa-Digital.svg';
import WBTC from '@/assets/sources/icons/Bitcoin.svg';
import USDT from '@/assets/sources/icons/tether-icon.svg';
import Near from '@/assets/sources/logos/near-icon.svg';
import { useRouter } from 'vue-router';
import WalletP2p from '../services/wallet-p2p';
import utilsDAO from '@/services/utils-dao';
import { useToast } from 'vue-toastification';
import { mergeProps, computed, ref } from 'vue';
import variables from '@/mixins/variables';


const
  { itemsTokens } = variables,
  toast = useToast(),
  router = useRouter(),
  props = defineProps({
    proposal: {
      type: Object,
      default: undefined
    }
  }),
  iconMap = { Near, USDT, ARP, WBTC },
  mergeProps2 = mergeProps




async function verifyLogin() {
  const accounId = await WalletP2p.getAccountId();
  if(accounId) {
    return true;
  }

  return false;
}

function loadSrcLogo() {
  let result;
  switch(props.proposal?.status) {
    case 'Approved': result = {src: ApprovedIcon, atl: 'proposal approved'}
      break;
    case 'Expired': result = {src: ExpiradoIcon, atl: 'proposal Expired'}
      break;
    case 'Rejected': result = {src: RechazadoIcon, atl: 'proposal Rejected'}
      break;

    default: result = {src: FailedIcon, atl: 'proposal Failed'}
      break;
  }

  return result
}
function copy(id) {
  let route = "proposal-details";
  if(process.env.CONTRACT_DAO == props.proposal.contractId) {
    route = "proposal-details-meta";
  }
  const link = window.location.origin + process.env.BASE_URL + route + "?dao="+props.proposal.contractId+"&id=" + id
  navigator.clipboard.writeText(link);
}

function mapType() {
  const map = [
    {id: "Vote", value: "Votación"},
    {id: "Transfer", value: "Transferencia"},
    {id: "AddMemberToRole", value: "Agregar miembro"},
    {id: "RemoveMemberFromRole", value: "Eliminar miembro"},
    {id: "ChangePolicy", value: "Cambio de politicas"},
  ];
  let typeId = props.proposal?.type;
  typeId = !typeId ? "" : typeId;

  const type = map.find((item) => item.id == typeId)?.value;

  return !type ? typeId : type;
}

function mapAmount() {
  try {
    if(!props.proposal?.type) return undefined
    if(props.proposal?.type != "Transfer") return undefined

    const tokenId = props.proposal?.objectProposal.token_id;
    const tokenData = itemsTokens.find((element) => element.id === (!tokenId || tokenId == "" ? null : tokenId));
    const asset = tokenData?.desc; //!tokenId || tokenId == "" ? "NEAR" : tokemMap.find((element) => element.id === tokenId)?.desc;
    const decimals = tokenData?.decimals; //asset == "NEAR" ? 24 : 6;
    const amount = Number(props.proposal?.objectProposal.amount);
    // const fixe = asset == "NEAR" ? 5 : 2;
    const amountParse = amount / Math.pow(10, decimals);

    return {amount: amountParse, asset: asset}
  } catch (error) {
    return undefined
  }
}

function onPressProposal() {
  if(process.env.CONTRACT_DAO == props.proposal.contractId) {
    router.push({ path: 'proposal-details-meta', query: { dao: props.proposal.contractId, id: props.proposal.id } })
  } else {
    router.push({ path: 'proposal-details', query: { dao: props.proposal.contractId, id: props.proposal.id }  })
  }

  //router.push({ name: 'ProposalDetails', query: { dao: props.proposal.contractId, id: props.proposal.id } })
}

async function finalize(id, contractId, type) {
  const verifyLoginUser = await verifyLogin();

  if(!verifyLoginUser) {
    toast.info("Debes iniciar sesión para culminar propuesta");
    return
  }

  if(!id && !contractId) return

  const gas = type == "Transfer" ? "300000000000000" : "300000000000000";
  let json = {
    contractId: contractId,
    methodName: "act_proposal",
    args: {
      id: Number(id),
      action: "Finalize"
    },
    gas,
    // attachedDeposit: "1"
  };

  if(contractId == process.env.CONTRACT_DAO) {
    const isMember = await utilsDAO.isMember();

    if(!isMember) return

    json = {
      contractId: process.env.CONTRACT_DAO,
      methodName: "update_proposal",
      args: {
        id: Number(id),
        action: "VoteApprove"
      },
      gas: "156000000000000"
      // attachedDeposit: "100000000000000000000"
    };

  }

  await WalletP2p.call(json);

}

async function upvote(id, contractId, type) {
  const verifyLoginUser = await verifyLogin();

  if(!verifyLoginUser) {
    toast.info("Debes iniciar sesión para votar");
    return
  }

  if(!id && !contractId) return

  const gas = type == "Transfer" ? "300000000000000" : "300000000000000";
  let json = {
    contractId: contractId,
    methodName: "act_proposal",
    args: {
      id: Number(id),
      action: "VoteApprove"
    },
    gas,
    // attachedDeposit: "1"
  };

  if(contractId == process.env.CONTRACT_DAO) {
    const isMember = await utilsDAO.isMember();

    if(!isMember) return

    json = {
      contractId: process.env.CONTRACT_DAO,
      methodName: "update_proposal",
      args: {
        id: Number(id),
        action: "VoteApprove"
      },
      gas: "156000000000000"
      // attachedDeposit: "100000000000000000000"
    };
  }

  await WalletP2p.call(json);

}



async function downvote(id, contractId, type) {
  const verifyLoginUser = await verifyLogin();

  if(!verifyLoginUser) {
    toast.info("Debes iniciar sesión para votar");
    return
  }

  if(!id && !contractId) return

  const gas = type == "Transfer" ? "300000000000000" : "300000000000000";
  let json = {
    contractId: contractId,
    methodName: "act_proposal",
    args: {
      id: Number(id),
      action: "VoteReject"
    },
    gas,
    // attachedDeposit: "1"
  };

  if(contractId == process.env.CONTRACT_DAO) {
    const isMember = await utilsDAO.isMember();

    if(!isMember) return

    json = {
      contractId: process.env.CONTRACT_DAO,
      methodName: "update_proposal",
      args: {
        id: Number(id),
        action: "VoteReject"
      },
      gas: "156000000000000"
      // attachedDeposit: "100000000000000000000"
    };
  }

  WalletP2p.call(json);

}

</script>

<style lang="scss">
@import '@/assets/styles/main.scss';

#description {
  b {
    color: black !important;
  }
}

.proposal-card {
  $media: 700px;
  $fontSize: var(--resizer);
  --w-toolbar: 40px;
  --h: 450px;
  --br: 8px;
  position: relative;
  height: var(--h);
  border-radius: var(--br) !important;
  padding: 20px;
  padding-left: calc(var(--w-toolbar) + 20px);

  label, .label { color: #939393 !important }
  p { color: #333333 !important }
  a { color: #61C2D5 !important }
  label, a, p { font-size: 0.875em !important }

  .title-linked {
    font-size: $fontSize !important;
    background: transparent !important;
    box-shadow: none !important;
    border-radius: 10px !important;
    height: max-content !important;
    padding: 10px 5px !important;
    margin-inline: -5px;
    * { color: #333 !important }
    span {
      font-size: 1.5625em !important;
      white-space: initial !important;
      text-align: left;
    }
    i { rotate: -45deg }
  }

  .v-card:not(.vertical-toolbar) {
    border-radius: calc(var(--br) - 1px) !important;
    height: 100%;
    padding: 20px;

    span {
      color: #333 !important;
      font-size: var(--fs, 1em) !important;
    }

    .v-card-title { font-size: $fontSize !important }

    .v-card-text { overflow-y: auto !important }

    .card__bottom {
      aside:first-of-type {
        width: 100%;
        max-width: 400px;
      }

      span { font-weight: 500 !important }

      @include media(max, $media) {
        flex-direction: column;
        aside:first-of-type { max-width: 100% }
      }
    }
  }
}


.vertical-toolbar {
  --dif: 20px;
  position: absolute;
  top: calc(var(--h) / 2 - var(--dif));
  left: calc(var(--h) / -2 + var(--dif));
  transform: rotate(-90deg);
  width: var(--h);
  height: var(--w-toolbar);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 20px;
  border-radius: calc(var(--br) - 2px) !important;
  background-color: #ED6D05;
}
</style>
