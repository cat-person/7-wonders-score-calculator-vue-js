<template>
  <div>
    <h1> AAAAAAAAAAAAAAAAA </h1>
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.id">
          <td v-for="cell in row" :key="cell">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: ['Name', 'Age', 'Occupation'],
      data: [
        ['John Doe', 30, 'Developer'],
        ['Jane Smith', 25, 'Designer'],
        ['Bob Johnson', 40, 'Manager']
      ]
    }
  }
}
</script>