# Solicita el nombre del módulo
$moduleName = Read-Host "Ingresa el nombre del módulo (por ejemplo: movies)"

# Capitaliza la primera letra
$Capitalized = ($moduleName.Substring(0,1).ToUpper()) + $moduleName.Substring(1)

# Crea carpeta principal
New-Item -ItemType Directory -Name $moduleName
Set-Location -Path $moduleName

# Crea subcarpetas
$subfolders = @("controller", "model", "view")
foreach ($folder in $subfolders) {
    New-Item -ItemType Directory -Name $folder
}

# Contenido del Controller
$controllerContent = @"
import ${Capitalized}Model from '../model/${Capitalized}Model.js'
import ${Capitalized}View from '../view/${Capitalized}View.js'

export default class ${Capitalized}Controller {
  constructor(
    private readonly model: ${Capitalized}Model,
    private readonly view: ${Capitalized}View
  ) {}

  readonly init = () => {
    console.log('${Capitalized}Controller.init()')
    this.model.init()
    this.view.init()
    this.view.render()
  }
}
"@

# Contenido del Model
$modelContent = @"
export default class ${Capitalized}Model {
  readonly init = () => {
    console.log('${Capitalized}Model.init()')
  }
}
"@

# Contenido del View
$viewContent = @"
export default class ${Capitalized}View {
  private readonly ${moduleName}HTML: HTMLElement

  constructor() {
    this.${moduleName}HTML = document.createElement('${moduleName}')
    this.${moduleName}HTML.classList.add('${moduleName}')
  }

  readonly init = () => {
    console.log('${Capitalized}View.init()')
  }

  readonly get${Capitalized}HTML = (): HTMLElement => {
    return this.${moduleName}HTML
  }

  readonly render = () => {
    this.${moduleName}HTML.innerHTML = `
      <h1>${Capitalized} View</h1>
      <p>Este es el contenido de la vista de ${Capitalized}.</p>
    `
  }
}
"@

# Contenido del archivo fachada (raíz)
$mainContent = @"
import ${Capitalized}Controller from './controller/${Capitalized}Controller.js'
import ${Capitalized}Model from './model/${Capitalized}Model.js'
import ${Capitalized}View from './view/${Capitalized}View.js'

export default class ${Capitalized} {
  private readonly model: ${Capitalized}Model
  private readonly view: ${Capitalized}View
  private readonly controller: ${Capitalized}Controller

  constructor() {
    this.model = new ${Capitalized}Model()
    this.view = new ${Capitalized}View()
    this.controller = new ${Capitalized}Controller(this.model, this.view)
  }

  readonly init = () => {
    this.controller.init()
  }

  readonly get${Capitalized}HTML = (): HTMLElement => {
    return this.view.get${Capitalized}HTML()
  }
}
"@

# Crear y llenar los archivos
Set-Content -Path ".\controller\${Capitalized}Controller.ts" -Value $controllerContent
Set-Content -Path ".\model\${Capitalized}Model.ts" -Value $modelContent
Set-Content -Path ".\view\${Capitalized}View.ts" -Value $viewContent
Set-Content -Path ".\${Capitalized}.ts" -Value $mainContent

Write-Host "✅ Estructura MVC para '$Capitalized' creada con éxito."
