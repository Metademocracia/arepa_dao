<template>
  <div id="create-dao">
    <toolbar-search />

    <section id="create-dao__content" class="mt-10">
      <sticky-drawer icon-distance="-50px">
        <template #mobile-icon>
          <v-icon>mdi-form-dropdown</v-icon>
        </template>

        <h5>Crear nueva DAO</h5>

        <ul class="steps">
          <li
            v-for="(item, i) in steps"
            :key="i"
            :class="{ active: i <= windowStep }"
          >{{ item }}</li>
        </ul>
      </sticky-drawer>


      <v-window v-model="windowStep">
        <!-- STEP 1 -->
        <v-window-item :value="0">
          <form-card
            v-model="formulario"
            :window-step="windowStep"
            :steps="steps"
            required
            title="Nombre y Propósito de DAO"
            @next="formValid => {
              if (!formValid) return
              windowStep++
            }"
          >
            <label for="name">Nombre del DAO:</label>
            <v-text-field
              v-model="nameDao"
              id="name"
              placeholder="Nombre del DAO"
              variant="solo"
              class="mb-1"
              :rules="[globalRules.required, value => value.length <= 30 || 'Max 30 caracteres',]"
              maxlength="30"
              counter
              @change="funAddress()"
            />

            <label for="address">Dirección DAO (auto llenado):</label>
            <v-text-field
              id="address"
              v-model="addressDao"
              variant="solo"
              class="mb-1"
              readOnly
            />

            <label for="proposal-dao">Propósito</label>
            <v-textarea
              v-model="formItems.purpose"
              id="proposal-dao"
              placeholder="Propósito"
              variant="solo"
              class="mb-1"
              counter="200"
              :rules="[globalRules.required, v => v.length <= 200 || 'Max 200 characters']"
            />

            <label for="type-dao">Tipo dao</label>
            <v-select
              v-model="selectTypeDao"
              id="type-dao"
              :items="typesDao"
              item-title="desc"
              item-value="value"
              variant="solo"
              placeholder="Seleccione un grupo"
              :rules="[(v) => !!v || 'Seleccione un tipo']"
              required
            ></v-select>

          </form-card>
        </v-window-item>


        <!-- STEP 2 -->
        <v-window-item :value="1">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            title="KYC (Opcional)"
            @prev="windowStep--"
            @next="windowStep++"
          >
            <label for="legacy-state">Explique el estado legal y la jurisdicción de su DAO ( si se conoce) :</label>
            <v-text-field
              v-model="formItems.legacyState"
              id="legacy-state"
              placeholder="Estado legal del DAO"
              variant="solo"
              class="mb-1"
            />

            <label for="proposal-kyc">Documento Legal</label>
            <!--<v-text-field
              v-model="formItems.proposalKyc"
              id="proposal-kyc"
              placeholder="https://Documento_Legal"
              variant="solo"
              class="mb-1"
            />-->

            <v-text-field
              v-for="(item, i) in daoProposalKyc"
              v-model="item.model"
              :key="i"
              placeholder="https://Documento_Legal"
              class="appened"
              variant="solo"
            >
              <template #append-inner>
                <v-btn
                  min-width="70"
                  height="42"
                  :color="i == daoProposalKyc.length - 1 &&  daoProposalKyc.length <= 2 ? '#61C2D5' : '#505050'"
                  style="border-radius: 8px !important;"
                  @click="() => {
                    if (i == daoProposalKyc.length - 1 &&  daoProposalKyc.length <= 2) return daoProposalKyc.push({ model: undefined })
                    daoProposalKyc.splice(i, 1)
                  }"
                >
                  <v-icon :icon="i == daoProposalKyc.length - 1 &&  daoProposalKyc.length <= 2 ? 'mdi-plus' : 'mdi-minus'" size="25" class="text-white" />
                </v-btn>
              </template>
            </v-text-field>



          </form-card>
        </v-window-item>


        <!-- STEP 3 -->
        <v-window-item :value="2">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            title="Enlaces y redes sociales (Opcional)"
            @prev="windowStep--"
            @next="windowStep++"
          >
            <p class="mb-8">¿Buscas hacer crecer a los miembros de DAO? Agregue enlaces para permitir que las personas aprendan más sobre su DAO. :</p>

            <v-text-field
              v-for="(item, i) in daoLinks"
              v-model="item.model"
              :key="i"
              placeholder="https://"
              class="appened"
              variant="solo"
            >
              <template #append-inner>
                <v-btn
                  min-width="70"
                  height="42"
                  :color="i == daoLinks.length - 1 && daoLinks.length <= 2 ? '#61C2D5' : '#505050'"
                  style="border-radius: 8px !important;"
                  @click="() => {
                    if (i == daoLinks.length - 1 && daoLinks.length <= 2) return daoLinks.push({ model: undefined })
                    daoLinks.splice(i, 1)
                  }"
                >
                  <v-icon :icon="i == daoLinks.length - 1 && daoLinks.length <= 2 ? 'mdi-plus' : 'mdi-minus'" size="25" class="text-white" />
                </v-btn>
              </template>
            </v-text-field>
          </form-card>
        </v-window-item>


        <!-- STEP 4 -->
        <v-window-item :value="3">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            title="Agregar grupos <span style='font-size: 13px'>(Agregue más grupos a su DAO)</span>"
            @prev="windowStep--"
            @next="windowStep++"
          >
            <label style="color: #333 !important;">Grupos predeterminados</label>
            <span class="d-block mb-3" style="color: #939393 !important;">No puedes eliminarlos</span>
            <v-text-field
              :value="groupAllDefault"
              :placeholder="groupAllDefault"
              variant="solo"
              class="mb-1"
              readOnly
            />
            <!--<v-text-field
              v-model="groupCouncil"
              :placeholder="groupCouncil"
              variant="solo"
              class="mb-1"
              :rules=[globalRules.required]
              @change="() => { item.type = groupCouncil }"
            />-->

            <v-select
              v-model="groupCouncil"
              :items="groupsDefaults"
              variant="solo"
              placeholder="Seleccione un grupo"
              :rules="[(v) => !!v || 'Seleccione un grupo predeterminado', v => validUniqueGroup(v) || 'No puede repetir el nombre de grupo']"
              required
            ></v-select>

            <p class="d-block mb-3">Grupos personalizados</p>

            <v-row v-for="(item, i) in customGroups" :key="i">
              <v-col cols="4">
                <v-select
                v-model="item.model"
                :items="groupsDefaults"
                variant="solo"
                placeholder="Seleccione un grupo"
                :rules="[v => validUniqueGroup(v) || 'No puede repetir el nombre de grupo']"
                @update:model-value="chargeCouncil()"
                ></v-select>
            </v-col>
             <v-col cols="8">
                <v-text-field
                  v-model="item.model"
                  :key="i"
                  placeholder="Nombre del grupo"
                  class="appened"
                  variant="solo"
                  :rules="[v => validUniqueGroup(v) || 'No puede repetir el nombre de grupo']"
                  @update:model-value="chargeCouncil()"
                >
                  <template #append-inner>
                    <v-btn
                      min-width="70"
                      height="42"
                      :color="i == customGroups.length - 1 ? '#61C2D5' : '#505050'"
                      style="border-radius: 8px !important;"
                      @click="() => {
                        if (i == customGroups.length - 1) return customGroups.push({ model: undefined })
                        customGroups.splice(i, 1)
                      }"
                    >
                      <v-icon :icon="i == customGroups.length - 1 ? 'mdi-plus' : 'mdi-minus'" size="25" class="text-white" />
                    </v-btn>
                  </template>
                </v-text-field>
            </v-col>
          </v-row>
          </form-card>
        </v-window-item>


        <!-- STEP 5 -->
        <v-window-item :value="4">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            title="Agregar Miembros (Opcional)"
            @prev="windowStep--"
            @next="() => {getData(); windowStep++}"
          >
            <p class="d-block mb-3">Agregue miembros a su DAO.</p>

            <div style="gap: 20px; display: grid; grid-template-columns: repeat(2, 1fr);">
              <v-text-field
                :value="addressUser"
                variant="solo"
                readonly
              />

              <!--<v-select
                v-model="groupCouncil"
                :items="getGroups([groupCouncil])"
                variant="solo"
                placeholder="Sleccione un grupo"
                readonly
              ></v-select>-->

              <v-text-field
                :value="groupCouncil"
                variant="solo"
                readonly
              />

              <template v-for="(item, i) in daoMembers" :key="i">
                <v-text-field
                  v-model="item.member"
                  placeholder="ap6ay7auhan6a78ahah8gfcvbay77a9a0han5"
                  variant="solo"
                  :error-messages="item.memberErrror"
                  :success-messages="item.memberSuccess"
                  @keyup="validMember(item)"
                  @change="validMember(item)"
                />

                <v-select
                  v-if="item.member"
                  v-model="item.type"
                  :items="getGroups([groupCouncil])"
                  variant="solo"
                  placeholder="Seleccione un grupo"
                  :rules="[(v) => !!v || 'Seleccione un grupo']"
                  required
                >
                  <template #append>
                    <v-btn
                      min-width="70"
                      height="42"
                      :color="i == daoMembers.length - 1 && i <= 7 ? '#61C2D5' : '#505050'"
                      style="border-radius: 8px !important;"
                      @click="() => {
                        if (i == daoMembers.length - 1 && i <= 7) return daoMembers.push({  member: undefined, type: undefined, memberErrror: undefined, memberSuccess: undefined })
                        daoMembers.splice(i, 1)
                      }"
                    >
                      <v-icon :icon="i == daoMembers.length - 1  && i <= 7 ? 'mdi-plus' : 'mdi-minus'" size="25" class="text-white" />
                    </v-btn>
                  </template>
                </v-select>
              </template>
            </div>
          </form-card>
        </v-window-item>


        <!-- STEP 6 -->
        <v-window-item :value="5">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            title="Creación de propuestas"
            @prev="windowStep--"
            @next="windowStep++"
          >
            <p class="d-block mb-10">Elija qué derechos de creación le otorga a los grupos DAO. Esto se puede cambiar en la configuración más adelante</p>

            <table-rights :headers="headerRights" :items="proposals">

            </table-rights>
          </form-card>
        </v-window-item>


        <!-- STEP 7 -->
        <v-window-item :value="6">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            title="Permisos de voto"
            @prev="windowStep--"
            @next="windowStep++"
          >
            <p class="d-block mb-10">Elija qué derechos de voto le otorga a los grupos DAO</p>

            <table-rights :headers="headerRights" :items="permissions" />
          </form-card>
        </v-window-item>


        <!-- STEP 8 -->
        <v-window-item :value="7">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            :disabledBtn="loadingBtn"
            :loadingBtn="loadingBtn"
            title="Crear activos DAO"
            next-text="Crear Budare"
            @prev="windowStep--"
            @next="createDao"
          >
            <p class="d-block mb-6">Coloca el logo de tu DAO es opcional. Si omite, se utilizará la imagen predeterminada</p>

            <div class="flex-column-center mx-auto" style="gap: 20px;">
              <v-file-input
                id="fileRef"
                ref="fileRef"
                v-model="imgDao"
                type="file"
                accept="image/*"
                class="d-none"
                @change="handleLoadFile"
              ></v-file-input>
              <v-img-load
                :src="daoLogoPreview"
                width="110"
                height="110"
                rounded="100"
                border="3px solid rgb(var(--v-theme-primary))"
                stop-loading
                cover
              />
              <v-btn class="bg-tertiary" @click="fileRef.click()">
                Subir Logo
                <v-icon icon="mdi-chevron-right" />
              </v-btn>
            </div>

            <v-divider thickness="1" class="mt-10 mb-5" color="#939393" style="opacity: 1;" />

            <aside class="flex-space-center flex-wrap" style="gap: 20px; --value-fs: 17px">
              <div class="flex-column" style="gap: 5px;">
                <label>Transacción</label>
                <span style="font-size: var(--value-fs) !important;">Crear Nuevo DAO</span>
              </div>

              <div class="flex-center text-end ml-auto" style="gap: 20px;">
                <div class="flex-column" style="gap: 5px;">
                  <label>Costo</label>
                  <span style="font-size: var(--value-fs) !important;">{{ contractCostNear }} NEAR</span>
                </div>

                <div class="flex-column" style="gap: 5px;">
                  <label>TGas</label>
                  <span style="font-size: var(--value-fs) !important;">150</span>
                </div>
              </div>
            </aside>
          </form-card>
        </v-window-item>
      </v-window>
    </section>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/create-dao.scss'
