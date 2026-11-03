(function () {
'use strict';

const BOOT = window.PORTFOLIO_BOOT || { mode: 'landing' };
const IS_LANDING = BOOT.mode === 'landing';
const CURRENT_PROJECT_ID = BOOT.projectId || null;
const PORTFOLIO_ROOT = '/portfolio/';

const PASSWORD_HASH = 'fcde242ae1f8e2afc85a96d';
const ENCRYPTED_PATH = 'AwQRARMLSxFWFFAAVRNTEEwFX1AWVxdNFQgW';

const PORTFOLIO_TITLE_BASE = 'David Ceraso — Case Studies';
const PROJECTS = [
    { id: 'abc-news-design-mcp', label: 'ABC News Design System MCP', slug: 'abc-news-design-mcp' },
    { id: 'disney-campaign-manager', label: 'Disney Campaign Manager', slug: 'disney-campaign-manager' },
    { id: 'cv', label: 'CV', slug: 'cv' }
];

function projectPageUrl(projectId) {
    const project = PROJECTS.find((entry) => entry.id === projectId);
    return project ? PORTFOLIO_ROOT + project.slug + '/' : PORTFOLIO_ROOT;
}

const CASE_STUDY_FIGURE_MAT_PROJECTS = ['disney-campaign-manager', 'abc-news-design-mcp'];

/** Bump when `project-content.js` case studies change (cache-bust). */
const PROJECT_CONTENT_REVISION = 63;
const DCM_CONTENT_MARKER = 'Externalizing ad creation (DXC)';

let PROJECT_CONTENT = { cv: '' };

function refreshProjectContent() {
    const previousCv = PROJECT_CONTENT.cv;
    const cvRevision = PROJECT_CONTENT._cvRevision;
    PROJECT_CONTENT = Object.assign({ cv: previousCv || '' }, window.PORTFOLIO_PROJECT_CONTENT || {});
    if (cvRevision) {
        PROJECT_CONTENT._cvRevision = cvRevision;
    }
}

function loadProjectContentScript() {
    return new Promise((resolve, reject) => {
        const dcm = window.PORTFOLIO_PROJECT_CONTENT?.['disney-campaign-manager'];
        if (dcm && dcm.includes(DCM_CONTENT_MARKER)) {
            resolve();
            return;
        }

        const scriptId = 'portfolio-project-content';
        const existing = document.getElementById(scriptId);
        if (existing) {
            existing.remove();
        }
        delete window.PORTFOLIO_PROJECT_CONTENT;

        const script = document.createElement('script');
        script.id = scriptId;
            script.src = PORTFOLIO_ROOT + 'project-content.js?v=' + PROJECT_CONTENT_REVISION;
        script.onload = () => {
            const loaded = window.PORTFOLIO_PROJECT_CONTENT?.['disney-campaign-manager'];
            if (loaded && loaded.includes(DCM_CONTENT_MARKER)) {
                resolve();
                return;
            }
            reject(new Error('project-content.js loaded but DCM case study is missing or outdated'));
        };
        script.onerror = () =>
            reject(
                new Error(
                    'Failed to load project-content.js — deploy it beside index.html or hard-refresh (Cmd+Shift+R).'
                )
            );
        document.head.appendChild(script);
    });
}

async function ensureProjectContent() {
    try {
        await loadProjectContentScript();
    } catch (error) {
        console.error('[portfolio] Project content failed to load.', error);
    }
    refreshProjectContent();
}

/** Bump when `/CV/cv-content.html` changes so portfolio refetches (in-memory + HTTP cache). */
const CV_CONTENT_REVISION = 10;

async function hydrateCvContent() {
    if (PROJECT_CONTENT.cv && PROJECT_CONTENT._cvRevision === CV_CONTENT_REVISION) {
        return;
    }

    try {
        const cvUrl = new URL('/CV/cv-content.html', window.location.origin);
        cvUrl.searchParams.set('v', String(CV_CONTENT_REVISION));
        const response = await fetch(cvUrl.href, {
            credentials: 'same-origin',
            cache: 'no-store',
        });
        if (!response.ok) {
            throw new Error('CV fetch failed');
        }
        const html = await response.text();
        PROJECT_CONTENT.cv = '<div class="case-study case-study--cv">' + html + '</div>';
        PROJECT_CONTENT._cvRevision = CV_CONTENT_REVISION;

        const cvPanel = document.getElementById('project-cv');
        if (cvPanel) {
            cvPanel.innerHTML = PROJECT_CONTENT.cv;
        }
    } catch (error) {
        PROJECT_CONTENT.cv =
            '<article class="case-study"><p class="case-study__lede">Could not load CV text. <a class="case-study__link" href="/CV/DavidCeraso_CV.pdf" target="_blank" rel="noopener noreferrer">Download PDF</a>.</p></article>';
        PROJECT_CONTENT._cvRevision = CV_CONTENT_REVISION;
    }
}

const passwordForm = document.getElementById('passwordForm');
const portfolio = document.getElementById('portfolio');
const projectMenu = document.getElementById('projectMenu');
const projectMenuToggle = document.getElementById('projectMenuToggle');
const projectMenuList = document.getElementById('projectMenuList');
const portfolioTitle = document.getElementById('portfolioTitle');
const passwordError = document.getElementById('passwordError');
const passwordInput = document.getElementById('passwordInput');

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex.substring(0, 23);
}

function decryptPath(password) {
    try {
        const encrypted = atob(ENCRYPTED_PATH);
        let result = '';
        for (let i = 0; i < encrypted.length; i++) {
            result += String.fromCharCode(encrypted.charCodeAt(i) ^ password.charCodeAt(i % password.length));
        }
        return result;
    } catch (e) {
        return null;
    }
}

function renderProjectNav() {
    if (!projectMenuList) {
        return;
    }
    const homeItem =
        '<li><a class="project-menu-link' +
        (IS_LANDING ? ' is-active' : '') +
        '" href="' +
        PORTFOLIO_ROOT +
        '"' +
        (IS_LANDING ? ' aria-current="page"' : '') +
        '>Index</a></li>';

    const projectItems = PROJECTS.map((project) => {
        const isActive = !IS_LANDING && project.id === CURRENT_PROJECT_ID;
        if (isActive) {
            return (
                '<li><span class="project-menu-link is-active" aria-current="page">' + project.label + '</span></li>'
            );
        }
        return '<li><a class="project-menu-link" href="' + projectPageUrl(project.id) + '">' + project.label + '</a></li>';
    }).join('');

    projectMenuList.innerHTML = homeItem + projectItems;
}

function postRenderProject(projectId) {
    if (CASE_STUDY_FIGURE_MAT_PROJECTS.includes(projectId)) {
        wrapCaseStudyFigureMats(document.getElementById('project-' + projectId));
    }
    if (projectId === 'disney-campaign-manager') {
        const dcmRoot = document.getElementById('project-disney-campaign-manager');
        playDxcPreviewVideos(dcmRoot);
        syncOpportunityMatrixAxes(dcmRoot);
    }
    if (projectId === 'cv') {
        document.dispatchEvent(
            new CustomEvent('cv-letter-fit', { detail: { root: document.getElementById('project-cv') } })
        );
    }
}

const gridArtifact = document.getElementById('grid-artifact');
const gridArtifactCanvas = document.getElementById('gridArtifactCanvas');
const gridArtifactVideo = document.getElementById('gridArtifactVideo');

let gridArtifactAscii = null;
let gridArtifactAsciiLoader = null;
const GRID_ASCII_BUILD = 7;
let gridArtifactAsciiBuild = 0;

function playGridArtifactVideo() {
    if (!gridArtifactVideo) {
        return;
    }
    gridArtifactVideo.muted = true;
    gridArtifactVideo.playsInline = true;
    const playPromise = gridArtifactVideo.play();
    if (playPromise) {
        playPromise.catch(() => {});
    }
}

function teardownGridArtifactAscii() {
    if (gridArtifactAscii) {
        gridArtifactAscii.destroy();
        gridArtifactAscii = null;
    }
}

async function ensureGridArtifactAscii(width, height) {
    if (!gridArtifactCanvas || !gridArtifactVideo) {
        return;
    }

    if (gridArtifactAscii && gridArtifactAsciiBuild !== GRID_ASCII_BUILD) {
        teardownGridArtifactAscii();
        gridArtifactAsciiLoader = null;
    }

    if (!gridArtifactAsciiLoader) {
        gridArtifactAsciiLoader = import('./grid-artifact-ascii.mjs?v=7');
    }

    const module = await gridArtifactAsciiLoader;
    if (!gridArtifactAscii) {
        gridArtifactAscii = module.mountGridArtifactAscii(gridArtifactCanvas, gridArtifactVideo, {
            charset: ' .,:;i1tfLCG08@',
            cellSize: 5,
            ink: '#0000ff',
            background: '#ffffff',
            contrast: 2.2,
            brightness: 0.06,
            gamma: 0.68
        });
        gridArtifactAsciiBuild = GRID_ASCII_BUILD;
    }
    gridArtifactAscii.resize(width, height);
    playGridArtifactVideo();
}

function getGridLayoutMetrics() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const rootStyles = getComputedStyle(document.documentElement);
    const padding = parseFloat(rootStyles.getPropertyValue('--grid-pad-x')) || 16;
    const scaleY = height / 1080;
    const contentWidth = width - padding * 2;
    const columnWidth = contentWidth / 12;
    const horizontalLines = [360 * scaleY, 732 * scaleY];
    const bandTop = horizontalLines[0];
    const bandBottom = horizontalLines[1];
    const bandLeft = padding + columnWidth * 4;
    const bandWidth = columnWidth * 4;
    const bandHeight = bandBottom - bandTop;
    /* Full middle column cell between overlay lines 360–732. */
    const middleSpot = {
        left: bandLeft,
        top: bandTop,
        width: bandWidth,
        height: bandHeight
    };
    return {
        width,
        height,
        padding,
        scaleY,
        columnWidth,
        contentWidth,
        verticalPositions: [0, 4, 8, 12].map((column) => padding + column * columnWidth),
        horizontalLines,
        rowBands: [
            [0, 348 * scaleY],
            [372 * scaleY, 720 * scaleY],
            [744 * scaleY, height]
        ],
        middleSpot
    };
}

