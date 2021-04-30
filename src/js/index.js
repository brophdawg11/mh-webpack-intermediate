import logo from '../images/logo.jpg';
import styles from '../scss/styles.scss';

function renderEl(tag, attrs) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el[k] = v);
    document.body.appendChild(el);
}

renderEl('img', { src: logo, alt: 'Logo' });
