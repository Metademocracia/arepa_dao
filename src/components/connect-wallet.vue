<template>
  <span v-show="false">{{ validSession() }}</span>
  <aside>
    <center><v-btn class="btn" @click="openDialog()">{{ session }}</v-btn></center>
  </aside>

  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="auto"
      content-class="dialog-dao"
    >
      <v-card>
        <v-card-title class="text-h5">
          Estás saliendo de METADEMOCRACIA
        </v-card-title>
        <v-card-text>Luego de crear tu wallet o conectar una ya existente puedes volver a esta página para vincularla a tu perfil.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            class="btn"
            @click="dialog = false"
          >
            Negar
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            class="btn"
            @click="login('near')"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConnect" persistent content-class="dialog-connect">
      <v-card class="card-dialog">
        <div class="div-card">
          <v-icon @click="dialogConnect = false, obtenWallet = false" style="cursor: pointer;position: absolute; top: 10px; right: 10px;">mdi-close</v-icon>

          <h5>Cerrar sesión</h5>

          <!--<div class="divrow center wrap mt-8 mb-8" style="gap: 15px;">
            <v-sheet class="sheet-dialog" @click="login('near')">
              <img src="@/assets/sources/icons/near-wallet-icon.svg" alt="Near" style="max-width: 25px;">
              <span>
                NEAR Wallet
              </span>
            </v-sheet>

            <v-sheet class="sheet-dialog" @click="login('near')">
              <img src="@/assets/sources/icons/my-near-wallet-icon.svg" alt="My Near" style="max-width: 25px;">
              <span>
                MyNear Wallet
              </span>
            </v-sheet>

            <v-sheet class="sheet-dialog">
              <img src="@/assets/sources/icons/here-wallet.svg" alt="Here" style="max-width: 25px;">
              <span>
                Here Wallet
              </span>
            </v-sheet>

            <v-sheet class="sheet-dialog" @click="login('near')">
              <img src="@/assets/sources/icons/meteor-wallet-icon.svg" alt="Meteor" style="max-width: 25px;">
              <span>
                Meteor Wallet
              </span>
            </v-sheet>
          </div>

          <hr style="width: 80%; background-color: rgba(255,255,255, 0.6); height: 2px;">-->

          <v-btn class="btn mt-8 mb-8" @click="logout()">Logout</v-btn>

          <!--<template v-if="obtenWallet == true">
            <div class="divrow center wrap mt-8 mb-8" style="gap: 15px;">
              <v-sheet class="sheet-dialog">
                <v-icon class="icon">mdi-link</v-icon>
                <img src="@/assets/sources/icons/near-icon.svg" alt="Near" style="max-width: 25px;">
                <span>
                  NEAR Wallet
                </span>
                <span style="color: rgba(255,255,255, 0.4); font-size: 12;">
                  Web Wallet
                </span>
              </v-sheet>

              <v-sheet class="sheet-dialog">
                <v-icon class="icon">mdi-link</v-icon>
                <img src="@/assets/sources/icons/my-near-wallet-icon.svg" alt="My Near" style="max-width: 25px;">
                <span>
                  MyNear Wallet
                </span>
                <span style="color: rgba(255,255,255, 0.4); font-size: 12;">
                  Web Wallet
                </span>
              </v-sheet>

              <v-sheet class="sheet-dialog">
                <v-icon class="icon">mdi-link</v-icon>
                <img src="@/assets/sources/icons/here-wallet.svg" alt="Here" style="max-width: 25px;">
                <span>
                  Here Wallet
                </span>
                <span style="color: rgba(255,255,255, 0.4); font-size: 12;">
                  Web Wallet
                </span>
              </v-sheet>

              <v-sheet class="sheet-dialog">
                <v-icon class="icon">mdi-link</v-icon>
                <img src="@/assets/sources/icons/meteor-wallet-icon.svg" alt="Meteor" style="max-width: 25px;">
                <span>
                  Meteor Wallet
                </span>
                <span style="color: rgba(255,255,255, 0.4); font-size: 12;">
                  Web Wallet
                </span>
              </v-sheet>
            </div>
          </template>-->
        </div>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script setup>
import { mergeProps, computed, ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import WalletP2p from '../services/wallet-p2p';
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupArepaWallet } from "@near-wallet-selector/arepa-wallet";
import "@near-wallet-selector/modal-ui/styles.css"

const router = useRouter(),
props = defineProps({
  title: String,
}),
dialog = ref(false),
dialogConnect = ref(false),
session = ref("Conectar Billetera")


onBeforeMount(validSession)


 async function validSession() {
  const walletSelectPending = localStorage.getItem('near-wallet-selector:selectedWalletId:pending');

  if(walletSelectPending && walletSelectPending !== "null" && walletSelectPending !== "undefined" && walletSelectPending !== null && walletSelectPending !== undefined) {
    localStorage.setItem('wallet-selector:select-wallet', walletSelectPending);
  }

  const accounId = await WalletP2p.getAccountId();
  // if(localStorage.getItem("session")) {

  if(accounId) {
    const wallet_final = accounId.length > 20 ? accounId.substring(0,6)+"..."+accounId.substring((accounId.length - process.env.NETWORK.length - 7), accounId.length) : accounId;
    session.value = wallet_final;
    // return wallet_final;
  } else {
    session.value ="Conectar Billetera";
    // return "Conectar Billetera";
  }
}

async function openDialog() {
  const accounId = await WalletP2p.getAccountId();
  // if(localStorage.getItem("session")) {
  if(accounId) {
    dialogConnect.value = true

    return
  }

  const selector = await setupWalletSelector({
    network: process.env.NETWORK,
    modules: [setupArepaWallet(), setupMyNearWallet()],
  });

  const modal = setupModal(selector, {});

  modal.show();

  // dialog.value = true
}

function login() {
  WalletP2p.login(process.env.CONTRACT_DAO);
}

async function  logout() {
  // localStorage.removeItem("session")
  dialogConnect.value = false;

  // await WalletP2p.logout();
  let walletSelect = localStorage.getItem('wallet-selector:select-wallet');
  if(!walletSelect || walletSelect === "null" || walletSelect === "undefined" || walletSelect === null || walletSelect === undefined) {
    walletSelect = '"arepa-wallet"';
  }

  const selector = await setupWalletSelector({
    network: process.env.NETWORK,
    modules: [setupArepaWallet(), setupMyNearWallet()],
  });

  const wallet = await selector.wallet(walletSelect.replaceAll('"', ""));
  await wallet.signOut();

  session.value = "Conectar Billetera";
  router.push({path: '/'})
  location.reload();

  // window.open(window.location.origin + window.location.pathname, "_self");
}

</script>
