// Lista de links com propriedades: label, cor de fundo (bg) e URL de destino (href)
var links = [
    { label: 'link1', bg: '#c0392b', href: 'teste.html' },
    { label: 'link2', bg: '#16a085', href: 'teste.html' },
    { label: 'link3', bg: '#8e44ad', href: 'teste.html' },
    { label: 'link4', bg: '#27ae60', href: 'teste.html' },
    { label: 'link5', bg: '#f39c12', href: 'teste.html' },
    { label: 'link6', bg: '#2980b9', href: 'teste.html' }
];

// Obtém a altura da janela ou define um valor padrão se não estiver disponível
var windowHeight = window.innerHeight;
if (windowHeight === 0) windowHeight = 238;

// Configurações do círculo e dos links
var radius = windowHeight * 0.6,
    circle = document.createElement('div'),
    borderSize = radius * 0.021,
    totalArea = 48,
    increment = totalArea / (links.length - 1),
    startPoint = 0 - (totalArea / 2),
    fontSize = radius * 0.12,
    linkSize = radius * 0.25;

// Inicializa o estilo do círculo e dos links
styleCircle();
addCircle();
addLinks();
styleLinks();

// Função para definir o estilo do círculo
function styleCircle() {
    circle.style.border = borderSize + 'px solid #fff';
    circle.style.width = radius * 2 + 'px';
    circle.style.height = radius * 2 + 'px';
    circle.style.borderRadius = radius + 'px';
    circle.style.position = 'absolute';
    circle.style.top = '-' + radius * 0.2 + 'px';
    circle.style.left = radius * -1 + 'px';
}

// Função para adicionar o círculo ao corpo da página
function addCircle() {
    document.body.appendChild(circle);
}

// Função para adicionar os links ao corpo da página
function addLinks() {
    for (var i = 0, l = links.length; i < l; i++) {
        var link = document.createElement('a');
        var hover = document.createElement('span');
        link.href = links[i].href; // Define o URL com base no atributo data-href
        link.dataset.color = links[i].bg;
        link.style.display = 'inline-block';
        link.style.textDecoration = 'none';
        link.style.color = '#fff';
        link.style.position = 'absolute';
        link.style.zIndex = 100;
        link.innerHTML = links[i].label;
        hover.style.position = 'absolute';
        hover.style.display = 'inline-block';
        hover.style.zIndex = 50;
        hover.style.opacity = 0;
        document.body.appendChild(link);
        document.body.appendChild(hover);
        link.addEventListener('mouseover', linkOver);
        link.addEventListener('mouseout', linkOut);
        links[i].elem = link;
        links[i].hover = hover;
    }
}

// Função para estilizar os links
function styleLinks() {
    for (var i = 0, l = links.length; i < l; i++) {
        var link = links[i].elem,
            hover = links[i].hover,
            deg = startPoint + (i * increment);

        link.style.paddingLeft = radius * 1.2 + 'px';
        link.style.fontSize = fontSize + 'px';
        link.style.height = linkSize + 'px';
        link.style.lineHeight = linkSize + 'px';
        setTransformOrigin(link, '0px ' + linkSize * 0.5 + 'px');
        setTransition(link, 'all 0.2s ease-out');
        setTransform(link, 'rotate(' + deg + 'deg)');
        link.style.left = borderSize + 'px';
        link.style.top = (windowHeight / 2) - (windowHeight * 0.1) + borderSize + 'px';

        hover.style.left = borderSize + 'px';
        setTransformOrigin(hover, '0px ' + linkSize * 0.5 + 'px');
        setTransition(hover, 'all 0.2s ease-out');
        setTransform(hover, 'rotate(' + deg + 'deg)');
        hover.style.top = (windowHeight * 0.4) + borderSize + 'px';
        hover.style.width = radius + (borderSize / 2) + 'px';
        hover.style.height = linkSize + 'px';
        hover.style.borderRight = borderSize * 2 + 'px solid #fff';
    }
}

// Atualiza as dimensões do círculo e dos links quando a janela é redimensionada
window.onresize = function () {
    windowHeight = window.innerHeight;
    radius = windowHeight * 0.6;
    borderSize = radius * 0.021;
    fontSize = radius * 0.12;
    linkSize = radius * 0.25;
    styleCircle();
    styleLinks();
}

// Função chamada quando o mouse passa sobre um link
function linkOver(e) {
    var thisLink = e.target,
        thisHover = thisLink.nextSibling;
    thisLink.style.paddingLeft = radius * 1.25 + 'px';
    thisHover.style.opacity = 1;
    document.body.style.backgroundColor = thisLink.dataset.color;
}

// Função chamada quando o mouse sai de um link
function linkOut(e) {
    var thisLink = e.target,
        thisHover = thisLink.nextSibling;
    thisLink.style.paddingLeft = radius * 1.2 + 'px';
    thisHover.style.opacity = 0;
}

// Função auxiliar para definir transformações CSS
function setTransform(element, string) {
    element.style.webkitTransform = string;
    element.style.MozTransform = string;
    element.style.msTransform = string;
    element.style.OTransform = string;
    element.style.transform = string;
}

// Função auxiliar para definir o ponto de origem da transformação CSS
function setTransformOrigin(element, string) {
    element.style.webkitTransformOrigin = string;
    element.style.MozTransformOrigin = string;
    element.style.msTransformOrigin = string;
    element.style.OTransformOrigin = string;
    element.style.transformOrigin = string;
}

// Função auxiliar para definir transições CSS
function setTransition(element, string) {
    element.style.webkitTransition = string;
    element.style.MozTransition = string;
    element.style.msTransition = string;
    element.style.OTransition = string;
    element.style.transition = string;
}
