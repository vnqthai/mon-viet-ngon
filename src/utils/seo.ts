import { plain } from './rich';

/**
 * Tiện ích SEO: đổi dữ liệu YAML của món thành định dạng schema.org.
 */

/** "4 giờ 30 phút" / "45 phút" / "3 giờ" → "PT4H30M" / "PT45M" / "PT3H" */
export function viDurationToISO(s: string): string | undefined {
  const h = s.match(/(\d+)\s*giờ/);
  const m = s.match(/(\d+)\s*phút/);
  if (!h && !m) return undefined;
  return 'PT' + (h ? `${h[1]}H` : '') + (m ? `${m[1]}M` : '');
}

/** Gộp intro + các gạch đầu dòng của một bước thành đoạn văn trơn cho HowToStep */
export function stepToPlainText(step: {
  intro?: string;
  bullets: { label?: string; text: string }[];
}): string {
  const parts: string[] = [];
  if (step.intro) parts.push(plain(step.intro));
  for (const b of step.bullets) {
    parts.push((b.label ? plain(b.label) + ' ' : '') + plain(b.text));
  }
  return parts.join(' ');
}
