/** Portfolio case studies — bump ?v= when editing */
window.PORTFOLIO_PROJECT_CONTENT = {
            'abc-news-design-mcp': `
                <article class="case-study">
                    <header class="case-study__hero">
                        <h1 class="case-study__title">ABC News Design System MCP</h1>
                        <p class="case-study__lede">I led the design and product direction for an agent-ready design system: a public documentation site, Figma Code Connect library, and Model Context Protocol (MCP) server that lets designers and engineers build ABC News UI with real tokens and components—not guesswork.</p>
                        <dl class="case-study__meta">
                            <div><dt>Role</dt><dd>Principal Product Designer (lead)</dd></div>
                            <div><dt>Organization</dt><dd>Disney News &amp; Entertainment · ABC News</dd></div>
                            <div><dt>Scope</dt><dd>Web · iOS · Android · AI workflows</dd></div>
                            <div><dt>Deliverable</dt><dd>Component library site</dd></div>
                        </dl>
                        <figure class="case-study__figure case-study__figure--border">
                            <img src="assets/abc-news-design-mcp/home-light.png" alt="ABC News Design System homepage in light mode" loading="lazy">
                            <figcaption class="case-study__caption">Design system hub (light mode) — foundations, components, templates, and MCP setup in one place.</figcaption>
                        </figure>
                    </header>

                    <section class="case-study__section">
                        <h2>Problem</h2>
                        <p>ABC News ships across web and native with a growing component catalog, but adoption broke down in the handoff layer: tokens lived in repo files, Figma maps were incomplete, and AI assistants could not reliably access foundations or component APIs. Teams recreated patterns, drifted from semantic tokens, and spent review cycles fixing hardcoded values.</p>
                    </section>

                    <section class="case-study__section">
                        <h2>What I did</h2>
                        <ul class="case-study__list">
                            <li>Defined the end-to-end product model—foundations, components, templates, and MCP tooling—as one coherent system designers and agents could navigate.</li>
                            <li>Shipped the ABC News Design System site with live Code Connect previews for buttons, cards, navigation, modals, and editorial patterns used on abcnews.com.</li>
                            <li>Productized <span class="case-study__nowrap">@abcnews/design-mcp</span> with install flows, documentation, and guardrails so Cursor and Claude Code can look up tokens, map Figma to code, and audit compliance.</li>
                            <li>Authored companion agent skills (setup, token bootstrap, lookup, Figma-to-ABCNEWS, compliance audit, template sync) so common workflows are repeatable without tribal knowledge.</li>
                            <li>Aligned cross-functional partners on semantic tokens, multi-theme behavior (light, dark, dark blue), and platform outputs for web, iOS, and Android.</li>
                        </ul>
                    </section>

                    <section class="case-study__section">
                        <h2>Foundations</h2>
                        <p>Color, typography, icons, and sizing—the shared token layer everything else pulls from. Documented so designers, engineers, and agents reference the same semantic values instead of one-off hex codes.</p>
                        <div class="case-study__gallery case-study__gallery--large">
                            <figure class="case-study__figure case-study__figure--border">
                                <img src="assets/abc-news-design-mcp/foundations-color-light.png" alt="Foundations — color tokens in light mode" loading="lazy">
                                <figcaption class="case-study__caption">Color</figcaption>
                            </figure>
                            <figure class="case-study__figure case-study__figure--border">
                                <img src="assets/abc-news-design-mcp/foundations-typography-light.png" alt="Foundations — typography in light mode" loading="lazy">
                                <figcaption class="case-study__caption">Typography</figcaption>
                            </figure>
                            <figure class="case-study__figure case-study__figure--border">
                                <img src="assets/abc-news-design-mcp/foundations-icons-light.png" alt="Foundations — icons in light mode" loading="lazy">
                                <figcaption class="case-study__caption">Icons</figcaption>
                            </figure>
                            <figure class="case-study__figure case-study__figure--border">
                                <img src="assets/abc-news-design-mcp/foundations-sizing-light.png" alt="Foundations — sizing in light mode" loading="lazy">
                                <figcaption class="case-study__caption">Sizing</figcaption>
                            </figure>
                        </div>
                    </section>

                    <section class="case-study__section">
                        <h2>Components</h2>
                        <p>Atoms through organisms with live Code Connect previews—27+ patterns used on abcnews.com and native surfaces, each with usage guidance agents can query through MCP.</p>
                        <div class="case-study__gallery case-study__gallery--large">
                            <figure class="case-study__figure case-study__figure--border">
                                <img src="assets/abc-news-design-mcp/components-atoms-light.png" alt="Components — atoms in light mode" loading="lazy">
                                <figcaption class="case-study__caption">Atoms</figcaption>
                            </figure>
                            <figure class="case-study__figure case-study__figure--border">
                                <img src="assets/abc-news-design-mcp/components-molecules-light.png" alt="Components — molecules in light mode" loading="lazy">
                                <figcaption class="case-study__caption">Molecules</figcaption>
                            </figure>
                            <figure class="case-study__figure case-study__figure--border">
                                <img src="assets/abc-news-design-mcp/components-organisms-light.png" alt="Components — organisms in light mode" loading="lazy">
                                <figcaption class="case-study__caption">Organisms</figcaption>
                            </figure>
                        </div>
                    </section>

                    <section class="case-study__section">
                        <h2>Templates</h2>
                        <p>Full editorial and product layouts—homepage, live, video, and category flows—showing how components compose into pages teams actually ship.</p>
                        <div class="case-study__gallery case-study__gallery--large">
                            <figure class="case-study__figure case-study__figure--border">
                                <img src="assets/abc-news-design-mcp/templates-national-light.png" alt="Templates — National in light mode" loading="lazy">
                                <figcaption class="case-study__caption">National</figcaption>
                            </figure>
                            <figure class="case-study__figure case-study__figure--border">
                                <img src="assets/abc-news-design-mcp/templates-otv-light.png" alt="Templates — OTV in light mode" loading="lazy">
                                <figcaption class="case-study__caption">OTV</figcaption>
                            </figure>
                        </div>
                    </section>

                    <section class="case-study__section">
                        <h2>Light, dark, and dark blue</h2>
                        <p>Semantic tokens drive three documentation modes from one source of truth—the hub and every layer above switch together so teams and agents validate contrast and brand behavior before code lands.</p>
                        <div class="case-study__gallery case-study__gallery--3">
                            <figure class="case-study__figure case-study__figure--border">
                                <img src="assets/abc-news-design-mcp/home-light.png" alt="Homepage in light mode" loading="lazy">
                                <figcaption class="case-study__caption">Hub — light</figcaption>
                            </figure>
                            <figure class="case-study__figure">
                                <img src="assets/abc-news-design-mcp/home-dark.png" alt="Homepage in dark mode" loading="lazy">
                                <figcaption class="case-study__caption">Hub — dark</figcaption>
                            </figure>
                            <figure class="case-study__figure">
                                <img src="assets/abc-news-design-mcp/home-dark-blue.png" alt="Homepage in dark blue mode" loading="lazy">
                                <figcaption class="case-study__caption">Hub — dark blue</figcaption>
                            </figure>
                        </div>
                    </section>

                    <section class="case-study__section">
                        <h2>Agent tooling</h2>
                        <figure class="case-study__figure">
                            <img src="assets/abc-news-design-mcp/mcp-docs.png?v=2" alt="ABC News Design MCP documentation with install flow and tool reference" loading="lazy">
                            <figcaption class="case-study__caption">MCP product docs — install, skills, designer workflows, and agent tool reference.</figcaption>
                        </figure>
                    </section>

                    <section class="case-study__section">
                        <h2>System at a glance</h2>
                        <div class="case-study__stats" aria-label="Key metrics">
                            <div><div class="case-study__stat-value">14</div><div class="case-study__stat-label">MCP tools for agents</div></div>
                            <div><div class="case-study__stat-value">5</div><div class="case-study__stat-label">Companion skills</div></div>
                            <div><div class="case-study__stat-value">46+</div><div class="case-study__stat-label">Code Connect mappings</div></div>
                            <div><div class="case-study__stat-value">3</div><div class="case-study__stat-label">Token platforms</div></div>
                        </div>
                    </section>

                    <section class="case-study__section">
                        <h2>Outcome</h2>
                        <p>The MCP turns the design system into infrastructure for building: agents read the same source of truth as engineering, Figma frames convert to tokenized code, and prototypes can be audited for hardcoded values before review. The components site is the canonical entry point for “how do I build this?”—for humans and for AI.</p>
                    </section>
                </article>
            `,
            'disney-campaign-manager': `
                <article class="case-study">
                    <header class="case-study__hero">
                        <h1 class="case-study__title">Disney Campaign Manager — Externalization</h1>
                        <p class="case-study__lede">As design manager, I led the team and design direction for Disney Ad Platforms’ shift from publisher-controlled, direct-sold workflows to an advertiser-controlled growth platform—externalizing buying, reporting, inventory, audiences, and creation into Disney Campaign Manager (DCM) so mid-market advertisers get one destination for planning, transacting, and optimizing CTV spend.</p>
                        <dl class="case-study__meta">
                            <div><dt>Role</dt><dd>Design Manager (lead)</dd></div>
                            <div><dt>Organization</dt><dd>Disney Ad Platforms · The Walt Disney Company · 2021–2026</dd></div>
                            <div><dt>Scope</dt><dd>Self-service · Externalization · Mid-market · DXC</dd></div>
                            <div><dt>North star</dt><dd>Highest-yield CTV · Easiest to transact · Greatest advertiser value</dd></div>
                        </dl>
                        <figure class="case-study__figure case-study__figure--border">
                            <img src="assets/disney-campaign-manager/figures/content-packages-ui.png?v=2" alt="DCM content selection — premium packages in the campaign setup flow" loading="lazy" width="2048" height="1343" decoding="async">
                            <figcaption class="case-study__caption">In-product content selection — curated Hulu, Disney+, and ESPN packages inside Campaign Manager.</figcaption>
                        </figure>
                    </header>

                    <section class="case-study__section">
                        <h2>Problem</h2>
                        <p>Disney’s streaming inventory was strong, but global ad revenue still lagged Meta, Amazon, and Google by an order of magnitude. Mid-market advertisers expected lightweight, living-room-to-mobile interfaces with live performance, advanced targeting, and data they could act on—while much of Disney’s tooling remained internal, managed, and publisher-controlled. To compete, we had to close the gap by transferring power, control, data, and optimization directly to advertisers.</p>
                        <figure class="case-study__theme-viz case-study__segments-viz" aria-labelledby="dcm-segments-viz-title">
                            <figcaption class="case-study__theme-viz__title" id="dcm-segments-viz-title">Who advertises with us?</figcaption>
                            <div class="segments-viz">
                                <table class="segments-viz__table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Type of organization</th>
                                            <th scope="col">Number of employees</th>
                                            <th scope="col">Annual revenue</th>
                                            <th scope="col">Ex.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="segments-viz__type">Small business</td>
                                            <td>Up to 100 employees</td>
                                            <td>Up to $50 million</td>
                                            <td class="segments-viz__example"><img src="assets/disney-campaign-manager/figures/advertiser-segments/example-smb-toyota.png?v=3" alt="Bob Johnson Toyota" width="274" height="98" decoding="async"></td>
                                        </tr>
                                        <tr class="segments-viz__row--focus">
                                            <td class="segments-viz__type">Mid-market business</td>
                                            <td>100–999 employees</td>
                                            <td>$50 million – $1 billion</td>
                                            <td class="segments-viz__example"><img src="assets/disney-campaign-manager/figures/advertiser-segments/example-midmarket-custom-ink.png?v=3" alt="Custom Ink" width="2042" height="758" decoding="async"></td>
                                        </tr>
                                        <tr>
                                            <td class="segments-viz__type">Enterprise</td>
                                            <td>1,000+ employees</td>
                                            <td>More than $1 billion</td>
                                            <td class="segments-viz__example"><img src="assets/disney-campaign-manager/figures/advertiser-segments/example-enterprise-coke.png?v=2" alt="Coca-Cola" width="1000" height="327" decoding="async"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <ul class="case-study__sr-only">
                                <li>Small business: up to 100 employees, up to $50M revenue—example Bob Johnson Toyota.</li>
                                <li>Mid-market: 100–999 employees, $50M–$1B revenue—example Custom Ink; DCM focus segment.</li>
                                <li>Enterprise: 1,000+ employees, over $1B revenue—example Coca-Cola.</li>
                            </ul>
                        </figure>
                        <figure class="case-study__theme-viz case-study__opportunity-viz" aria-labelledby="dcm-opportunity-viz-title">
                            <figcaption class="case-study__theme-viz__title" id="dcm-opportunity-viz-title">Where is there opportunity? · ads expertise × spend</figcaption>
                            <div class="opportunity-viz">
                                <div class="opportunity-viz__matrix" role="table" aria-label="Advertiser segments by ads expertise and annual ad spend">
                                    <div class="opportunity-viz__corner" aria-hidden="true"></div>
                                    <div class="opportunity-viz__x" role="columnheader">Under $300M ad spend</div>
                                    <div class="opportunity-viz__x" role="columnheader">Over $300M ad spend</div>
                                    <div class="opportunity-viz__y" role="rowheader">High ads expertise</div>
                                    <div class="opportunity-viz__cell opportunity-viz__cell--muted" role="cell">
                                        <p class="opportunity-viz__count">123K <span>accounts</span></p>
                                        <p class="opportunity-viz__detail">Example of segment not attractive to pursue—minimal lift relative to account volume.</p>
                                    </div>
                                    <div class="opportunity-viz__cell" role="cell">
                                        <p class="opportunity-viz__segment">Enterprise</p>
                                        <p class="opportunity-viz__count">365K <span>accounts</span></p>
                                        <p class="opportunity-viz__detail">Living room, mobile, web</p>
                                    </div>
                                    <div class="opportunity-viz__y" role="rowheader">Low ads expertise</div>
                                    <div class="opportunity-viz__cell" role="cell">
                                        <p class="opportunity-viz__segment">SMB</p>
                                        <p class="opportunity-viz__count">9.6M <span>accounts</span></p>
                                        <p class="opportunity-viz__detail">Lightweight interfaces (e.g., mobile, web)</p>
                                    </div>
                                    <div class="opportunity-viz__cell opportunity-viz__cell--focus" role="cell">
                                        <p class="opportunity-viz__segment">Mid-market</p>
                                        <p class="opportunity-viz__count">555K <span>accounts</span></p>
                                        <p class="opportunity-viz__detail">The top 17% of mid-market advertisers drive 50% of net total revenues.</p>
                                    </div>
                                </div>
                            </div>
                            <ul class="case-study__sr-only">
                                <li>High expertise, under $300M spend: 123K accounts—not a priority segment.</li>
                                <li>High expertise, over $300M: Enterprise, 365K accounts.</li>
                                <li>Low expertise, under $300M: SMB, 9.6M accounts.</li>
                                <li>Low expertise, over $300M: Mid-market, 555K accounts—focus segment; top 17% drive half of net revenue.</li>
                            </ul>
                        </figure>
                    </section>

                    <section class="case-study__section">
                        <h2>Hypothesis</h2>
                        <p>Transform from a managed media seller into an advertiser-controlled platform: unify buying, managing, creation, and reporting in DCM; externalize capabilities sellers previously operated on behalf of customers; and prioritize mid-market journeys where the top segment of accounts drives a disproportionate share of revenue.</p>
                    </section>

                    <section class="case-study__section">
                        <h2>Mid-market advertiser needs</h2>
                        <p>Research with Bain segmented mid-market advertisers into five archetypes—each with example brands and primary needs that informed what DCM had to externalize first.</p>
                        <figure class="case-study__theme-viz case-study__midmarket-viz" aria-labelledby="dcm-midmarket-viz-title">
                            <figcaption class="case-study__theme-viz__title" id="dcm-midmarket-viz-title">Mid-market advertiser needs · five archetypes</figcaption>
                            <div class="midmarket-viz">
                                <div class="midmarket-viz__scroll" tabindex="0">
                                    <div class="midmarket-viz__grid" role="table" aria-label="Mid-market advertiser archetypes">
                                        <div class="midmarket-viz__col" role="columnheader">
                                            <h3 class="midmarket-viz__persona">Efficient Upstart</h3>
                                            <div class="midmarket-viz__logos" aria-hidden="true">
                                                <img src="assets/disney-campaign-manager/figures/midmarket/efficient-upstart-a.png?v=1" alt="" width="120" height="40" decoding="async">
                                                <img src="assets/disney-campaign-manager/figures/midmarket/efficient-upstart-b.png?v=3" alt="James Allen" width="288" height="49" decoding="async">
                                            </div>
                                            <p class="midmarket-viz__needs-label">Primary needs</p>
                                            <ul class="midmarket-viz__needs">
                                                <li>Creative composition tooling</li>
                                                <li>Advanced targeting (e.g., behavioral segments)</li>
                                                <li>“Live” performance reporting, insights</li>
                                            </ul>
                                        </div>
                                        <div class="midmarket-viz__col" role="columnheader">
                                            <h3 class="midmarket-viz__persona">Experienced Optimizer</h3>
                                            <div class="midmarket-viz__logos" aria-hidden="true">
                                                <img src="assets/disney-campaign-manager/figures/midmarket/experienced-optimizer-a.png?v=1" alt="" width="120" height="40" decoding="async">
                                                <img src="assets/disney-campaign-manager/figures/midmarket/experienced-optimizer-b.png?v=1" alt="" width="120" height="40" decoding="async">
                                            </div>
                                            <p class="midmarket-viz__needs-label">Primary needs</p>
                                            <ul class="midmarket-viz__needs">
                                                <li>Incrementality across channels (e.g., proof via MMM or MTA)</li>
                                                <li>Clean rooms for buying</li>
                                                <li>Advanced reporting / data exporting</li>
                                            </ul>
                                        </div>
                                        <div class="midmarket-viz__col" role="columnheader">
                                            <h3 class="midmarket-viz__persona">Brand Builder</h3>
                                            <div class="midmarket-viz__logos" aria-hidden="true">
                                                <img src="assets/disney-campaign-manager/figures/midmarket/brand-builder-a.png?v=1" alt="" width="100" height="40" decoding="async">
                                                <img src="assets/disney-campaign-manager/figures/midmarket/brand-builder-b.png?v=1" alt="" width="120" height="40" decoding="async">
                                            </div>
                                            <p class="midmarket-viz__needs-label">Primary needs</p>
                                            <ul class="midmarket-viz__needs">
                                                <li>Audience creation / reach</li>
                                                <li>Creative composition / optimization tooling</li>
                                                <li>Insights / support (new to video channels)</li>
                                            </ul>
                                        </div>
                                        <div class="midmarket-viz__col" role="columnheader">
                                            <h3 class="midmarket-viz__persona">Incumbent Regional Brand</h3>
                                            <div class="midmarket-viz__logos" aria-hidden="true">
                                                <img src="assets/disney-campaign-manager/figures/midmarket/incumbent-regional-a.png?v=1" alt="" width="120" height="40" decoding="async">
                                                <img src="assets/disney-campaign-manager/figures/midmarket/incumbent-regional-b.png?v=1" alt="" width="120" height="40" decoding="async">
                                            </div>
                                            <p class="midmarket-viz__needs-label">Primary needs</p>
                                            <ul class="midmarket-viz__needs">
                                                <li>Local market targeting (geo and loyalty data)</li>
                                                <li>Relevance in local market</li>
                                                <li>Plugins for agency reporting (or agency use of reporting)</li>
                                            </ul>
                                        </div>
                                        <div class="midmarket-viz__col" role="columnheader">
                                            <h3 class="midmarket-viz__persona">Incumbent National Brand</h3>
                                            <div class="midmarket-viz__logos" aria-hidden="true">
                                                <img src="assets/disney-campaign-manager/figures/midmarket/incumbent-national-a.png?v=1" alt="" width="100" height="40" decoding="async">
                                                <img src="assets/disney-campaign-manager/figures/midmarket/incumbent-national-b.png?v=1" alt="" width="120" height="40" decoding="async">
                                            </div>
                                            <p class="midmarket-viz__needs-label">Primary needs</p>
                                            <ul class="midmarket-viz__needs">
                                                <li>Audience reach</li>
                                                <li>Exclusive placements</li>
                                                <li>Agency data plugins for cross-channel measurement</li>
                                                <li>Clean rooms for buying</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul class="case-study__sr-only">
                                <li>Efficient Upstart — James Allen, AG1 — creative tooling, advanced targeting, live reporting.</li>
                                <li>Experienced Optimizer — Custom Ink, Playtika — incrementality, clean rooms, advanced export.</li>
                                <li>Brand Builder — NOOM, Grammarly — audience reach, creative optimization, video insights.</li>
                                <li>Incumbent Regional — Bob’s Discount Furniture, Wegmans — local targeting and agency reporting plugins.</li>
                                <li>Incumbent National — Ace Hardware, Kraft Heinz — reach, exclusive placements, cross-channel measurement, clean rooms.</li>
                            </ul>
                        </figure>
                    </section>

                    <section class="case-study__section">
                        <h2>What I did</h2>
                        <ul class="case-study__list">
                            <li>Set design direction for DCM externalization—mapping enterprise vs. customer-facing surfaces across PITCH → PLAN → TRAFFIC → PAY and aligning roadmaps to executive OKRs.</li>
                            <li>Led and mentored 8+ product designers across campaign management, OMS/Atlas adjacencies, reporting, and self-service while partnering with product, engineering, sales, and data.</li>
                            <li>Defined mid-market UX for unified self-service: one destination for ads instead of fragmented internal handoffs and seller-mediated workflows.</li>
                            <li>Designed externalized reporting, content packaging, audience activation, and Disney eXperience Composer (DXC) flows inside DCM—each ladder to easier transacting and higher yield.</li>
                            <li>Articulated phased parity (content packaging, advanced ads, DXC enablement, measurement onboarding) so teams could ship incrementally without losing a coherent advertiser mental model.</li>
                        </ul>
                    </section>

                    <section class="case-study__section">
                        <h2>Publisher-controlled → advertiser-controlled</h2>
                        <p>We reframed the product around three advertiser needs—moving each from seller-operated internals to self-serve DCM experiences.</p>
                        <figure class="case-study__theme-viz" aria-labelledby="dcm-theme-viz-title">
                            <figcaption class="case-study__theme-viz__title" id="dcm-theme-viz-title">Fig. — Control shift by capability area (publisher → advertiser)</figcaption>
                            <div class="case-study__theme-viz__legend" aria-hidden="true">
                                <span><i class="theme-viz__dot--pub"></i> Seller-operated</span>
                                <span><i class="theme-viz__dot--adv"></i> Self-serve in DCM</span>
                            </div>
                            <div class="case-study__theme-viz__axis" aria-hidden="true">
                                <span>Publisher</span>
                                <span class="case-study__theme-viz__axis-line"></span>
                                <span>Advertiser</span>
                            </div>
                            <div class="case-study__theme-viz__grid">
                                <div class="theme-viz__facet">
                                    <h3 class="theme-viz__facet-title">Measurement &amp; performance</h3>
                                    <div class="theme-viz__rows">
                                        <div class="theme-viz__row" style="--pub: 16%; --adv: 92%;">
                                            <span class="theme-viz__label">Reporting / export</span>
                                            <div class="theme-viz__track"><span class="theme-viz__span"></span><span class="theme-viz__point theme-viz__point--pub"></span><span class="theme-viz__point theme-viz__point--adv"></span></div>
                                        </div>
                                        <div class="theme-viz__row" style="--pub: 12%; --adv: 88%;">
                                            <span class="theme-viz__label">Cross-channel measurement</span>
                                            <div class="theme-viz__track"><span class="theme-viz__span"></span><span class="theme-viz__point theme-viz__point--pub"></span><span class="theme-viz__point theme-viz__point--adv"></span></div>
                                        </div>
                                        <div class="theme-viz__row" style="--pub: 20%; --adv: 95%;">
                                            <span class="theme-viz__label">Live performance</span>
                                            <div class="theme-viz__track"><span class="theme-viz__span"></span><span class="theme-viz__point theme-viz__point--pub"></span><span class="theme-viz__point theme-viz__point--adv"></span></div>
                                        </div>
                                        <div class="theme-viz__row" style="--pub: 24%; --adv: 86%;">
                                            <span class="theme-viz__label">Insights / support</span>
                                            <div class="theme-viz__track"><span class="theme-viz__span"></span><span class="theme-viz__point theme-viz__point--pub"></span><span class="theme-viz__point theme-viz__point--adv"></span></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="theme-viz__facet">
                                    <h3 class="theme-viz__facet-title">Targeting &amp; reach</h3>
                                    <div class="theme-viz__rows">
                                        <div class="theme-viz__row" style="--pub: 14%; --adv: 90%;">
                                            <span class="theme-viz__label">Behavioral segments</span>
                                            <div class="theme-viz__track"><span class="theme-viz__span"></span><span class="theme-viz__point theme-viz__point--pub"></span><span class="theme-viz__point theme-viz__point--adv"></span></div>
                                        </div>
                                        <div class="theme-viz__row" style="--pub: 10%; --adv: 93%;">
                                            <span class="theme-viz__label">Audience creation</span>
                                            <div class="theme-viz__track"><span class="theme-viz__span"></span><span class="theme-viz__point theme-viz__point--pub"></span><span class="theme-viz__point theme-viz__point--adv"></span></div>
                                        </div>
                                        <div class="theme-viz__row" style="--pub: 8%; --adv: 85%;">
                                            <span class="theme-viz__label">1P data activation</span>
                                            <div class="theme-viz__track"><span class="theme-viz__span"></span><span class="theme-viz__point theme-viz__point--pub"></span><span class="theme-viz__point theme-viz__point--adv"></span></div>
                                        </div>
                                        <div class="theme-viz__row" style="--pub: 18%; --adv: 91%;">
                                            <span class="theme-viz__label">Geo + loyalty control</span>
                                            <div class="theme-viz__track"><span class="theme-viz__span"></span><span class="theme-viz__point theme-viz__point--pub"></span><span class="theme-viz__point theme-viz__point--adv"></span></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="theme-viz__facet">
                                    <h3 class="theme-viz__facet-title">Creative &amp; optimization</h3>
                                    <div class="theme-viz__rows">
                                        <div class="theme-viz__row" style="--pub: 22%; --adv: 89%;">
                                            <span class="theme-viz__label">Composition tooling</span>
                                            <div class="theme-viz__track"><span class="theme-viz__span"></span><span class="theme-viz__point theme-viz__point--pub"></span><span class="theme-viz__point theme-viz__point--adv"></span></div>
                                        </div>
                                        <div class="theme-viz__row" style="--pub: 15%; --adv: 87%;">
                                            <span class="theme-viz__label">Recommendations</span>
                                            <div class="theme-viz__track"><span class="theme-viz__span"></span><span class="theme-viz__point theme-viz__point--pub"></span><span class="theme-viz__point theme-viz__point--adv"></span></div>
                                        </div>
                                        <div class="theme-viz__row" style="--pub: 28%; --adv: 82%;">
                                            <span class="theme-viz__label">Strategy collaboration</span>
                                            <div class="theme-viz__track"><span class="theme-viz__span"></span><span class="theme-viz__point theme-viz__point--pub"></span><span class="theme-viz__point theme-viz__point--adv"></span></div>
                                        </div>
                                        <div class="theme-viz__row" style="--pub: 11%; --adv: 96%;">
                                            <span class="theme-viz__label">In-flight budget / creative</span>
                                            <div class="theme-viz__track"><span class="theme-viz__span"></span><span class="theme-viz__point theme-viz__point--pub"></span><span class="theme-viz__point theme-viz__point--adv"></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul class="case-study__sr-only">
                                <li>Measurement: advanced reporting and export, cross-channel measurement, live performance reporting, insights and support.</li>
                                <li>Targeting: behavioral segments, audience creation, first-party data activation, geo and loyalty targeting.</li>
                                <li>Creative: composition tooling, off-the-shelf recommendations, campaign strategy collaboration, in-flight budget and creative changes.</li>
                            </ul>
                        </figure>
                    </section>

                    <section class="case-study__section">
                        <h2>One unified destination</h2>
                        <p>Mid-market buyers expect buying, managing, creation, and reporting in one self-serve surface—not a chain of internal tools and seller-mediated steps.</p>
                        <figure class="case-study__theme-viz case-study__unified-viz" aria-labelledby="dcm-unified-viz-title">
                            <figcaption class="case-study__theme-viz__title" id="dcm-unified-viz-title">Comparison · one self-serve product</figcaption>
                            <div class="compare-viz">
                                <div class="compare-viz__row compare-viz__row--fragmented">
                                    <p class="compare-viz__heading">Current experience</p>
                                    <div class="compare-viz__bar compare-viz__bar--split" aria-hidden="true">
                                        <span>Buy</span><span>Manage</span><span>Create</span><span>Report</span>
                                    </div>
                                    <p class="compare-viz__detail">Four jobs in four separate places — internal tools, seller handoffs, and ops in the middle.</p>
                                </div>
                                <div class="compare-viz__row compare-viz__row--target">
                                    <p class="compare-viz__heading">Desired Experience</p>
                                    <div class="compare-viz__bar compare-viz__bar--flow" aria-hidden="true">
                                        <span>Buy</span>
                                        <span class="compare-viz__flow-arrow">→</span>
                                        <span>Manage</span>
                                        <span class="compare-viz__flow-arrow">→</span>
                                        <span>Create</span>
                                        <span class="compare-viz__flow-arrow">→</span>
                                        <span>Report</span>
                                    </div>
                                    <p class="compare-viz__detail">One destination — not a chain of internal tools and seller handoffs.</p>
                                </div>
                            </div>
                            <ul class="case-study__sr-only">
                                <li>Today buy, manage, create, and report happen in separate internal and seller-mediated systems; DCM targets one self-serve surface for mid-market.</li>
                            </ul>
                        </figure>
                        <figure class="case-study__theme-viz case-study__roadmap-viz" aria-labelledby="dcm-roadmap-viz-title">
                            <figcaption class="case-study__theme-viz__title" id="dcm-roadmap-viz-title">Release schedule · externalization path</figcaption>
                            <div class="release-viz__legend" aria-hidden="true">
                                <span><i class="release-viz__dot release-viz__dot--shipped"></i> Shipped</span>
                                <span><i class="release-viz__dot release-viz__dot--planned"></i> Planned</span>
                            </div>
                            <div class="release-viz" role="table" aria-label="FY25 and FY26 release schedule">
                                <div class="release-viz__row release-viz__row--head" role="row">
                                    <span class="release-viz__feature" role="columnheader">Capability</span>
                                    <span role="columnheader">FY25 Q3</span>
                                    <span role="columnheader">FY25 Q4</span>
                                    <span role="columnheader">FY26 Q2</span>
                                    <span role="columnheader">FY26 Q3</span>
                                    <span role="columnheader">FY26 Q4</span>
                                </div>
                                <div class="release-viz__row" role="row">
                                    <span class="release-viz__feature">Advanced ads on DCM</span>
                                    <span class="release-viz__cell"><span class="release-viz__pill release-viz__pill--shipped">Shipped</span></span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"></span>
                                </div>
                                <div class="release-viz__row" role="row">
                                    <span class="release-viz__feature">Content packaging &amp; merchandising</span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"><span class="release-viz__pill release-viz__pill--shipped">Shipped</span></span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"></span>
                                </div>
                                <div class="release-viz__row" role="row">
                                    <span class="release-viz__feature">DXC on DCM enablement</span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"><span class="release-viz__pill release-viz__pill--planned">Planned</span></span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"></span>
                                </div>
                                <div class="release-viz__row" role="row">
                                    <span class="release-viz__feature">Advanced targeting &amp; audiences</span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"><span class="release-viz__pill release-viz__pill--planned">Planned</span></span>
                                    <span class="release-viz__cell"></span>
                                </div>
                                <div class="release-viz__row" role="row">
                                    <span class="release-viz__feature">Self-serve measurement &amp; data onboarding</span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"></span>
                                    <span class="release-viz__cell"><span class="release-viz__pill release-viz__pill--planned">Planned</span></span>
                                </div>
                            </div>
                            <ul class="case-study__sr-only">
                                <li>FY25 Q3 advanced ads; FY25 Q4 content packaging; FY26 Q2 DXC; FY26 Q3 targeting and audiences; FY26 Q4 measurement and data onboarding.</li>
                            </ul>
                        </figure>
                    </section>

                    <section class="case-study__section">
                        <h2>Externalized reporting</h2>
                        <p>Replaced seller-only reporting patterns with customer-facing dashboards and exports so mid-market buyers could monitor campaigns without waiting on internal ops—closing the “live performance” gap vs. digital-native competitors.</p>
                        <figure class="case-study__figure case-study__figure--border">
                            <img src="assets/disney-campaign-manager/figures/external-reporting-ui.png?v=2" alt="External DCM performance dashboard" loading="lazy" width="2048" height="2796" decoding="async">
                            <figcaption class="case-study__caption">Externalized in DCM</figcaption>
                        </figure>
                    </section>

                    <section class="case-study__section">
                        <h2>Externalized content selection</h2>
                        <p>Premium packages unlock curated inventory bundles (sports, seasonal, and other collections) directly in DCM—more visual, easier to browse, and a clearer view of available streaming inventory than internal selection tools allowed.</p>
                        <figure class="case-study__figure case-study__figure--border">
                            <img src="assets/disney-campaign-manager/figures/content-packages-ui.png?v=2" alt="Content selection with premium packages in DCM" loading="lazy" width="2048" height="1343" decoding="async">
                        </figure>
                    </section>

                    <section class="case-study__section">
                        <h2>Externalized audiences</h2>
                        <p>Curated Audiences let sellers push advanced segments into self-serve: 1P Disney data, 3P via LiveRamp, 2P advertiser data mapped to Disney, and boolean combinations—so advertisers reuse segments across campaigns on the path to full self-service audience creation.</p>
                        <figure class="case-study__figure case-study__figure--border">
                            <img src="assets/disney-campaign-manager/figures/audiences-ui.png" alt="Curated Audiences in DCM setup flow" loading="lazy">
                        </figure>
                    </section>

                    <section class="case-study__section">
                        <h2>Externalizing ad creation (DXC)</h2>
                        <p>Unifying creation and buying unlocks new value. Integrating Disney eXperience Composer (DXC) creation into DCM bridges the gap between building and buying—a unified advertiser experience externalized through Campaign Manager.</p>

                        <h3 class="case-study__step">DXC in DCM</h3>
                        <p>Enable all advertisers to access premium ad formats directly in DCM by removing operational overhead and leveraging DXC for self-serve ad creation.</p>
                        <figure class="case-study__figure case-study__figure--border">
                            <img src="assets/disney-campaign-manager/figures/dxc-ad-format-ui.png?v=1" alt="Ad format selection inside DCM campaign setup" loading="lazy" width="2048" height="1307" decoding="async">
                            <figcaption class="case-study__caption">Premium formats in the setup flow</figcaption>
                        </figure>

                        <h3 class="case-study__step">Formats by objective</h3>
                        <p>Ad formats are organized by campaign objective so advertisers can explore options, understand requirements and eligibility, and decide whether a format is right for their campaign.</p>
                        <div class="case-study__gallery case-study__gallery--large case-study__gallery--2">
                            <figure class="case-study__figure">
                                <div class="case-study__figure-mat">
                                    <img src="assets/disney-campaign-manager/figures/dxc-formats-embed-a.png?v=2" alt="Ad format selection — Engagement objective, Ad Selector" loading="lazy" width="1713" height="1905" decoding="async">
                                </div>
                                <figcaption class="case-study__caption">Engagement · Ad Selector</figcaption>
                            </figure>
                            <figure class="case-study__figure">
                                <div class="case-study__figure-mat">
                                    <img src="assets/disney-campaign-manager/figures/dxc-formats-embed-b.png?v=2" alt="Ad format selection — Boost Traffic objective, Video+" loading="lazy" width="1713" height="1905" decoding="async">
                                </div>
                                <figcaption class="case-study__caption">Boost Traffic · Video+</figcaption>
                            </figure>
                        </div>

                        <h3 class="case-study__step">Create in flow</h3>
                        <p>Ad creation happens directly within campaign setup—upload assets, customize creative, and preview in real time without leaving the flow.</p>
                        <figure class="case-study__figure">
                            <img src="assets/disney-campaign-manager/figures/dxc-creation-flow.png?v=7" alt="Create ad inside campaign setup with live preview" loading="lazy" width="2048" height="1377" decoding="async">
                            <figcaption class="case-study__caption">Creation inside campaign setup</figcaption>
                        </figure>

                        <h3 class="case-study__step">Preview &amp; share (interactive)</h3>
                        <p>Users preview the rendered experience—in interactive, second-screen, and other formats. A public preview link can be sent to advertisers for review.</p>
                        <figure class="case-study__figure case-study__dxc-preview">
                            <div class="dxc-preview__stage" role="img" aria-label="Interactive preview — Video+ public preview (Google Slides g3caec594e79_1_124)">
                                <img class="dxc-preview__chrome" src="assets/disney-campaign-manager/figures/dxc-preview-ui.png?v=10" alt="" decoding="async" width="2048" height="1485">
                                <div class="dxc-preview__screen" aria-hidden="true">
                                    <img class="dxc-preview__ad" src="assets/disney-campaign-manager/figures/dxc-preview-video-plus-slide.png?v=1" alt="" decoding="async" width="1721" height="967">
                                    <video class="dxc-preview__video" src="assets/disney-campaign-manager/figures/dxc-preview-ad-loop.mp4?v=2" width="600" height="338" muted loop playsinline autoplay preload="auto" aria-hidden="true"></video>
                                </div>
                            </div>
                            <figcaption class="case-study__caption">Interactive preview · copy link</figcaption>
                        </figure>
                    </section>

                    <section class="case-study__section">
                        <h2>Executive leadership OKRs</h2>
                        <p>Q1 FY26 scorecard against the three executive north stars (actuals as of Feb 13).</p>
                        <ul class="case-study__list">
                            <li><strong>Be CTV’s highest-yield platform</strong> — generate 5% revenue lift in Q1 FY26.</li>
                            <li><strong>Be the easiest buying platform to transact with</strong> — reduce average time to launch a campaign from request to activation by 20% in Q1 FY26.</li>
                            <li><strong>Generate the industry’s greatest value for advertisers</strong> — high CPM + sustained demand = high performance.</li>
                        </ul>
                        <div class="case-study__stats" aria-label="Executive OKR actuals">
                            <div><div class="case-study__stat-value">+4.1%</div><div class="case-study__stat-label">Revenue lift</div></div>
                            <div><div class="case-study__stat-value">52%</div><div class="case-study__stat-label">Reduction in time to launch</div></div>
                            <div><div class="case-study__stat-value">$45+</div><div class="case-study__stat-label">CPM</div></div>
                        </div>
                    </section>

                    <section class="case-study__section">
                        <h2>Outcome</h2>
                        <p>Externalization made DCM the customer-facing front door for mid-market CTV growth: sellers’ workflows became advertiser capabilities, unified with creation and reporting in one self-serve platform. Design aligned product, ops, and revenue around advertiser control—supporting faster launches, premium yield, and a credible competitive posture against the largest ad platforms.</p>
                    </section>
                </article>
            `,
            cv: ''
        };
