export default {
  build: {
    sourcemap: true,
    outDir: 'dist',
    base: '/Nonogram-Game/',
    assetsDir: 'assets', // Создайте отдельную директорию для хранения аудиофайлов
  },
  assets: {
    fileExtensions: ['mp3', 'ogg'],
  },
};
