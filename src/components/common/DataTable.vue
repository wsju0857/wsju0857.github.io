<template>
	<v-data-table
        item-key="name"
        :items-per-page="this.c_items_per_page"
		:headers="this.c_headers"
		:items="this.c_items"
        :mobile-breakpoint="this.c_mobile_breakpoint"
        :hide-default-footer="this.c_hide_default_footer"
        :single-expand="this.c_single_expand"
        :show-expand="this.c_show_expand"
        :expanded.sync="expanded"
        :item-key="this.c_item_key"
	>

        <template v-if="first_arrow" v-slot:item.v="{ item }">
            <div style="transform: rotate(90deg);">
                <v-icon
                  small
                >
                  mdi-navigation
                </v-icon>
            </div>
        </template>

        <template v-if="this.c_show_expand" v-slot:expanded-item="{ headers }">
          <td :colspan="headers.length">Peek-a-boo!</td>
        </template>

        <template v-slot:item.division="{ item }">
            <b v-bind:class="getColor(item.did)+'--text' " dark>{{ item.division }}</b>
        </template>

	</v-data-table>
</template>

<script>
	export default {
		data () {
			return {
                // custom
                expanded: [],
                c_item_key : this.pitem_key,
                c_headers : this.pheaders,
                c_items : this.pitems,
                c_mobile_breakpoint : this.pmobile_breakpoint,
                c_items_per_page : this.pitems_per_page,
                c_hide_default_footer : this.phide_default_footer,
                c_single_expand : this.psingle_expand,
                c_show_expand : this.pshow_expand,
			}
		},
        props:[
            'first_arrow',
            'pheaders', 'pitems', 'pmethods', 'pmobile_breakpoint',
            'pitems_per_page', 'phide_default_footer', 'psingle_expand',
            'pshow_expand', 'pitem_key'
        ],
        created : function (){
            // var d = this;
        },
        methods: {
            getColor (did) {
                if (did == "0") return 'success'
                else if (did == "1") return 'warning'
                else if (did == "2") return 'info'
            },
        }
	}
</script>

<style scoped>
	.v-data-table-header{
		background-color: grey;
	}
</style>
