import { Scene } from '@babylonjs/core'
import { TargetCamera } from '@babylonjs/core/Cameras'
import { Engine } from '@babylonjs/core/Engines'
import { HemisphericLight } from '@babylonjs/core/Lights'
import { Vector3,Color3 } from '@babylonjs/core/Maths'
import { StandardMaterial} from '@babylonjs/core'
import { Mesh,CreateBox } from '@babylonjs/core/Meshes'
import { ActionManager,ExecuteCodeAction} from '@babylonjs/core/Actions'


export function S6(engine: Engine) {
  
  const scene = new Scene(engine)
  const camera = new TargetCamera('camera', new Vector3(3, 3, -10), scene)
  camera.setTarget(new Vector3(3,3,0))
  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
  light.intensity = 0.7

  spawnGrid();
  return { scene }
}



function spawnGrid():void{
  const sizeX = 5
  const sizeY = 5
  const CubeArr = [];
  const cubemat = new StandardMaterial("cubemat")
  cubemat.diffuseColor = new Color3(.9, .1, .3);
  let count = 0;
  for (let i = 0; i < sizeX; i++) {
      for (let p = 0; p < sizeY; p++) {
          count++;
          const state = Math.floor(Math.random() * 3)
          CubeArr.push(new TargetPrefab(new Vector3(i, p, 3), count, state));

      }
  }
 // let center = ((sizeX * sizeY)+1)/2
//  let cameraVector:BABYLON.Vector3
//  cameraVector = (CubeArr[center].position)
//  console.log(cameraVector)
 CubeArr.forEach((item) => { item.update(item.State) });
}  
function checkState(ins:TargetPrefab) {
  switch (ins.State)
  {
   case 0:
       ins.State=1
       break
   case 1:
       ins.State=0
       break
   case 2:
       ins.State=1
       break
   }
}


class TargetPrefab {
  id: number;
  State: number;
  origin: Vector3;
  private _target: Mesh;
  private _redMaterial: StandardMaterial;
  private _yellowMaterial: StandardMaterial;
  private _greenMaterial: StandardMaterial;

  constructor(origin:Vector3, id: number, State: number) {
      this.id = id;
      this.origin = origin;
      this.State = State;

      // Create the box mesh
      const box = CreateBox("box", { size: 0.8 });
      box.position = this.origin;
      this._target = box;

      // Create the materials
      this._redMaterial = new StandardMaterial("redMaterial");
      this._redMaterial.diffuseColor = new Color3(1, 0, 0);
      this._yellowMaterial = new StandardMaterial("yellowMaterial");
      this._yellowMaterial.diffuseColor = new Color3(1, 1, 0);
      this._greenMaterial = new StandardMaterial("greenMaterial");
      this._greenMaterial.diffuseColor = new Color3(0, 1, 0);

      // Register the click action
      this._target.actionManager = new ActionManager();
      this._target.actionManager.registerAction(
          new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
             // this.State = this.State - 1;
             console.log(this._target.position)
             console.log(this.id)
             checkState(this)
                 
             this.update(this.State);
              
              console.log(this.State);
          })
      );
  }

   update(current_state: number): void {
      switch (current_state) {
          case 0:
              this._target.material = this._greenMaterial;
              break;
          
          case 1:
              this._target.material = this._yellowMaterial;
              break;
          case 2:
              this._target.material = this._redMaterial;
              break; 
      }
  }
  
}