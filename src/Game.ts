import { EngineFactory } from '@babylonjs/core/Engines'
import { S6 } from './scenes/S6'


export async function GBody(canvas: HTMLCanvasElement) {
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  const engine = await EngineFactory.CreateAsync(canvas, {})
  const { scene } = S6(engine)

  const run = () => {
    engine.runRenderLoop(() => {
      scene.render()
    })
  }
  const resize = () => {
    engine.resize()
  }

  return {
    run,
    resize,
  }
}
