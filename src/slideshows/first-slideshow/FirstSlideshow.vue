<template lang='pug'>
#MyFirstSlideshow
  .eg-slideshow
    slide
      h1 Faciliter la gestion d'une équipe dans le domaine du web
      h4 This is your first slideshow !

    slide(enter='bounceInRight' leave='fadeOut')
      h3 Hey modify me !
      p.
        Come on modify me ! If you are running the development server,
        you will see the changes take effect immediaely

    slide(enter='fadeIn')
      h3 Want cool effects?
      p.
        Code your own, or try stealing for the other slideshows !
</template>

<script>
// import titles from 'title'
import eagle from 'eagle.js'
export default {
  mixins: [eagle.slideshow],
  data () {
    return {
      welcome: 'Bienvenue'
    }
  },
  infos: {
    // These infos appear on the home page, below the slideshow's thumbnail
    title: 'Your First Slideshow',
    description: 'A boilerplate to get you started',
    path: 'your-first-slideshow'
  }
}
</script>

<style lang='scss'>
@import url(https://fonts.googleapis.com/css?family=Raleway);
#MyFirstSlideshow {
  .eg-slideshow {
    font-family: 'Raleway';
    .eg-slide {
      .eg-slide-content {
        width: 25em;
        max-width: 80%;
        margin: 0 auto;
        h1 {
          font-size: 1.5em;
        }
      }
    }
  }
  .eg-slide-content {
    width: 25em;
    max-width: 80%;
    margin: 0 auto;
  }
}
</style>
