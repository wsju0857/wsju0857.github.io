<template>
	<v-progress-circular
		:rotate="-90"
		:size="psize"
		:width="pwidth"
		:value="pvalue"
		:color="pcolor"
	>

		<div v-if="ptextstatus == 1" :style="{ color: ptextcolor, fontSize: (pwidth * 1.4) + 'px' }">
			<span v-if="pvalue != 1000">
				{{ pvalue }}{{ ptext }}
			</span>
			<span v-if="pvalue == 1000">
				{{ ptext }}
			</span>
		</div>
	</v-progress-circular>
</template>

<script>
export default {
	data() {
		return {
			value: 0,
		}
	},
	props: {
		// example
		// status: {
		// 	type: String,
		// 	required: true,
		// 	validator: function (value) {
		// 		return [
		// 			'syncing',
		// 			'synced',
		// 			'version-conflict',
		// 			'error'
		// 			].indexOf(value) !== -1
		// 		}
		// 	}
		// }
		psize: {
			type: Number,
			default: 40
		},
		pwidth: {
			type: Number,
			default: 4,
		},
		pvalue: {
			type: Number,
			required: true
		},
		pcolor: String,
		ptext: {
			type: String
		},
		ptextstatus: {
			type: Boolean,
			default: true
		},
		ptextcolor: String
	}
}
</script>
