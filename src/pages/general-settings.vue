<template>
  <div id="general-settings" class="mt-4">
    <!-- editable -->
    <form-card-editable
      v-if="tabs[0].editing"
      :proposal="'Cambiar configuración de DAO'"
      required
      @completed="onCompleted"
      @close="tabs[0].editing = false"
    >
      <label for="proponent">Proponente</label>
      <v-text-field
        v-model="address"
        id="proponent"
        variant="solo"
        placeholder="andresdom.near"
        readonly
      />

      <label for="reasonName">Motivo del cambio</label>
      <v-textarea
        ref="reasonName"
        id="reasonName"
        variant="solo"
        placeholder="Motivo del cambio"
        :rules="[globalRules.required]"
      />

      <label for="linkName">Link</label>
      <v-text-field
        ref="linkName"
        id="linkName"
        variant="solo"
        placeholder="Link_de_prueba.com"
      />

      <label for="nameDao">Nombre</label>
      <v-text-field
        v-model="nameDao"
        id="nameDao"
        variant="solo"
        placeholder="Nombre"
        :rules="[globalRules.required]"
      />

      <label for="_purposeDao">Propósito</label>
      <v-textarea
        v-model="purposeDao"
        id="_purposeDao"
        variant="solo"
        placeholder="Propósito"
        :rules="[globalRules.required]"
      />

      <label for="type-dao">Tipo dao</label>
      <v-select
        v-model="selectTypeDao"
        id="type-dao"
        :items="typesDao"
        item-title="desc"
        item-value="value"
        variant="solo"
        placeholder="Seleccione un tipo"
        :rules="[(v) => !!v || 'Seleccione un tipo']"
        required
      ></v-select>

    </form-card-editable>

    <form-card-editable
      v-if="tabs[1].editing"
      :proposal="'Cambiar configuración de DAO'"
      required
      @completed="onCompleted"
      @close="tabs[1].editing = false"
    >
      <label for="proponent">Proponente</label>
      <v-text-field
        v-model="address"
        id="proponent"
        variant="solo"
        placeholder="andresdom.near"
        readonly
      />

      <label for="reasonState">Motivo del cambio</label>
      <v-textarea
        ref="reasonState"
        id="reasonState"
        variant="solo"
        placeholder="Motivo del cambio"
        :rules="[globalRules.required]"
      />

      <label for="linkState">Link</label>
      <v-text-field
        ref="linkState"
        id="linkState"
        variant="solo"
        placeholder="Link_de_prueba.com"
      />

      <label for="legacy-state">Explique el estado legal y la jurisdicción de su DAO ( si se conoce) :</label>
      <v-text-field
        ref="legacy-state"
        id="legacy-state"
        placeholder="Estado legal del DAO"
        variant="solo"
        class="mb-1"
        :rules="[globalRules.required]"
      />

      <!--<label for="proposal-kyc">Propósito</label>
      <v-text-field
        ref="proposal-kyc"
        id="proposal-kyc"
        placeholder="https:// Documento_Legal"
        variant="solo"
        class="mb-1"
        :rules="[globalRules.required]"
      />-->

      <label for="proposal-kyc">Documento Legal</label>
      <v-text-field
        v-for="(item, i) in daoProposalKyc"
        v-model="item.model"
        :key="i"
        placeholder="https://Documento_Legal"
        class="appened"
        variant="solo"
        :rules="[globalRules.required]"
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

    </form-card-editable>


    <form-card-editable
      v-if="tabs[2].editing"
      :proposal="'Cambiar configuración de DAO'"
      required
      @completed="onCompleted"
      @close="tabs[2].editing = false"
    >

      <label for="proponent">Proponente</label>
      <v-text-field
        v-model="address"
        id="proponent"
        variant="solo"
        placeholder="andresdom.near"
        readonly
      />

      <label for="reasonSocial">Motivo del cambio</label>
      <v-textarea
        ref="reasonSocial"
        id="reasonSocial"
        variant="solo"
        placeholder="Motivo del cambio"
        :rules="[globalRules.required]"
      />

      <label for="linkSocial">Link</label>
      <v-text-field
        ref="linkSocial"
        id="linkSocial"
        variant="solo"
        placeholder="Link_de_prueba.com"
      />

      <p class="mb-8">Indique los nuevos links para las redes sociales:</p>

      <v-text-field
        v-for="(item, i) in daoLinks"
        v-model="item.model"
        :key="i"
        placeholder="https://"
        class="appened"
        variant="solo"
        :rules="[globalRules.required]"
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
    </form-card-editable>


    <form-card-editable
      v-else-if="tabs[3].editing"
      :proposal="'Cambiar configuración de DAO'"
      required
      @completed="onCompleted"
      @close="tabs[3].editing = false"
    >
      <label for="proponent">Proponente</label>
      <v-text-field
        v-model="address"
        id="proponent"
        variant="solo"
        placeholder="andresdom.near"
        readonly
      />

      <label for="reasonLogo">Motivo del cambio</label>
      <v-textarea
        ref="reasonLogo"
        id="reasonLogo"
        variant="solo"
        placeholder="Motivo del cambio"
        :rules="[globalRules.required]"
      />

      <label for="linkLogo">Link</label>
      <v-text-field
        ref="linkLogo"
        id="linkLogo"
        variant="solo"
        placeholder="Link_de_prueba.com"
      />

      <div class="flex-column-center mr-auto" style="gap: 20px; max-width: max-content;">
        <v-file-input
          id="fileRef"
          ref="fileRef"
          v-model="logoUpload"
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
          Subir Nuevo Logo
          <v-icon icon="mdi-chevron-right" />
        </v-btn>
      </div>
    </form-card-editable>


    <v-divider v-if="tabs.some(e => e.editing)" thickness="1" class="my-10" />


    <!-- content -->
    <section id="general-settings__content">
      <sticky-drawer>
        <h5>DAO Settings</h5>

        <h6 style="font-size: 15px;">Configuraciones</h6>

        <v-tabs
          v-model="tab"
          direction="vertical"
          align-tabs="start"
          density="compact"
          slider-color="rgb(var(--v-theme-primary))"
          class="tabs"
        >
          <v-tab
            v-for="(item, i) in tabs"
            :disabled="item.disabled"
            :key="i"
          >{{ item.name }}</v-tab>
        </v-tabs>
      </sticky-drawer>


      <!-- Name and proposal about DAO -->
      <form-card
        v-if="tab === 0"
        title="Nombre y propósito de DAO"
        class="w-100"
      >
        <template #append-title>
          <v-btn
            v-if="!tabs[0].editing"
            class="bg-secondary"
            @click="tabs[0].editing = !tabs[0].editing"
          >
            Proponer cambio
            <v-icon icon="mdi-chevron-right" />
          </v-btn>
        </template>


        <label>Nombre del DAO:</label>
        <p class="mt-1" style="font-size: 16px !important;">{{ dataDao?.name }}</p>

        <label>Dirección DAO:</label>
        <p class="mt-1">{{ walletDao }}</p>

        <label>Propósito:</label>
        <p class="mt-1">{{ dataDao?.purpose }}</p>

        <label>Tipo dao:</label>
        <p class="mt-1 mb-0">{{ !dataDao?.typeDao ? "Publico" : dataDao?.typeDao }}</p>
      </form-card>


      <!-- Legal state and doc -->
      <form-card
        v-if="tab === 1"
        title="Estado Legal y doc"
        class="w-100"
      >
        <template #append-title>
          <v-btn
            v-if="!tabs[1].editing"
            class="bg-secondary"
            @click="tabs[1].editing = !tabs[1].editing"
          >
            Proponer cambio
            <v-icon icon="mdi-chevron-right" />
          </v-btn>
        </template>

          <label>Estado legal y jurisdicción del DAO:</label>
          <p class="mt-1" style="font-size: 16px !important;">{{ !metadataDao?.kyc?.legacyState ? "No cuenta con un estado legal" : metadataDao?.kyc?.legacyState }}</p>

          <label>Documento Legal:</label>
          <p v-if="!metadataDao?.kyc?.proposalKyc && !metadataDao?.kyc?.documentsKyc" class="mt-1" style="font-size: 16px !important;">No cuenta con un documento legal</p>

          <p v-if="metadataDao?.kyc?.proposalKyc" class="mt-1" style="font-size: 16px !important;">{{ metadataDao?.kyc?.proposalKyc }}</p>

          <span v-if="metadataDao?.kyc?.documentsKyc">
            <p v-if="metadataDao?.kyc?.documentsKyc.length <= 0" class="mt-1" style="font-size: 16px !important;">No cuenta con un documento legal</p>
            <p v-for="(item, i) in metadataDao?.kyc?.documentsKyc" :key="i" class="mt-1" style="font-size: 16px !important;">{{ item }}</p>
          </span>

          <!--<v-btn variant="text" class="pa-0">
            <span style="color: #333 !important;">Documento Legal</span>

          <sup class="ml-1">
            <v-btn icon color="rgba(var(--v-theme-primary))" size="15" >
              <v-icon icon="mdi-open-in-new" size="10" />
            </v-btn>
          </sup>
        </v-btn>-->
      </form-card>


      <!-- Links -->
      <form-card
        v-if="tab === 2"
        title="Enlaces"
        class="w-100"
        content-class="flex-column"
      >
        <template #append-title>
          <v-btn
            v-if="!tabs[2].editing"
            class="bg-secondary"
            @click="tabs[2].editing = !tabs[2].editing"
          >
            Proponer cambio
            <v-icon icon="mdi-chevron-right" />
          </v-btn>
        </template>


        <v-btn
          v-for="(item, i) in links"
          :key="i"
          variant="text"
          width="max-content"
          height="30"
          class="pa-0"
          :href="item.href"
          target="_blank"
        >
          <v-icon icon="mdi-link" class="text-primary" style="rotate: -45deg;" />
          <span class="text-primary">{{ item.text }}</span>
        </v-btn>
      </form-card>



      <!-- Logo -->
      <form-card
        v-if="tab === 3"
        title="Logo"
        class="w-100"
        content-class="flex-column-center pt-5"
      >
        <template #append-title>
          <v-btn
            v-if="!tabs[3].editing"
            class="bg-secondary"
            @click="tabs[3].editing = !tabs[3].editing"
          >
            Proponer cambio
            <v-icon icon="mdi-chevron-right" />
          </v-btn>
        </template>


        <v-img-load
          :src="daoLogo"
          width="110"
          height="110"
          rounded="100"
          border="3px solid rgb(var(--v-theme-primary))"
          stop-loading
          cover
        />
        <span class="mb-0 mt-4" style="color: #333 !important;">Logo actual del DAO</span>
      </form-card>
    </section>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/general-settings.scss'
