require(['reveal'], function(Reveal){

  Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,

    theme: 'default', // available themes are in /css/theme
    transition: 'default', // default/cube/page/concave/zoom/linear/fade/none
    dependencies: [
      {
        src: '../../components/reveal.js/plugin/notes/notes.js',
        async: true,
        condition: function() { return !!document.body.classList; }
      }
    ]
  });

});