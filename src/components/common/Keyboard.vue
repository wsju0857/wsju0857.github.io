<template>
    <div class="dictation-keyboard grey lighten-4">
        <v-container>
            <v-row>
                  <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                  >
                    <div class="keys-wrapper">
                        <template v-for="(c_word, c_key) in dictation_data.choice_letters[step-1]">
                            <button
                                 class="keywrap"
                                 :class="{ 'pressed success--text success' : dictation_data.selected_keys.includes(c_key)  }"
                                 :key="c_key"
                                 @click="getDictationSelectLetters($event, c_word, c_key)"
                                 :disabled="dictation_data.selected_keys.includes(c_key)"
                            > 
                                <div class="key">
                                    <div class="keycap" :class="{ 'success lighten-4' : dictation_data.selected_keys.includes(c_key)  }">
                                     {{ c_word }}
                                    </div>
                                </div>
                            </button>
                        </template>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template> 


<script>

export default {
    props: {
        step: {
            type: Number,
            required: true,
        },
        dictation_data: {
            type: Object,
            required: true,
        },
        getDictationSelectLetters: {
            type: Function,
            required: true
        }
    },
    components: {
        
    },
    data () {
      return {
        // step1: 1,
      }
    },
    watch: {
        // step(value, previousValue) {
        //   this.step1 = value;
        // },

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

<style lang="scss">
.dictation-keyboard {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -5rem !important;
    right: -5rem !important;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin: 0;
    box-shadow: 
        inset 0px 11px 8px -10px #CCC,
        inset 0px -11px 8px -10px #CCC; 
    border-radius: unset !important;
    &>.container {
        height: 100%;
        padding: 0 5rem; 
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center !important;
        align-items: stretch !important;
        align-content: center !important;
        border-radius: 0;
        .row {
            flex: 1;
            .keys-wrapper {
                height: 100%;
                display: flex;
                flex-flow: wrap;
                align-content: center;
                font-family: 'Inconsolata' !important;
                .keywrap {
                    width: 3.52rem;
                    height: 3.76rem;
                    border-width: 0.05rem;
                    border-color: #cecece #c2c2c2 #b2b2b2;
                    border-style: solid;
                    box-sizing: content-box;
                    margin: 0.15rem;
                    border-radius: 0.6rem;
                    &.pressed {
                        -webkit-transform: scale(0.95, 0.95);
                        -moz-transform: scale(0.95, 0.95);
                        -ms-transform: scale(0.95, 0.95);
                        -o-transform: scale(0.95, 0.95);
                        transform: scale(0.95, 0.95);
                        .key {
                            background-color: inherit;
                            .keycap {
                                background-color: inherit;
                            }
                        }
                    }
                    
                    .key {
                        border-color: #e4e4e6 #e2e2e4 #d7d7dd;
                        background: #f5f5f5;
                        width: 2.6rem;
                        height: 2.8rem;
                        border-width: 0.25rem 0.45rem 0.65rem;
                        border-style: solid;
                        border-radius: 0.5rem; 
                        box-sizing: content-box;
                        .keycap {
                            width: 2.8rem;
                            height: 3rem;
                            font-size: 2.3rem;
                            line-height: 2.8rem;
                            margin: -0.1rem;
                            text-align: center;
                            background: #f5f5f5;
                            // box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                            border-radius: 0.3rem;
                            position: relative;
                        }
                        
                        
                    }
                    
                    &:focus, &:active {
                        outline: none;
                    }
                }
            }
        }
    }
}

@media (min-width: 960px) {
    .dictation-keyboard  {
        left: calc( (900px - 100vw) / 2 ) !important;
        right: calc( (900px - 100vw) / 2 ) !important;
    }
}
@media (min-width: 1264px) {
    .dictation-keyboard  {
        left: calc( (1185px - 100vw) / 2 ) !important;
        right: calc( (1185px - 100vw) / 2 ) !important;
    }
}
@media (min-width: 1904px) {
    .dictation-keyboard  {
        left: calc( (1785px - 100vw) / 2 ) !important;
        right: calc( (1785px - 100vw) / 2 ) !important;
    }
}
</style>