import FormCard from '@/components/form-card.vue'
import FormCardEditable from '@/components/form-card-editable.vue'
import MetademocraciaImage from '@/assets/sources/images/metademocracia-image.png'
import { ref, watch, onBeforeMount } from 'vue';
import { useToast } from 'vue-toastification';
import variables from '@/mixins/variables';
import { getUrlFromFile } from '@/plugins/functions';
import WalletP2p from '../services/wallet-p2p';
import axios from 'axios';
//import { Link } from '@inertiajs/inertia-vue3';

const
  toast = useToast(),
  { globalRules, typesDao, typesDaoDefault } = variables,

address = ref(null), // WalletP2p.getAcc ount().address,
tab = ref(0),
tabs = ref([
  {
    name: "Nombre y Propósito",
    editing: false
  },
  {
    name: "Estado Legal y Doc",
    editing: false
  },
  {
    name: "Enlaces",
    editing: false
  },
  {
    name: "Logo",
    editing: false
  },
  /* {
    name: "Nombres de grupo",
    editing: false,
    disabled: true
  } */
]),
links = ref([]),
daoLinks = ref([ { model: undefined } ]),
fileRef = ref(),
logoUpload = ref(null),
daoLogoPreview = ref(null),
daoLogo = ref(null),
walletDao = ref(null),
metadataDao = ref(null),
dataConfig = ref(null),
dataDao = ref(null),
nameDao = ref(null),
purposeDao = ref(null),
daoProposalKyc = ref([ { model: undefined } ]),
selectTypeDao = ref(typesDaoDefault.value)

