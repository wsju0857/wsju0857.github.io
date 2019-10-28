<style lang="scss">
@import "../assets/scss/components/dictation";
</style>

<template>
    <v-window v-model="step1" touchless class="dictation-window in-study">
        <v-window-item v-for="(sentence, idx) in sentences" :value="(idx+1)" :key="(idx+1)">
          <v-sheet>
            <v-row>
                  <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                  >
                   <div class="answer-wrapper display-2">
                        <template  v-for="(letter, i) in question_letters">
                            <span :key="i" v-html="letter"></span>
                        </template>
                   </div>
                </v-col>
            </v-row>

          </v-sheet>
        </v-window-item>
   </v-window>
</template>

<script>

export default {
    name: 'keyboard',
    props: {
        step: {
            type: Number,
            required: true,
        },
        sentences: {
            type: Array,
            required: true,
        },
        dictation_data: {
            type: Object,
            required: true,
        },
    },
    components: {
        
    },
    data () {
      return {
        step1: 1,
        question_letters: [],
      }
    },
    watch: {
        step(value, previousValue) {
          this.step1 = value;
        },
        dictation_data : {
            handler(val){
                this.question_letters = val.question_letters[this.step1-1];
                // window.console.log(this.question_letters);
            },
            deep: true 
        }
    },
    methods: { 

    },
    computed: {

    },
    created() {
        this.question_letters = this.dictation_data.question_letters[this.step1-1];
    } 
};
</script>