import FormCard from '@/components/form-card.vue'
import TableRights from '@/components/table-rights.vue'
import variables from '@/mixins/variables';
import { getUrlFromFile } from '@/plugins/functions';
import { onBeforeMount } from 'vue';
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import WalletP2p from '../services/wallet-p2p';
import * as nearAPI from "near-api-js";
const { utils, Account, NearUtils, KeyPair, keyStores, Near, connect, transactions } = nearAPI;
import {configNear} from '../services/nearConfig';

const
  toast = useToast(),
  { globalRules, groupsDefaults, groupAllDefault, groupDefault, proposalKind, typesDao, typesDaoDefault } = variables,
  router = useRouter(),
  route = useRoute(),

windowStep = ref(0),
steps = [
  "Nombre y Propósito",
  "KYC",
  "Enlaces y Redes",
  "Agregar Grupos",
  "Agregar Miembros",
  "Creación de Propuesta",
  "Permisos de Votación",
  "Create DAO Assets"
],
daoProposalKyc = ref([ { model: undefined } ]),
daoLinks = ref([ { model: undefined } ]),
customGroups = ref([ { model: undefined } ]),
daoMembers = ref([ { member: undefined, type: undefined, memberErrror: undefined, memberSuccess: undefined } ]),
proposals = ref([]),
permissions = ref([]),
rights = ref([
  { name: "Cambiar configuración de DAO", key: proposalKind.find((item) => item.key == "ChangeConfig")?.value},
  { name: "Cambiar la política de DAO", key: proposalKind.find((item) => item.key == "ChangePolicy")?.value},
  // { name: "Recompensa", key: ""},
  { name: "Transferencia", key: proposalKind.find((item) => item.key == "Transfer")?.value},
  // { name: "Encuestas", key: "Vote"},
  { name: "Votación", key: proposalKind.find((item) => item.key == "Vote")?.value},
  { name: "Eliminar miembros", key: proposalKind.find((item) => item.key == "RemoveMemberFromRole")?.value},
  { name: "Agregar miembros", key: proposalKind.find((item) => item.key == "AddMemberToRole")?.value},
  { name: "Llamada de función", key: proposalKind.find((item) => item.key == "FunctionCall")?.value},
  /* { name: "Actualizar auto", key: ""},
  { name: "Actualizar remoto", key: ""},
  { name: "Establecer token de voto", key: ""}, */
]),
headerRights = ref([]),
fileRef = ref(),
daoLogoPreview = ref(null),
formulario = ref(undefined),
formItems = ref({}),
imgDao = ref(null),
nameDao = ref(null),
addressDao = ref(process.env.CONTRACT_FACTORY),
feeMetadao = ref(null),
costDeploy = ref("8000000000000000000000000"),
contractCost = ref(""),
contractCostNear = ref(""),
loadingBtn = ref(false),
groupCouncil = ref(groupDefault),
addressUser = ref(null), // WalletP2p.getAccou nt().address,
selectTypeDao = ref(typesDaoDefault.value)

