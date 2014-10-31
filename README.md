# Minimal Mex

Metal Extractors produce one metal.  Cost has been adjusted to maintain equivalent payback time.

Incompatible alternate to [Finite Metal](https://forums.uberent.com/threads/rel-server-finite-metal.65484/)

## Related mods

- [Junkyard Wars](https://forums.uberent.com/threads/rel-server-junkyards-wars.65367/)
- [No Metal Commander](https://forums.uberent.com/threads/rel-server-no-metal-commander.65489/)
- [Reclaimable Features](https://forums.uberent.com/threads/rel-server-reclaimable-features.65453/)
- [Wreckage](https://forums.uberent.com/threads/rel-server-wreckage.65404/)

## Development

The generated project includes a `package.json` that lists the dependencies, but you'll need to run `npm install` to download them.

PA will upload **all files** in the mod directory, including `node_modules` and maybe even `.git` - you probably don't want to use this in `server_mods` directly, unless you really like waiting.  The template is set up run to run as a project within a peer directory of `server_mods` - I use `server_mods_dev/mod_name`.  The task `grunt copy:mod` will copy the mod files to `../../server_mods/identifier`, you can change the `modPath` in the Gruntfile if you want to run it from somewhere else.

### Available Tasks

- copy:mod - copy the mod files into server_mods
- proc - copy the unit files from PA, and write modified versions into the mod.
- jsonlint - lint all the mod json files
- json_schema - partial validation of mod json files format using schema by exterminans https://forums.uberent.com/threads/wip-units-ammo-and-tools-json-validation-schema.60451/
- default: proc, json_schema, jsonlint, copy:mod
