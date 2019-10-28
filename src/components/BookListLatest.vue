<template>
    <v-simple-table>
      
      <template v-slot:default>
        <tbody>
          <tr v-for="unit in units" :key="unit.id" @click="$router.push('/study/'+unit.id)">
            <td><v-icon color="grey">mdi-chevron-right</v-icon></td>
            <td>{{ unit.type }}</td>
            <td class="notice-name">{{ unit.bookname }}</td>
            <td>{{ unit.name }}</td>
            <td>{{ unit.date }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
</template>

<script>

export default {
    name: 'book-list-latest',
    props: {
        bookid : {
            type: Number,
            required: false
        }
    },
    data () {
      return {
        units: [
            {id:1, type:'시험', bookname: '중등영어2 YBM 박준언', name: 'Day 1. it is ', date: '2019.10.11'},
            {id:2, type:'학습', bookname: '중등영어2 YBM 박준언', name: 'Day 2. it is ', date: '2019.10.20'},
            {id:3, type:'시험', bookname: '중등영어2 YBM 박준언', name: 'Day 3. it is ', date: '2019.10.13'},
            {id:4, type:'학습', bookname: '중등영어2 YBM 박준언', name: 'Day 4. it is ', date: '2019.10.14'},
            {id:5, type:'시험', bookname: '중등영어2 YBM 박준언', name: 'Day 5. it is ', date: '2019.10.15'},
            {id:6, type:'학습', bookname: '중등영어2 YBM 박준언', name: 'Day 6. it is ', date: '2019.10.16'},
            {id:7, type:'시험', bookname: '중등영어2 YBM 박준언', name: 'Day 7. it is ', date: '2019.10.17'},
            {id:8, type:'학습', bookname: '중등영어2 YBM 박준언', name: 'Day 8. it is ', date: '2019.10.18'}
        ],
      }
    }
}
</script>
