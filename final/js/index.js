import logo from '~/images/logo.jpg?optimize';
import svgLogo from '~/images/logo.svg?http';
import styles from '~/scss/styles.scss';

function renderEl(tag, attrs) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el[k] = v);
    document.body.appendChild(el);
}

renderEl('img', { src: logo, alt: 'Logo' });
renderEl('img', { src: svgLogo, alt: 'Logo' });

// For inline
//document.body.innerHTML += svgLogo;

console.log('window.foo.bar', window?.foo?.bar);
