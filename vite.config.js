export default {
  build: {
    sourcemap: true,
    outDir: 'dist',
    base: '/oscarraizer-JSFE2023Q4/',
    assetsDir: 'assets', // Создайте отдельную директорию для хранения аудиофайлов
  },
  assets: {
    fileExtensions: ['mp3', 'ogg'],
  },
};