function getGridMiddleCellRect() {
    return getGridLayoutMetrics().middleSpot;
}

function hideGridArtifact() {
    if (!gridArtifact) {
        return;
    }
    gridArtifact.hidden = true;
    teardownGridArtifactAscii();
    if (gridArtifactVideo) {
        gridArtifactVideo.pause();
    }
}

function syncGridArtifact() {
    if (!IS_LANDING || !gridArtifact) {
        hideGridArtifact();
        return;
    }

    const cell = getGridMiddleCellRect();
    if (!cell || cell.width < 8 || cell.height < 8) {
        hideGridArtifact();
        return;
    }

    gridArtifact.hidden = false;
    gridArtifact.style.left = Math.round(cell.left) + 'px';
    gridArtifact.style.top = Math.round(cell.top) + 'px';
    gridArtifact.style.width = Math.round(cell.width) + 'px';
    gridArtifact.style.height = Math.round(cell.height) + 'px';
    ensureGridArtifactAscii(Math.round(cell.width), Math.round(cell.height)).catch((error) => {
        console.error('[portfolio] Grid ASCII mount failed.', error);
    });
}

function landingProjectLinks(projects) {
    return (
        '<ul class="portfolio-landing__list">' +
        projects
            .map(
                (project) =>
                    '<li><a class="project-menu-link" data-project-id="' +
                    project.id +
                    '" href="' +
                    projectPageUrl(project.id) +
                    '">' +
                    project.label +
                    '</a></li>'
            )
            .join('') +
        '</ul>'
    );
}

