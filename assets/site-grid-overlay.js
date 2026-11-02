/**
 * Fixed 1094×928 layout grid (same geometry as haoqi.design overlay).
 * Scales to the viewport; draw once — SVG stretches via preserveAspectRatio="none".
 */
(function () {
    const VIEWBOX = '0 0 1094 928';

    const PATHS = [
        {
            d:
                'M56.5 0V297.3333333333333M547.5 0V297.3333333333333M1038.5 0V297.3333333333333' +
                'M56.5 321.3333333333333V618.6666666666666M547.5 321.3333333333333V618.6666666666666M1038.5 321.3333333333333V618.6666666666666' +
                'M56.5 642.6666666666666V928M547.5 642.6666666666666V928M1038.5 642.6666666666666V928',
            stroke: 'rgba(255, 255, 255, 0.1)',
        },
        {
            d:
                'M0 309.3333333333333H44.5M68.5 309.3333333333333H535.5M559.5 309.3333333333333H1026.5M1050.5 309.3333333333333H1094' +
                'M0 630.6666666666666H44.5M68.5 630.6666666666666H535.5M559.5 630.6666666666666H1026.5M1050.5 630.6666666666666H1094',
            stroke: 'rgba(255, 255, 255, 0.1)',
        },
        {
            d:
                'M56.5 303.3333333333333V315.3333333333333M50.5 309.3333333333333H62.5M56.5 624.6666666666666V636.6666666666666M50.5 630.6666666666666H62.5' +
                'M547.5 303.3333333333333V315.3333333333333M541.5 309.3333333333333H553.5M547.5 624.6666666666666V636.6666666666666M541.5 630.6666666666666H553.5' +
                'M1038.5 303.3333333333333V315.3333333333333M1032.5 309.3333333333333H1044.5M1038.5 624.6666666666666V636.6666666666666M1032.5 630.6666666666666H1044.5',
            stroke: '#FFFFFF',
            opacity: '0.4',
        },
    ];

    function renderGridOverlay(root) {
        if (!root) {
            return;
        }
        const paths = PATHS.map(function (spec) {
            const opacity = spec.opacity ? ' opacity="' + spec.opacity + '"' : '';
            return (
                '<path d="' +
                spec.d +
                '" stroke="' +
                spec.stroke +
                '" stroke-width="1" fill="none"' +
                opacity +
                '></path>'
            );
        }).join('');
        root.innerHTML =
            '<svg viewBox="' +
            VIEWBOX +
            '" preserveAspectRatio="none" aria-hidden="true">' +
            paths +
            '</svg>';
    }

    function initSiteGridOverlay() {
        const root = document.getElementById('grid-overlay');
        renderGridOverlay(root);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSiteGridOverlay);
    } else {
        initSiteGridOverlay();
    }

    window.renderSiteGridOverlay = renderGridOverlay;
})();