watch(nameDao, async (newName, oldName) => {
  if(newName){
    nameDao.value = newName.replace(" ", "-").replace(/[^a-z-0-9]/,'')
  }
})

/* watch(groupCouncil, (newVal) => {
  customGroups.value.forEach(item => {
    item.model = newVal;
  });
}); */


//this.value.replace(/[^a-zA-Z0-9]/,'')"
onBeforeMount(getAddress)
onBeforeMount(getFee)

/*function chargeCouncil() {
  console.log("aqui paso")
  groupCouncil.value = customGroups.value[0].model;
}*/
async function getAddress() {
  const account_id = await WalletP2p.getAccountId();
  addressUser.value = account_id;
}

function validUniqueGroup(item) {
  if(!item || !groupCouncil.value) return true

  const array = [].concat((!customGroups.value[0].model ? [] : customGroups.value))
  array.push({model: groupAllDefault})
  array.push({model: groupCouncil.value})

  return !(array.filter((elem) => elem.model.toUpperCase() == item.toUpperCase()).length > 1)
}

async function validMember(item) {
  //item.memberErrror = "wallet no valida"

  //item.memberSuccess = "wallet no valida"

  const keyStore = new keyStores.InMemoryKeyStore()
  const near = new Near(configNear(keyStore))
  const account = new Account(near.connection, item.member)

  await account.state()
    .then(() => {
      item.memberErrror = null
      item.memberSuccess = "Wallet válido"
    }).catch(() => {
      item.memberSuccess = null
      item.memberErrror = "Wallet no válida"
    })
}

