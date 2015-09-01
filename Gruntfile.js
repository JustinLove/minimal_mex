var spec = require('./lib/spec')
var prompt = require('prompt')
prompt.start()

var modPath = '../../server_mods/com.wondible.pa.minimal_mex/'
var stream = 'stable'
var media = require('./lib/path').media(stream)

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    copy: {
      mod: {
        files: [
          {
            src: [
              'modinfo.json',
              'LICENSE.txt',
              'README.md',
              'CHANGELOG.md',
              'ui/**',
              'pa/**'],
            dest: modPath,
          },
        ],
      },
    },
    jsonlint: {
      all: {
        src: [
          'pa/ammo/**/*.json',
          'pa/tools/**/*.json',
          'pa/units/**/*.json'
        ]
      },
    },
    json_schema: {
      all: {
        files: {
          'lib/schema.json': [
            'pa/ammo/**/*.json',
            'pa/tools/**/*.json',
            'pa/units/**/*.json'
          ]
        },
      },
    },
    // copy files from PA, transform, and put into mod
    proc: {
      mex: {
        targets: [
          'pa/units/land/metal_extractor/metal_extractor.json',
          'pa_ex1/units/land/metal_extractor_adv/metal_extractor_adv.json'
        ],
        process: function(spec) {
          spec.build_metal_cost = Math.floor(spec.build_metal_cost / spec.production.metal)
          spec.production.metal = 1
        }
      },
      jig: {
        targets: [
          'pa_ex1/units/orbital/mining_platform/mining_platform.json'
        ],
        process: function(spec) {
          spec.build_metal_cost = spec.build_metal_cost / 2 + Math.floor(spec.build_metal_cost/2 / spec.production.metal)
          spec.production.metal = 1
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-json-schema');

  grunt.registerMultiTask('proc', 'Process unit files into the mod', function() {
    if (this.data.targets) {
      var specs = spec.copyPairs(grunt, this.data.targets, media)
      spec.copyUnitFiles(grunt, specs, this.data.process)
    } else {
      var specs = this.filesSrc.map(function(s) {return grunt.file.readJSON(media + s)})
      var out = this.data.process.apply(this, specs)
      grunt.file.write(this.data.dest, JSON.stringify(out, null, 2))
    }
  })

  // Default task(s).
  grunt.registerTask('default', ['proc', 'json_schema', 'jsonlint', 'copy:mod']);

};