function renderLanding() {
    const caseStudies = PROJECTS.filter((project) => project.id !== 'cv');
    const extras = PROJECTS.filter((project) => project.id === 'cv');

    portfolio.classList.add('is-landing-index');
    portfolio.innerHTML =
        '<div class="portfolio-landing" data-landing-region="nav">' +
        '<section id="portfolio-case-studies" class="portfolio-landing__section" data-landing-region="case-studies" aria-labelledby="portfolio-case-studies-heading">' +
        '<h2 id="portfolio-case-studies-heading" class="portfolio-landing__title">Case Studies</h2>' +
        landingProjectLinks(caseStudies) +
        '</section>' +
        '<section id="portfolio-artifacts" class="portfolio-landing__section" data-landing-region="artifacts" aria-labelledby="portfolio-artifacts-heading">' +
        '<h2 id="portfolio-artifacts-heading" class="portfolio-landing__title">Artifacts</h2>' +
        landingProjectLinks(extras) +
        '</section></div>';
    portfolioTitle.textContent = 'David Ceraso — Index';
}

function renderProjectPage() {
    portfolio.classList.remove('is-landing-index');
    const projectId = CURRENT_PROJECT_ID;
    let content = PROJECT_CONTENT[projectId] || '';
    if (!content && projectId !== 'cv') {
        content =
            '<article class="case-study"><p class="case-study__lede">This project did not load. Ensure <code>portfolio/project-content.js</code> is deployed, then hard-refresh.</p></article>';
    }
    portfolio.innerHTML =
        '<section class="project-panel is-active" id="project-' +
        projectId +
        '" data-project-id="' +
        projectId +
        '">' +
        content +
        '</section>';
    const project = PROJECTS.find((entry) => entry.id === projectId);
    portfolioTitle.textContent = project ? 'David Ceraso — ' + project.label : PORTFOLIO_TITLE_BASE;
    postRenderProject(projectId);
}

