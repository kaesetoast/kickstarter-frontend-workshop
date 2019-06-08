/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const fs = require('fs');
const sass = require('sass');
const gaze = require('gaze');
const bs = require('browser-sync').create();

// copy normalize css
fs.copyFileSync('./node_modules/modern-normalize/modern-normalize.css', './css/modern-normalize.css');

bs.init({
	server: '.',
});

function compile() {
	sass.render({ file: './sass/main.scss' }, (error, result) => {
		if (error) {
			console.log(error);
		}

		fs.writeFileSync('./css/main.css', result.css);
		console.log('Compiled Sass');
		bs.reload('*.css');
	});
}

compile();

gaze('./sass/**/*.scss', (error, watcher) => {
	if (error) {
		console.log(error);
	}

	watcher.on('changed', compile);
	watcher.on('added', compile);
});

gaze('./js/**/*.js', (error, watcher) => {
	if (error) {
		console.log(error);
	}

	watcher.on('changed', () => {
		bs.reload('*.js');
	});

	watcher.on('added', () => {
		bs.reload('*.js');
	});
});

gaze('./index.html', (error, watcher) => {
	if (error) {
		console.log(error);
	}

	watcher.on('changed', () => {
		bs.reload();
	});
});
