require.config({

	deps: ['main'],

	shim: {
		'jquery': {
			exports: '$'
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
    'head': {
      exports: 'head'
    },
    'reveal': {
      deps: ['head'],
      exports: 'Reveal'
    }
	},

	paths: {
		jquery: '../../components/jquery/jquery',
		underscore: '../../components/underscore/underscore',
		backbone: '../../components/backbone/backbone',
    templates: '../build/templates',
    hogan: '../../components/hogan/dist/hogan.template-3.0.0.amd',
    head: '../../components/reveal.js/lib/js/head.min',
    reveal: '../../components/reveal.js/js/reveal'
	}

});