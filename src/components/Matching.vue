<style lang="scss">
@import "../assets/scss/components/matching";
</style>

<template>
    <v-window v-model="step1" touchless class="matching-window in-study">
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
                       <template  v-for="(selection, i) in matching_data.selected_words">
                          <span :key="i" >{{ selection }}&nbsp;</span>
                        </template>
                   </div>
                </v-col>
            </v-row>
             
            <v-row>
                  <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                  >
                    <div class="chips-wrapper">
                        <template v-for="(c_word, c_key) in matching_data.choice_words[idx]">
                            <v-chip
                                 v-if="!matching_data.selected_keys.includes(c_key)"
                                 class="ma-2 elevation-1 text-lowercase matching-select-btn"
                                 color="grey"
                                 outlined
                                 :key="c_key"
                                 @click="getMatchingSelectWord($event, c_word, c_key)"
                            >
                                 {{ c_word }}
                            </v-chip>
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
    props: {
        step: {
            type: Number,
            required: true,
        },
        sentences: {
            type: Array,
            required: true,
        },
        matching_data: {
            type: Object,
            required: true,
        },
        setMatchingChoiceWords: {
            type: Function,
            required: true
        },
        getMatchingSelectWord: {
            type: Function,
            required: true
        }
    },
    components: {
        
    },
    data () {
      return {
        step1: 1,
      }
    },
    watch: {
        step(value, previousValue) {
          this.step1 = value;
        },

    },
    methods: { 
        // checkChoice (c_key) {
        //     return -1 == this.selected_words.indexOf(c_key) ;
        // }
    },
    computed: {

        // selections () {
        //     const selections = []
        //     window.console.log(this.selected_words);
        //     for (const word in this.selected_words) {
        //       selections.push(word)
        //     }
        //     window.console.log(selections);
        //     return selections
        // }
    },
    created() {
    } 
};
</script>
