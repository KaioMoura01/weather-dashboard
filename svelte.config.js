import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$packages: 'src/packages',
			'$packages/*': 'src/packages/*',
			$components: 'src/components',
			'$components/*': 'src/components/*'
		}
	}
};

export default config;
