import Head from "next/head";

const RedirectIcon = () => (
	<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
		<polyline points="15 3 21 3 21 9" />
		<line x1="10" y1="14" x2="21" y2="3" />
	</svg>
);

const FacebookIcon = () => (
	<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
		<path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
	</svg>
);

const LinkedinIcon = () => (
	<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
		<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
	</svg>
);

const InstagramIcon = () => (
	<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<rect x="2.5" y="2.5" width="19" height="19" rx="5" />
		<circle cx="12" cy="12" r="4.2" />
		<circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
	</svg>
);

const PhoneIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.99.36 1.96.68 2.89a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.19-1.25a2 2 0 0 1 2.11-.45c.93.32 1.9.55 2.89.68A2 2 0 0 1 22 16.92Z" />
	</svg>
);

const MailIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<rect x="2" y="4" width="20" height="16" rx="2" />
		<path d="m2 6 10 7 10-7" />
	</svg>
);

const LocationIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
		<circle cx="12" cy="10" r="3" />
	</svg>
);

const Home = () => {
	return (
		<div className="page">
			<Head>
				<title>LOGISTICSWISE</title>
			</Head>

			<header className="header">
				<div className="header-side">
					<img src="/logo.png" alt="LogisticsWise" className="logo" />
				</div>
				<div className="header-center">LOGISTICSWISE</div>
				<div className="header-side header-side-right">
					<a href="https://logisticswise.ge/" target="_blank" rel="noopener noreferrer" aria-label="logisticswise.ge">
						<RedirectIcon />
					</a>
				</div>
			</header>

			<main className="main">
				<p>
					ეს არის LogisticsWise-ის Shopify ინტეგრაციის სერვისი, რომელიც ავტომატურად აკავშირებს თქვენს მაღაზიას ჩვენს პლატფორმასთან
					შეკვეთებისა და ინვენტარის სინქრონიზაციისთვის.
				</p>
			</main>

			<footer className="footer">
				<span className="footer-title">საკონტაქტო ინფორმაცია</span>

				<div className="footer-grid">
					<a className="footer-item" href="tel:+995599251238">
						<PhoneIcon />
						+995 599 25 12 38
					</a>
					<a className="footer-item" href="tel:+995597330096">
						<PhoneIcon />
						+995 597 33 00 96
					</a>
					<a className="footer-item" href="mailto:info@LOGISTICSWISE.ge">
						<MailIcon />
						info@LOGISTICSWISE.ge
					</a>
					<span className="footer-item">
						<LocationIcon />
						ქსნის ქუჩა #36
					</span>
				</div>

				<div className="footer-social">
					<a href="https://www.facebook.com/logisticswise" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
						<FacebookIcon />
					</a>
					<a href="https://www.linkedin.com/company/logisticswise/about/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
						<LinkedinIcon />
					</a>
					<a href="https://www.instagram.com/logisticswise/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
						<InstagramIcon />
					</a>
				</div>

				<div className="footer-copyright">© all rights reserved: LOGISTICSWISE</div>
			</footer>

			<style jsx global>{`
				html,
				body {
					background: #ffffff;
					color: #000000;
					margin: 0;
					padding: 0;
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
				}
			`}</style>

			<style jsx>{`
				.page {
					display: flex;
					flex-direction: column;
					min-height: 100vh;
				}

				.header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 16px 24px;
					border-bottom: 1px solid #e5e5e5;
				}

				.header-side {
					flex: 1;
					display: flex;
					align-items: center;
				}

				.header-side-right {
					justify-content: flex-end;
				}

				.logo {
					height: 40px;
					width: 40px;
				}

				.header-center {
					flex: 1;
					text-align: center;
					font-weight: 700;
					font-size: 24px;
					letter-spacing: 1px;
				}

				.header a {
					color: #000000;
					display: inline-flex;
				}

				.main {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 48px 24px;
					text-align: center;
				}

				.main p {
					max-width: 640px;
					line-height: 1.6;
				}

				.footer {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 20px;
					padding: 32px 24px 16px;
					border-top: 1px solid #e5e5e5;
					text-align: center;
				}

				.footer-title {
					font-weight: 500;
				}

				.footer-grid {
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					gap: 40px;
				}

				.footer-item {
					display: flex;
					flex-direction: row;
					align-items: center;
					gap: 8px;
				}

				.footer a {
					color: #000000;
					text-decoration: none;
				}

				.footer a:hover {
					text-decoration: underline;
				}

				.footer-social {
					display: flex;
					align-items: center;
					gap: 16px;
				}

				.footer-copyright {
					padding-top: 8px;
					font-size: 13px;
					color: #444444;
				}
			`}</style>
		</div>
	);
};

export default Home;
