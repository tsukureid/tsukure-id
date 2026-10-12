/**
 * Sumber tunggal konfigurasi landing page /cv.
 * Nomor dan pesan WhatsApp HARUS persis seperti brief; jangan diduplikasi di komponen lain.
 */
export const CV_WHATSAPP_NUMBER = '6289651450855';
export const CV_WHATSAPP_MESSAGE = '(LP-CV) Hi Admin, Aku ingin bikin CV kerja nih.';
// encodeURIComponent tidak meng-encode ( ), padahal URL di brief memakai %28 %29.
const encoded = encodeURIComponent(CV_WHATSAPP_MESSAGE).replace(/\(/g, '%28').replace(/\)/g, '%29');
export const CV_WHATSAPP_URL = `https://wa.me/${CV_WHATSAPP_NUMBER}?text=${encoded}`;

export type CvPackageId = (typeof CV_PACKAGES)[number]['id'];

export function buildCvWhatsappUrl(pkgId: CvPackageId): string {
	const pkg = CV_PACKAGES.find((plan) => plan.id === pkgId);
	if (!pkg) throw new Error(`Unknown CV package: ${pkgId}`);
	const message = `${CV_WHATSAPP_MESSAGE} Aku pilih ${pkg.name}.`;
	const packageMessage = encodeURIComponent(message).replace(/\(/g, '%28').replace(/\)/g, '%29');
	return `https://wa.me/${CV_WHATSAPP_NUMBER}?text=${packageMessage}`;
}

export const CV_PRICE = { current: 29000, original: 45000 } as const;
export const CV_TERMS: readonly string[] = [];
export const CV_TERMS_ANCHOR = 'syarat-ketentuan';
export const hasCvTerms = (terms: readonly string[] = CV_TERMS) => terms.length > 0;
export const CV_PACKAGES = [
	{
		id: 'photo',
		name: 'Edit Pas Foto',
		current: 20000,
		original: 30000,
		features: ['Jasa edit pas foto', 'File .JPG siap print'],
	},
	{
		id: 'cv-only',
		name: 'Paket CV Only',
		current: 35000,
		original: 50000,
		features: ['Jasa edit pas foto', 'Dokumen CV', 'File PDF siap print', '*Garansi revisi selamanya'],
		guaranteeNote: 'S&K berlaku',
	},
	{
		id: 'bundle',
		name: 'Paket Bundle',
		current: 49000,
		original: 65000,
		features: ['Jasa edit pas foto', 'Dokumen CV', 'Lamaran kerja', 'File PDF siap print', '*Garansi revisi selamanya'],
		guaranteeNote: 'S&K berlaku',
	},
] as const;
export const CV_PORTFOLIO_ANCHOR = '#contoh-cv';
export const CV_CANONICAL_PATH = '/cv';