function renderPortfolioContent() {
    if (IS_LANDING) {
        renderLanding();
        return;
    }
    renderProjectNav();
    if (!CURRENT_PROJECT_ID || !PROJECTS.some((project) => project.id === CURRENT_PROJECT_ID)) {
        portfolio.innerHTML = '<p class="case-study__lede">Unknown project.</p>';
        return;
    }
    renderProjectPage();
}

/* Slide 1LgR2…/g3caec594e79_1_124 — chrome g3caec594e79_1_131 + Video+.png g3c4dc8115a6_0_5 */
const DXC_PREVIEW_CHROME = { w: 2048, h: 1485, tv: { l: 133, t: 454, w: 1377, h: 772 } };

function wrapCaseStudyFigureMats(root) {
    if (!root) {
        return;
    }
    root.querySelectorAll('.case-study__figure:not(.case-study__theme-viz)').forEach((figure) => {
        if (figure.querySelector(':scope > .case-study__figure-mat')) {
            return;
        }
        const media =
            figure.querySelector(':scope > img') ||
            (figure.classList.contains('case-study__dxc-preview')
                ? figure.querySelector(':scope > .dxc-preview__stage')
                : null);
        if (!media) {
            return;
        }
        const mat = document.createElement('div');
        mat.className = 'case-study__figure-mat';
        figure.insertBefore(mat, media);
        mat.appendChild(media);
    });
}

function syncOpportunityMatrixAxes(root) {
    if (!root) {
        return;
    }
    root.querySelectorAll('.opportunity-viz__matrix').forEach((matrix) => {
        const corner = matrix.querySelector('.opportunity-viz__corner');
        const xs = matrix.querySelectorAll('.opportunity-viz__x');
        let headerHeight = 0;
        if (corner) {
            headerHeight = Math.max(headerHeight, corner.getBoundingClientRect().height);
        }
        xs.forEach((el) => {
            headerHeight = Math.max(headerHeight, el.getBoundingClientRect().height);
        });
        if (headerHeight > 0) {
            matrix.style.setProperty('--opportunity-viz-y-width', `${Math.round(headerHeight)}px`);
        }
    });
}