async function getFee() {
  const response = await WalletP2p.view({
    contractId: process.env.CONTRACT_FACTORY,
    methodName: "get_fee_metadao",
  });

  feeMetadao.value = response
  contractCost.value = (BigInt(response) + BigInt(costDeploy.value)).toString()
  contractCostNear.value = (BigInt(contractCost.value) / BigInt("1000000000000000000000000")).toString()

}

function getGroups(groups=[groupAllDefault, groupCouncil.value]) {
  for(let i = 0; i< customGroups.value.length; i++) {
    if(customGroups.value[i].model) {
      if(customGroups.value[i].model.trim() !== '') {
        groups.push(customGroups.value[i].model.trim());
      }
    }

  }

  return groups
}

function getData() {
  if(proposals.value.length > 0) return

  const groups = getGroups()

  const header = [
    { key: 'name', sortable: false },
  ];

  for(let i=0; i<groups.length; i++){
    header.push({ key: groups[i], title: groups[i], align: 'center', sortable: false })
  }

  headerRights.value = header;


  const rights3 = [];

  const rights4 = [];

  for(const items of rights.value){
    rights3.push({
      name: items.name,
      key: items.key,
      group: groups.map((item) => {
        return {
          name: item, value: item === groupCouncil.value
        }
      }),
    });

    rights4.push({
      name: items.name,
      key: items.key,
      group: groups.map((item) => {
        return {
          name: item, value: item === groupCouncil.value
        }
      }),
    });
  }

  proposals.value = rights3;
  permissions.value = rights4;
}

