<template>
  <div>
    <h1> AAAAAAAAAAAAAAAAA </h1>
    <div id="app">
      <h1>Scrollable List of Images</h1>
      <div class="image-list">
        <div class="image-item" v-for="({image, name, side}, index) in images" :key="index">
          <img :src="image" alt="Image" />
          <h2>{{name}}</h2>
          <h2>Side {{side}}</h2>
          <button :onClick="changeSide">Change side</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // import myComponent from 'my-component'
  name: 'Wonders',



  data() {
    return {
      images: [
        {
          image: 'src/assets/Artemis_temple.jpg',
          name: 'Artemis temple',
          side: 'A'
        }
        // 'src/assets/Zeus_statue.jpg',
        // 'src/assets/Pyramides.jpg',
        // 'src/assets/mausoleum.jpg',
        // 'src/assets/Lighthouse.jpg',
        // 'src/assets/gardens.jpg',
        // 'src/assets/Colossus.jpg', 
        
      ]
    };
  },
  methods: {
    changeSide() {
      console.log(this.images)
    }
  }
}
</script>