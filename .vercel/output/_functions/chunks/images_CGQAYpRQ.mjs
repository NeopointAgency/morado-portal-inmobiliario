import { t as DIRECTUS_URL } from "./directus_B0UXzgzJ.mjs";
//#region src/lib/images.ts
var PRESETS = {
	thumb: {
		width: 600,
		height: 400
	},
	card: {
		width: 800,
		height: 600
	},
	hero: {
		width: 1920,
		height: 1080
	},
	galeria: {
		width: 1600,
		height: 1200
	}
};
/**
* URL de un asset con preset. Nunca usar el asset original:
* los asesores suben fotos de 6MB desde el celular.
*/
function assetUrl(fileId, preset) {
	return `${DIRECTUS_URL}/assets/${fileId}?key=${preset}`;
}
//#endregion
export { assetUrl as n, PRESETS as t };