function handleLoadFile(event) {
  // this is the file provided
  const file = event.target.files[0]
  daoLogoPreview.value = getUrlFromFile(file)
}

function funAddress() {
  const address = process.env.CONTRACT_FACTORY;
  if(nameDao.value) {
    addressDao.value = nameDao.value.replace(" ", "-") + '.' + address;
  } else {
    addressDao.value = address
  }

}

async function uploadImgIpfs() {
  if(!imgDao._rawValue) return true
  // console.log("file print 1 ", imgDao._rawValue[0])
  /* const resp = await axios.post('https://api.nft.storage/upload', imgDao._rawValue[0], {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'image/*',
      Authorization: 'Bearer ' + process.env.KEY_IPFS, // Reemplaza con tu clave de API de nft.storage
    },
    maxContentLength: 100 * 1024 * 1024, // Tamaño máximo de la respuesta en bytes (100MB)
    maxBodyLength: 100 * 1024 * 1024, // Tamaño máximo del cuerpo de la solicitud en bytes (100MB)
  })

  return {
    hash: resp.data.value.cid,
    url: "https://"+resp.data.value.cid+".ipfs.nftstorage.link/"
  }; */

  const formData = new FormData();
  formData.append('imgDao', imgDao._rawValue[0]);

  const resp = await axios.post(`${process.env.VITE_ROUTER_API_UPLOAD_IMG}/upload`, formData)
  .catch((error) => {
    console.log("error: ", error)
  })

  if(!resp?.data?.imgDao) return null
  if(!resp?.data?.imgDao.length > 0) return null
  if(!resp?.data?.imgDao[0]?.location) return null

  // console.log("resp: ", resp.data.imgDao[0].location)
  // console.log("resp2: ", resp)

  return {
    url: resp.data.imgDao[0].location
  }

}

