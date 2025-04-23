export default class NavBarTemplate {
    renderNavbar = () => {
        return `

            <ul>
                <li><a href="#" class="nav-btn" data-section="home">Home</a></li>
                <li><a href="#" class="nav-btn active" data-section="rentals">Rentals</a></li>
                <li><a href="#" class="nav-btn" data-section="about">About</a></li>
            </ul>

        `;
    };
}
