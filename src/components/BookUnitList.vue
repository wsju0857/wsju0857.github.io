<template>
    <v-simple-table>
      
      <template v-slot:default>
        <tbody>
          <tr v-for="unit in units" :key="unit.id" @click="$router.push('/study/'+unit.id)">
            <td></td>
            <td class="notice-name">{{ unit.name }}</td>
            <td></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
</template>

<script>

export default {
    name: 'book-unit-list',
    props: {
        bookid : {
            type: Number,
            required: false
        }
    },
    data () {
      return {
        units: [
            {id:1, name: 'Day 1. it is '},
            {id:2, name: 'Day 2. it is '},
            {id:3, name: 'Day 3. it is '},
            {id:4, name: 'Day 4. it is '},
            {id:5, name: 'Day 5. it is '},
            {id:6, name: 'Day 6. it is '},
            {id:7, name: 'Day 7. it is '},
            {id:8, name: 'Day 8. it is '}
        ]
      }
    }
}
</script>