watch(tab, clearEditing)
watch(nameDao, async (newName, oldName) => {
  if(newName){
    nameDao.value = newName.replace(" ", "-").replace(/[^a-z-0-9]/,'')
  }
})
/*watch([nameDao, tap], async ([newName, oldName], [tapNew, tapOld]) => {
    tabs.value.forEach(e => e.editing = false)

  if(newName){
    nameDao.value = newName.replace(" ", "-").replace(/[^a-z-0-9]/,'')
  }
})*/

onBeforeMount(getData)

async function getData() {
  const accounId = await WalletP2p.getAccountId();
  address.value = accounId;

  if(!accounId) return


  const valores = window.location.search;
  const urlParams = new URLSearchParams(valores);
  walletDao.value = urlParams.get('dao');

  //console.log(walletDao.value)
  const responseConfig = await WalletP2p.view({
    contractId: walletDao.value,
    methodName: "get_config"
  });

  const metadata = JSON.parse(atob(responseConfig.metadata))
  metadataDao.value = metadata;
  dataConfig.value = responseConfig;
  const purposeData = dataConfig.value?.purpose.split("|");
  let purpose;
  try {

    purpose = window.atob(purposeData.length <= 0 ? purposeData : purposeData[0]);
  } catch (error) {
    purpose = purposeData.length <= 0 ? purposeData : purposeData[0];
  }
  
  dataDao.value = {
    name: dataConfig.value?.name,
    purpose,
    typeDao: !metadataDao.value?.isPrivated ? "Publico" : "Privado",
  }
  links.value = !metadataDao.value?.social ? [] : metadataDao.value.social.map((item) => {return {text: item, href: item}});;
  daoLogo.value = !metadataDao.value?.img ? MetademocraciaImage : metadataDao.value?.img;
  // selectTypeDao.value = !metadataDao.value?.isPrivated ? false : metadataDao.value?.isPrivated;

  //////////////////////////////////////////////////////////////////////////////////////////////

  nameDao.value = dataConfig.value?.name;
  purposeDao.value = purpose;
  selectTypeDao.value = !metadataDao.value?.isPrivated ? "0" : "1";

}