function calibrateDxcPreviewStages(root) {
    if (!root) {
        return;
    }
    const { w: baseW, h: baseH, tv } = DXC_PREVIEW_CHROME;
    root.querySelectorAll('.dxc-preview__stage').forEach((stage) => {
        const chrome = stage.querySelector('.dxc-preview__chrome');
        const screen = stage.querySelector('.dxc-preview__screen');
        if (!chrome || !screen) {
            return;
        }
        const apply = () => {
            if (!chrome.naturalWidth || !chrome.naturalHeight) {
                return;
            }
            screen.style.left = `${(tv.l / baseW) * 100}%`;
            screen.style.top = `${(tv.t / baseH) * 100}%`;
            screen.style.width = `${(tv.w / baseW) * 100}%`;
            screen.style.height = `${(tv.h / baseH) * 100}%`;
        };
        if (chrome.complete) {
            apply();
        } else {
            chrome.addEventListener('load', apply, { once: true });
        }
    });
}

function playDxcPreviewVideos(root) {
    if (!root) {
        return;
    }
    calibrateDxcPreviewStages(root);
    root.querySelectorAll('.dxc-preview__video').forEach((video) => {
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        const start = () => {
            const attempt = video.play();
            if (attempt && typeof attempt.catch === 'function') {
                attempt.catch(() => {});
            }
        };
        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            start();
        } else {
            video.addEventListener('loadeddata', start, { once: true });
        }
    });
}

window.addEventListener('resize', () => {
    syncOpportunityMatrixAxes(document.getElementById('project-disney-campaign-manager'));
});

function openProjectMenu() {
    if (!projectMenuList) {
        return;
    }
    if (projectMenuToggle) {
        projectMenuToggle.setAttribute('aria-expanded', 'true');
    }
    projectMenuList.hidden = false;
}

function closeProjectMenu() {
    if (!projectMenuList || IS_LANDING) {
        return;
    }
    if (projectMenuToggle) {
        projectMenuToggle.setAttribute('aria-expanded', 'false');
    }
    projectMenuList.hidden = true;
}

function toggleProjectMenu() {
    if (!projectMenuList) {
        return;
    }
    if (projectMenuList.hidden) {
        openProjectMenu();
    } else {
        closeProjectMenu();
    }
}

async function showPortfolio() {
    sessionStorage.setItem('case_studies_auth', 'true');
    if (passwordForm) {
        passwordForm.style.display = 'none';
    }
    document.body.classList.add('authenticated');
    if (!portfolio) {
        console.error('[portfolio] Missing #portfolio — cannot show content.');
        return;
    }
    portfolio.hidden = false;
    portfolio.classList.add('is-visible');
    if (projectMenu) {
        projectMenu.hidden = false;
        projectMenu.classList.add('is-visible');
    }
    if (portfolioTitle) {
        portfolioTitle.classList.add('is-visible');
    }

    if (IS_LANDING) {
        renderPortfolioContent();
        requestAnimationFrame(() => syncGridArtifact());
        return;
    }

    hideGridArtifact();

    await ensureProjectContent();
    if (CURRENT_PROJECT_ID === 'cv') {
        await hydrateCvContent();
    }
    renderPortfolioContent();
}

if (projectMenuToggle) {
    projectMenuToggle.addEventListener('click', toggleProjectMenu);
}

document.addEventListener('click', (event) => {
    if (!projectMenu || !projectMenu.classList.contains('is-visible')) {
        return;
    }

    if (!projectMenu.contains(event.target)) {
        closeProjectMenu();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeProjectMenu();
    }
});

document.addEventListener(
    'pointerdown',
    () => {
        if (IS_LANDING && document.body.classList.contains('authenticated')) {
            playGridArtifactVideo();
        }
    },
    { passive: true }
);

document.addEventListener('visibilitychange', () => {
    if (!document.hidden && IS_LANDING && document.body.classList.contains('authenticated')) {
        playGridArtifactVideo();
    }
});

