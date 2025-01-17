import fs from "fs"
import { createConfig } from "@thoughtsunificator/config-env"

export default function(config = {}) {
	const { envPath = ".env.json", configPath = "data/config.json", namespace = "window" } = config
	return {
		name: 'rollup-env',
		buildStart(){
			if (fs.existsSync(envPath)) {
				this.addWatchFile(envPath)
			}
			if (fs.existsSync(configPath)) {
				this.addWatchFile(configPath)
			}
		},
		banner: () => {
			const config = createConfig(envPath, configPath)
			let str = ";(function() {"
			for(const property in config) {
				str += `\n\t${namespace}["${property}"] = ${JSON.stringify(config[property], null, "\t")}`
			}
			str += "\n})();"
			return str
		}
	};
}
