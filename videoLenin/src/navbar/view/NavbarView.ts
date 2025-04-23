import NavBarTemplate from "../templates/NavBarTemplate.js"

export default class NavbarView {
  private readonly navbarHTML: HTMLElement
  private sectionChangeHandler?: (section: string) => void

  constructor(element: string) {
    const navbar = document.createElement(`${element}`) as HTMLElement
    if (!navbar) {
      this.navbarHTML = document.createElement('menu')
    }
    this.navbarHTML = navbar
  }

  readonly init = (): void => {
    console.log('NavbarView.init()')
    this.render()
  }

  readonly getNavbarHTML = (): HTMLElement => {
    return this.navbarHTML
  }

  readonly render = () => {
    const templateNav = new NavBarTemplate()
    this.navbarHTML.innerHTML = templateNav.renderNavbar()
  }

  readonly onSectionChange = (handler: (section: string) => void): void => {
    this.sectionChangeHandler = handler

    const activeButton = this.navbarHTML.querySelector('.nav-btn.active') as HTMLElement
    const section = activeButton?.getAttribute('data-section')
    if (section) {
      this.sectionChangeHandler(section)
    }

    this.handleClick()
  }

  private readonly handleClick = (): void => {
    const buttons = this.navbarHTML.querySelectorAll('.nav-btn')
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        buttons.forEach((b) => b.classList.remove('active'))
        button.classList.add('active')

        const section = button.getAttribute('data-section')
        if (section && this.sectionChangeHandler) {
          this.sectionChangeHandler(section)
        }
      })
    })
  }
}