function getRoles(){
  const roles = [];
  for(const group of getGroups()){
    let rol = [];

    // console.log(proposals._rawValue)
    // console.log(proposals.value)



    let countPermision = 0;
    let totalPermision = proposals.value.length;
    for(let index=0; index < proposals.value.length; index++) {
      const proposalKey = proposals.value[index].key;
      const proposal = proposals.value[index].group.filter((search) => search.name == group )
      const action = permissions.value[index].group.filter((search) => search.name == group)

      if(proposal.length <= 0 || action.length <= 0) continue

      if(proposal[0].value && action[0].value) {
        rol.push(proposalKey+":*")
        countPermision +=1;
      } else if(!proposal[0].value && action[0].value) {
        rol.push(proposalKey+":VoteApprove")
        rol.push(proposalKey+":VoteReject")
        rol.push(proposalKey+":VoteRemove")
      } else if(proposal[0].value && !action[0].value) {
        rol.push(proposalKey+":AddProposal")
      }
    }

    if(totalPermision == countPermision && rol.length > 0) {
      rol = ["*:*"]
    }

    if(group == groupAllDefault) {
      roles.push({
        name: groupAllDefault,
        permissions: rol,
        kind: "Everyone",
        vote_policy: {}
      })
    } else {
      const members = daoMembers.value.filter((search) => search.type == group).map((data) => {return data.member})
      roles.push({
        name: group,
        kind: {
            Group: group == groupCouncil.value ? [addressUser.value].concat(members) : members
        },
        permissions: rol,
        vote_policy: {}
      })
    }

    //console.log("members: ", daoMembers.value.filter((search) => search.type == group).map((data) => {return data.member}))
  }

  return roles
}


async function createDao(formValid) {
  if (!formValid) return

  loadingBtn.value = true;

  let img = undefined;
  if(imgDao._rawValue) {
    const resulIpfs = await uploadImgIpfs()
    if(!resulIpfs) {
      toast('¡Error al subir la imagen!')
      loadingBtn.value = false;
      return
    }
    img = resulIpfs?.url;
  }


  const social = [];
  for(let i = 0; i< daoLinks._rawValue.length; i++) {
    if(daoLinks._rawValue[i].model) {
      if(daoLinks._rawValue[i].model.trim() !== '') {
        social.push(daoLinks._rawValue[i].model.trim());
      }
    }
  }

  const documentsKyc = [];
  for(let i = 0; i< daoProposalKyc._rawValue.length; i++) {
    if(daoProposalKyc._rawValue[i].model) {
      if(daoProposalKyc._rawValue[i].model.trim() !== '') {
        social.push(daoProposalKyc._rawValue[i].model.trim());
      }
    }
  }

  const isPrivated = selectTypeDao.value == "0" ? false : true;
  const metadata = btoa(JSON.stringify({
    kyc: {
      legacyState: !formItems.legacyState ? null : formItems.legacyState,
      //proposalKyc: !formItems.proposalKyc ? null : formItems.proposalKyc
      documentsKyc: documentsKyc
    },
    social: social.length > 0 ? social  : null,
    img: img ? img : null,
    isPrivated
  }));


  const objectJson = {
    contractId: process.env.CONTRACT_FACTORY,
    methodName: "create",
    args: {
      name: nameDao.value,
      args: btoa(JSON.stringify({
        config: {name: nameDao.value, purpose: `${btoa(formItems._rawValue.purpose)}|${JSON.stringify({isPrivated})}` , metadata: metadata},
        //policy: [WalletP2p.getAc count().address, "prueba1.testnet", "prueba2.testnet", "hrpalencia.testnet"],
        policy: {
            roles: getRoles(),
            default_vote_policy: {
                weight_kind: "RoleWeight",
                quorum: "0",
                threshold: [1,2]
            },
            proposal_bond: "100000000000000000000000",
            proposal_period: "604800000000000",
            bounty_bond: "100000000000000000000000",
            bounty_forgiveness_period: "604800000000000"
        },
      })),
    },
    gas: "300000000000000",
    attachedDeposit: contractCost.value, //"10000000000000000000000000",
  };

 // 21b85007de8967c3ec3dd51060bef1a31f5f7d5cd1da82c5765c1966f286ecd7
  /* console.log("json: ", objectJson)
  console.log("json: ", JSON.parse(atob(objectJson.args.args)))
  console.log("json: ", JSON.parse(atob(metadata))) */
  // console.log("json: ", objectJson)
  loadingBtn.value = false;
  WalletP2p.call(objectJson, "daos")

  // toast('¡Felicidades la DAO ha sido creada\n con éxito!')



}
</script>