async function uploadImgIpfs() {
  const imgDao = logoUpload.value;

  if(!imgDao) return null

  //console.log("file print 1 ", imgDao)
  const resp = await axios.post('https://api.nft.storage/upload', imgDao[0], {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'image/*',
      Authorization: 'Bearer ' + process.env.KEY_IPFS, // Reemplaza con tu clave de API de nft.storage
    },
    maxContentLength: 100 * 1024 * 1024, // Tamaño máximo de la respuesta en bytes (100MB)
    maxBodyLength: 100 * 1024 * 1024, // Tamaño máximo del cuerpo de la solicitud en bytes (100MB)
  })/* .then((response) => {
    console.log(response);
  }) */

  return {
    hash: resp.data.value.cid,
    url: "https://"+resp.data.value.cid+".ipfs.nftstorage.link/"
  };

}

async function onCompleted({ formValid }) {
  if (!formValid) return

  //console.log('here', tab.value)
  const responsePolicy = await WalletP2p.view({
    contractId: walletDao.value,
    methodName: "get_policy"
  });

  const response = await WalletP2p.view({
    contractId: walletDao.value,
    methodName: "get_fee_metadao",
  });

  const bounty_bond = (BigInt(responsePolicy?.bounty_bond.toString()) + BigInt(response)).toString()

  const bond = bounty_bond;

  if(!bond) return;

  switch (tab.value) {
    // Name and proposal about DAO
    case 0:  {
      const isPrivated = selectTypeDao.value == "0" ? false : true;

      dataConfig.value.name = nameDao.value;
      dataConfig.value.purpose = `${btoa(purposeDao.value)}|${JSON.stringify({isPrivated})}`;

      metadataDao.value.isPrivated = isPrivated;

      const metadata = btoa(JSON.stringify(metadataDao.value));
      dataConfig.value.metadata = metadata


      const link = document.getElementById("linkName").value;
      const title = btoa("Cambio de nombre y propósito del dao");
      const description = btoa(document.getElementById("reasonName").value);

      addProposal(bond, title, description, (!link ? "" : link));
    } break;

     // Estado Legal y Doc
    case 1: {
      metadataDao.value.kyc.legacyState = document.getElementById("legacy-state").value;
      if(metadataDao.value.kyc?.proposalKyc) {
        metadataDao.value.kyc.proposalKyc = undefined
      }

      const documentsKyc = [];
      for(let i = 0; i< daoProposalKyc._rawValue.length; i++) {
        if(daoProposalKyc._rawValue[i].model) {
          if(daoProposalKyc._rawValue[i].model.trim() !== '') {
            social.push(daoProposalKyc._rawValue[i].model.trim());
          }
        }
      }

      metadataDao.value.kyc.documentsKyc = documentsKyc;

      const metadata = btoa(JSON.stringify(metadataDao.value));
      dataConfig.value.metadata = metadata

      const link = document.getElementById("linkState").value;
      const title = btoa("Cambio Estado legal y Documento");
      const description = btoa(document.getElementById("reasonState").value);

      addProposal(bond, title, description, (!link ? "" : link));
    } break;

    // Enlaces
    case 2: {
      const social = [];
      for(let i = 0; i < daoLinks._rawValue.length; i++) {
        if(daoLinks._rawValue[i].model) {
          if(daoLinks._rawValue[i].model.trim() !== '') {
            social.push(daoLinks._rawValue[i].model.trim());
          }
        }
      }

      metadataDao.value.social = social;

      const metadata = btoa(JSON.stringify(metadataDao.value));
      dataConfig.value.metadata = metadata

      const link = document.getElementById("linkSocial").value;
      const title = btoa("Cambio de redes sociales");
      const description = btoa(document.getElementById("reasonSocial").value);

      addProposal(bond, title, description, (!link ? "" : link));
    } break;

    // Logo change
    case 3: {
      const responseIpfs = await uploadImgIpfs();

      metadataDao.value.img = responseIpfs?.url;

      const metadata = btoa(JSON.stringify(metadataDao.value));
      dataConfig.value.metadata = metadata

      const link = document.getElementById("linkLogo").value;
      const title = btoa("Cambio de logo");
      const description = btoa(document.getElementById("reasonLogo").value);

      addProposal(bond, title, description, (!link ? "" : link));
    } break;
  }
}

function addProposal(bounty_bond, title, description, link) {
  const json = {
    contractId: walletDao.value,
    methodName: "add_proposal",
    args: {
      proposal: {
        title: title,
        description: description,
        kind: {
          ChangeConfig: {config: dataConfig._rawValue}
        },
        link: link,
      }
    },
    gas: "200000000000000",
    attachedDeposit: bounty_bond
  };

  WalletP2p.call(json, "proposals", ("?dao="+walletDao.value));

  // clearEditing();
}

function handleLoadFile(event) {
  // this is the file provided
  const file = event.target.files[0]
  daoLogoPreview.value = getUrlFromFile(file)
}

function clearEditing() {
  tabs.value.forEach(e => e.editing = false)
}
</script>
