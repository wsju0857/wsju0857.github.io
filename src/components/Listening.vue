<style lang="scss">
@import "../assets/scss/components/listening";
</style>

<template>
    <v-window v-model="step1" touchless class="listening-window in-study">
     <v-window-item v-for="(word, key) in words" :value="key+1" :key="key+1">
       <v-sheet>
           <v-row>
               <v-col
                   cols="6"
                   sm="6"
                   md="6"
                   lg="6"
               >
                    <div class="word-wrapper pos-left">
                        <v-img 
                            :src="'//etltuzgdzyaa1067545.cdn.ntruss.com/vocatrain/wordimages/'+word.word+'.jpg'" 
                            :lazy-src="'//etltuzgdzyaa1067545.cdn.ntruss.com/vocatrain/wordimages/'+word.word+'.jpg'" 
                            contain class="word-img"        
                            aspect-ratio="1"
                        ></v-img>
                    </div>
               
               </v-col>
               <v-col
                   cols="6"
                   sm="6"
                   md="6"
                   lg="6"
               >
                    <div class="word-wrapper pos-right text-center">
                        <p class="display-1 font-weight-bold">{{ word.word }}</p>
                        <p class="display-1 grey--text">{{ word.mean }}</p>
                    </div>
               </v-col>
           </v-row>
       </v-sheet>
     </v-window-item>

     <v-window-item v-for="(sentence, key) in sentences" :value="words.length+(key+1)" :key="words.length+(key+1)">
       <v-sheet>
           <v-row>
               <v-col
               cols="12"
               sm="12"
               md="12"
               lg="12"
               >
               <div class="text-center listening-sentence-wrapper">
                   <p class="display-2">{{ sentence.sentence }}</p>
                   <p class="display-1 grey--text">{{ sentence.mean }}</p>
               </div>
               </v-col>
           </v-row>
           
       </v-sheet>
     </v-window-item>
   </v-window>
</template>

<script>


export default {
    props: {
        step: {
            type: Number,
            required: true,
        },
        words: {
            type: Array,
            required: true,
        },
        sentences: {
            type: Array,
            required: true,
        }
    },
    components: {
        
    },
    data () {
      return {
        step1: this.step,
      }
    },
    watch: {
        step(value, previousValue) {
          this.step1 = value;
        }
    },
    methods: { 
        
    }
};
</script>
