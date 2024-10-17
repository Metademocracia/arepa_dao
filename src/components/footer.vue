<template>
  <v-footer
    id="footer"
    app absolute
    class="flex-center"
  >
    <div class="jspace divrow acenter" style="width: 100%;">
      <div class="divcol center">
        <img src="@/assets/sources/logos/white-logo.svg" alt="Logo" @click="$router.push('/')" style="cursor: pointer;">
        <div class="divrow center mt-8" style="gap: 15px;">
          <a href="https://instagram.com/metademocracia?igshid=NzZlODBkYWE4Ng==" target="_blank">
            <img src="@/assets/sources/icons/instagram.svg" alt="Icon" class="social-media-link">
          </a>
          <a href="https://x.com/metademocracia_?t=f48NeAgxSrlfXUb9d7kTLw&s=09" target="_blank">
            <img src="@/assets/sources/icons/twitter.svg" alt="Icon" class="social-media-link">
          </a>
          <a href="https://www.facebook.com/profile.php?id=61550736934932&mibextid=ZbWKwL" target="_blank">
            <v-icon color="#fff" class="social-media-link">mdi-facebook</v-icon>
          </a>
        </div>
      </div>

      <div class="divrow center divcol-mobile" style="gap: 15px;">
        <a v-for="(item,index) in dataFooter"
        :href="item.ref" target="_blank" :key="index" style="color: #fff; font-weight: 700; cursor: pointer;"
        @click="$router.push(item.link)"
        >{{ item.name }}</a>
      </div>
    </div>

    <hr class="mt-6 mb-6" style="width: 100%; border-bottom: 1px solid rgba(0,0,0,0.1);">

    <span style="color: #fff;">
      ©2023 Metademocracia. Reservados todos los derechos.
    </span>
  </v-footer>
</template>

<script>
export default {
  data(){
    return{
      dataFooter:[
        {
          name: 'Home',
          link: '/',
        },
        {
          name: 'Propuestas',
          link:'proposals',
        },
        {
          name: "Fondos",
          link: 'funds',
        },
        {
          name: "Foro",
          ref: "https://foro.metademocracia.social/"
        },
        {
          name: "Metainfo",
          ref: "https://metademocracia.com/"
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@use '@/assets/styles/main.scss' as *;

#footer {
  background: #552d7b;// #552d7b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-inline: var(--margin-global);
  position: absolute;
  margin-bottom: -70px;
  padding-block: 30px 10px;

  .social-media-link{
    cursor: pointer;
    max-width: 20px;
  }

  .divcol-mobile{
    @include media(max, 660px){
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
}
</style>
