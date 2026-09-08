import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    glsl(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})



// import react, { reactCompilerPreset } from '@vitejs/plugin-react'
// import babel from '@rolldown/plugin-babel'
// import { defineConfig } from 'vite'
// import glsl from 'vite-plugin-glsl'


// const fullReloadAlways = {
//   name: 'full-reload-always',
//   handleHotUpdate({ server }) {
//     server.ws.send({ type: 'full-reload' })
//     return []
//   },
// }

// export default defineConfig({
//   plugins: [
//     react(),
//      glsl(),
//     babel({ presets: [reactCompilerPreset()] }),
//      fullReloadAlways // Add the custom plugin here
//   ],
  
// })