const gridOverlay = document.getElementById('grid-overlay');

function drawGridOverlay() {
    if (!gridOverlay) {
        return;
    }
    const layout = getGridLayoutMetrics();
    const width = layout.width;
    const height = layout.height;
    const padding = layout.padding;
    const columnWidth = layout.columnWidth;
    const verticalPositions = layout.verticalPositions;
    const rowBands = layout.rowBands;
    const horizontalLines = layout.horizontalLines;
    const horizontalInset = 12;

    let verticalPaths = '';
    rowBands.forEach(([top, bottom]) => {
        verticalPositions.forEach((x) => {
            verticalPaths += 'M' + x + ' ' + top + 'V' + bottom;
        });
    });

    let horizontalPaths = '';
    horizontalLines.forEach((y) => {
        horizontalPaths +=
            'M0 ' + y + 'H' + (padding - horizontalInset) +
            'M' + (padding + horizontalInset) + ' ' + y + 'H' + (padding + columnWidth * 4 - horizontalInset) +
            'M' + (padding + columnWidth * 4 + horizontalInset) + ' ' + y + 'H' + (padding + columnWidth * 8 - horizontalInset) +
            'M' + (padding + columnWidth * 8 + horizontalInset) + ' ' + y + 'H' + (padding + columnWidth * 12 - horizontalInset) +
            'M' + (padding + columnWidth * 12 + horizontalInset) + ' ' + y + 'H' + width;
    });

    let crosshairPaths = '';
    horizontalLines.forEach((y) => {
        verticalPositions.forEach((x) => {
            crosshairPaths +=
                'M' + x + ' ' + (y - 6) + 'V' + (y + 6) +
                'M' + (x - 6) + ' ' + y + 'H' + (x + 6);
        });
    });

    gridOverlay.innerHTML =
        '<svg viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="none">' +
            '<path d="' + verticalPaths + '" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" fill="none"></path>' +
            '<path d="' + horizontalPaths + '" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" fill="none"></path>' +
            '<path d="' + crosshairPaths + '" stroke="#FFFFFF" stroke-width="1" fill="none" opacity="0.4"></path>' +
        '</svg>';
}

let viewportLayoutFrame = 0;
function onViewportLayoutChange() {
    if (viewportLayoutFrame) {
        cancelAnimationFrame(viewportLayoutFrame);
    }
    viewportLayoutFrame = requestAnimationFrame(() => {
        viewportLayoutFrame = 0;
        drawGridOverlay();
        if (IS_LANDING && document.body.classList.contains('authenticated')) {
            syncGridArtifact();
        }
        if (CURRENT_PROJECT_ID === 'cv') {
            document.dispatchEvent(
                new CustomEvent('cv-letter-fit', { detail: { root: document.getElementById('project-cv') } })
            );
        }
    });
}

drawGridOverlay();
window.addEventListener('resize', onViewportLayoutChange);
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', onViewportLayoutChange);
}

if (passwordForm && passwordInput) {
    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!window.crypto?.subtle) {
            if (passwordError) {
                passwordError.textContent = 'Password unlock requires a secure connection (https or localhost).';
                passwordError.style.display = 'block';
            }
            return;
        }
        const password = passwordInput.value;
        const hash = await hashPassword(password);

        if (hash === PASSWORD_HASH) {
            const path = decryptPath(password);
            if (path && path.startsWith('secure/')) {
                if (passwordError) {
                    passwordError.style.display = 'none';
                }
                showPortfolio();
            } else {
                if (passwordError) {
                    passwordError.style.display = 'block';
                }
                passwordInput.value = '';
                passwordInput.focus();
            }
        } else {
            if (passwordError) {
                passwordError.style.display = 'block';
            }
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
}

if (
    sessionStorage.getItem('case_studies_auth') === 'true' ||
    sessionStorage.getItem('portfolio_auth') === 'true'
) {
    showPortfolio();
}

})();
